import { useState, useCallback, useRef, useEffect } from 'react';
import { Player, GamePhase, Animal, ANIMALS } from '@/types/game';

const COUNTDOWN_SECONDS = 3;
const RACE_DURATION = 5000; // 레이스 시간: 5초

export function useRaceGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>('selectingPlayers');
  const [countdown, setCountdown] = useState(3);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const raceStartTime = useRef<number>(0);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const playersRef = useRef<Player[]>([]);

  const goToAnimalSelection = useCallback(() => {
    setGamePhase('selectingAnimals');
  }, []);

  const initializePlayers = useCallback((count: number, selectedAnimals: Animal[]) => {
    const newPlayers: Player[] = [];
    
    for (let i = 0; i < count; i++) {
      newPlayers.push({
        id: i + 1,
        name: `플레이어 ${i + 1}`,
        animal: selectedAnimals[i] || ANIMALS[i],
        position: 0,
        finished: false,
        finishTime: null,
        rank: null,
      });
    }
    setPlayers(newPlayers);
    playersRef.current = newPlayers;
  }, []);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  const startRace = useCallback(() => {
    const currentPlayers = playersRef.current;
    if (currentPlayers.length === 0) return;

    setGamePhase('racing');
    raceStartTime.current = Date.now();
    setElapsedTime(0);
    
    // 플레이어마다 서로 다른 완주 시간을 생성 (3초 ~ 5초 사이)
    const baseMin = 3000; // 가장 빠른 플레이어
    const baseMax = 5000; // 가장 느린 플레이어

    const shuffledIndices = currentPlayers.map((_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    const assignedFinishTimes = currentPlayers.map((_, playerIndex) => {
      const rankOrder = shuffledIndices.indexOf(playerIndex); // 0이 가장 빠른 플레이어
      const ratio =
        currentPlayers.length > 1 ? rankOrder / (currentPlayers.length - 1) : 0; // 0 ~ 1 사이
      const finishTime =
        baseMin + ratio * (baseMax - baseMin); // baseMin ~ baseMax 사이로 분포
      return finishTime;
    });

    const maxFinishTime =
      assignedFinishTimes.length > 0
        ? Math.max(...assignedFinishTimes)
        : RACE_DURATION;

    // 초기 위치는 0, 각자 다른 finishTime만 세팅
    setPlayers(prev =>
      prev.map((player, index) => ({
        ...player,
        position: 0,
        finished: false,
        rank: null,
        finishTime: assignedFinishTimes[index],
      }))
    );
    
    // 100ms마다 경과 시간과 위치 업데이트
    timerInterval.current = setInterval(() => {
      const elapsed = Date.now() - raceStartTime.current;
      setElapsedTime(elapsed);

      setPlayers(prev =>
        prev.map(player => {
          const targetTime = player.finishTime || maxFinishTime;
          const progress = Math.min(1, elapsed / targetTime);
          const position = progress * 100;

          return {
            ...player,
            position,
          };
        })
      );
      
      if (elapsed >= RACE_DURATION) {
        if (timerInterval.current) {
          clearInterval(timerInterval.current);
        }
        
        // finishTime 기준으로 순위 계산
        setPlayers(prev => {
          const sortedByFinishTime = [...prev].sort((a, b) => 
            (a.finishTime || maxFinishTime) - (b.finishTime || maxFinishTime)
          );
          
          return prev.map(player => {
            const rank = sortedByFinishTime.findIndex(p => p.id === player.id) + 1;
            return {
              ...player,
              finished: true,
              rank,
              position: 100,
            };
          });
        });
        
        setGamePhase('finished');
      }
    }, 100);
  }, []);

  const startCountdown = useCallback(() => {
    setGamePhase('countdown');
    setCountdown(COUNTDOWN_SECONDS);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startRace();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startRace]);

  const resetGame = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setGamePhase('selectingPlayers');
    setPlayers([]);
    setCountdown(3);
    setElapsedTime(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  return {
    playerCount,
    setPlayerCount,
    players,
    gamePhase,
    countdown,
    elapsedTime,
    goToAnimalSelection,
    initializePlayers,
    startCountdown,
    resetGame,
  };
}
