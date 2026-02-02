import { Player, GamePhase } from '@/types/game';
import { RunningAnimal } from '@/components/RunningAnimal';
import { cn } from '@/lib/utils';

interface RaceTrackProps {
  players: Player[];
  gamePhase: GamePhase;
  countdown: number;
  elapsedTime: number;
  onStartRace: () => void;
}

export function RaceTrack({ players, gamePhase, countdown, elapsedTime, onStartRace }: RaceTrackProps) {
  const sortedByRank = [...players].sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    if (a.rank) return -1;
    if (b.rank) return 1;
    return b.position - a.position;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-track-bg p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1">
          🏃 동물 달리기 경주 🏃
        </h1>
        <div className="text-lg text-muted-foreground">
          {gamePhase === 'racing' && (
            <span className="font-mono text-xl">
              ⏱️ {(elapsedTime / 1000).toFixed(1)}초 / 5초
            </span>
          )}
        </div>
      </div>

      {/* Countdown Overlay */}
      {gamePhase === 'countdown' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-9xl font-bold text-white animate-pulse">
              {countdown}
            </div>
            <p className="text-2xl text-white mt-4">준비하세요!</p>
          </div>
        </div>
      )}

      {/* Race Track */}
      <div className="flex-1 bg-track rounded-2xl p-3 md:p-4 shadow-track overflow-hidden">
        <div className="relative h-full flex flex-col gap-1">
          {/* Start/Finish Lines */}
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-white/50 z-10" />
          <div className="absolute right-8 md:right-16 top-0 bottom-0 w-2 bg-finish z-10">
            <div className="h-full w-full bg-[repeating-linear-gradient(0deg,white_0px,white_8px,black_8px,black_16px)]" />
          </div>

          {/* Lanes */}
          {players.map((player, index) => (
            <div
              key={player.id}
              className={cn(
                "flex-1 min-h-[40px] relative flex items-center rounded-lg",
                index % 2 === 0 ? "bg-lane-even" : "bg-lane-odd"
              )}
            >
              {/* Lane number */}
              <div className="absolute left-1 md:left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold text-track z-20">
                {index + 1}
              </div>

              {/* Track area */}
              <div className="absolute left-10 md:left-20 right-10 md:right-20 h-full flex items-center">
                {/* Runner */}
                <div
                  className="absolute"
                  style={{
                    left: `${player.position}%`,
                    transform: 'translateX(-50%)',
                    transition: gamePhase === 'racing' 
                      ? `left ${(player.finishTime || 5000) / 1000}s cubic-bezier(0.25, 0.1, 0.25, 1)` 
                      : 'none',
                  }}
                >
                  <RunningAnimal
                    emoji={player.animal.emoji}
                    isRunning={gamePhase === 'racing'}
                    isFinished={player.finished}
                  />
                </div>
              </div>

              {/* Rank display */}
              {player.rank && (
                <div className="absolute right-1 md:right-2 z-20">
                  <div
                    className={cn(
                      "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold",
                      player.rank === 1 && "bg-gold text-white",
                      player.rank === 2 && "bg-silver text-white",
                      player.rank === 3 && "bg-bronze text-white",
                      player.rank === players.length && "bg-destructive text-white",
                      player.rank > 3 && player.rank < players.length && "bg-muted text-muted-foreground"
                    )}
                  >
                    {player.rank}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ranking Board - Show during/after race */}
      {(gamePhase === 'racing' || gamePhase === 'finished') && (
        <div className="mt-4 bg-card rounded-xl p-3 shadow-soft">
          <h3 className="font-semibold text-sm text-card-foreground mb-2">📊 실시간 순위</h3>
          <div className="flex flex-wrap gap-2">
            {sortedByRank.map((player, index) => (
              <div
                key={player.id}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-sm",
                  player.rank === 1 && "bg-gold/20 text-gold",
                  player.rank === players.length && "bg-destructive/20 text-destructive",
                  !player.rank && "bg-muted"
                )}
              >
                <span className="font-bold">{player.rank || index + 1}.</span>
                <span>{player.animal.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
