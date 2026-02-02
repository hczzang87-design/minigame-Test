import { useState, useCallback, useRef, useEffect } from 'react';
import { Player, GamePhase, Animal, ANIMALS } from '@/types/game';

const RACE_DURATION = 5000; // 5 seconds

export function useRaceGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [countdown, setCountdown] = useState(3);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const raceStartTime = useRef<number>(0);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

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
  }, []);

  const startCountdown = useCallback(() => {
    setGamePhase('countdown');
    setCountdown(3);
    
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
  }, []);

  const startRace = useCallback(() => {
    setGamePhase('racing');
    raceStartTime.current = Date.now();
    setElapsedTime(0);
    
    // Generate random finish times for each player (determines their final rank)
    // Finish times are spread between 4.5s and 5s for close competition
    const finishTimes = players.map(() => {
      return 4500 + Math.random() * 500; // Between 4.5s and 5s
    });
    
    // Shuffle to create random finish order
    const shuffledIndices = players.map((_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    
    // Assign finish times based on shuffle order (creates distinct finish times)
    const assignedFinishTimes = players.map((_, playerIndex) => {
      const rankOrder = shuffledIndices.indexOf(playerIndex);
      // Earlier rank = faster finish time (smaller time = more position at any given moment)
      return 4500 + (rankOrder * (500 / players.length));
    });
    
    // Set final positions immediately for CSS transition
    setPlayers(prev => prev.map((player, index) => ({
      ...player,
      position: 100, // All move to finish line
      finishTime: assignedFinishTimes[index],
    })));
    
    // Update elapsed time every 100ms
    timerInterval.current = setInterval(() => {
      const elapsed = Date.now() - raceStartTime.current;
      setElapsedTime(elapsed);
      
      if (elapsed >= RACE_DURATION) {
        if (timerInterval.current) {
          clearInterval(timerInterval.current);
        }
        
        // Calculate final ranks based on finish times
        setPlayers(prev => {
          const sortedByFinishTime = [...prev].sort((a, b) => 
            (a.finishTime || RACE_DURATION) - (b.finishTime || RACE_DURATION)
          );
          
          return prev.map(player => {
            const rank = sortedByFinishTime.findIndex(p => p.id === player.id) + 1;
            return {
              ...player,
              finished: true,
              rank,
            };
          });
        });
        
        setGamePhase('finished');
      }
    }, 100);
  }, [players.length]);

  const resetGame = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setGamePhase('setup');
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
    initializePlayers,
    startCountdown,
    resetGame,
  };
}
