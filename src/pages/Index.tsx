import { useState } from 'react';
import { SetupScreen } from '@/components/SetupScreen';
import { RaceTrack } from '@/components/RaceTrack';
import { ResultModal } from '@/components/ResultModal';
import { useRaceGame } from '@/hooks/useRaceGame';
import { Animal } from '@/types/game';

const Index = () => {
  const {
    playerCount,
    setPlayerCount,
    players,
    gamePhase,
    countdown,
    elapsedTime,
    initializePlayers,
    startCountdown,
    resetGame,
  } = useRaceGame();

  const [showResultModal, setShowResultModal] = useState(false);

  const handleStart = (selectedAnimals: Animal[]) => {
    initializePlayers(playerCount, selectedAnimals);
    setTimeout(() => {
      startCountdown();
    }, 100);
  };

  // Show result modal when race finishes
  if (gamePhase === 'finished' && !showResultModal && players.length > 0) {
    setTimeout(() => setShowResultModal(true), 500);
  }

  const handleRestart = () => {
    setShowResultModal(false);
    resetGame();
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
  };

  if (gamePhase === 'setup') {
    return (
      <SetupScreen
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        onStart={handleStart}
      />
    );
  }

  return (
    <>
      <RaceTrack
        players={players}
        gamePhase={gamePhase}
        countdown={countdown}
        elapsedTime={elapsedTime}
        onStartRace={startCountdown}
      />
      <ResultModal
        open={showResultModal}
        onClose={handleCloseModal}
        onRestart={handleRestart}
        players={players}
      />
    </>
  );
};

export default Index;
