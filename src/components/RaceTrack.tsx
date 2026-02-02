import { Player, GamePhase } from "@/types/game";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RaceTrackProps {
  players: Player[];
  gamePhase: GamePhase;
  countdown: number;
  elapsedTime: number;
  onStartRace: () => void;
}

export function RaceTrack({
  players,
  gamePhase,
  countdown,
  elapsedTime,
  onStartRace,
}: RaceTrackProps) {
  const isCountdown = gamePhase === "countdown";
  const isRacing = gamePhase === "racing";
  const isFinished = gamePhase === "finished";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-track-bg p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            🏁 동물 달리기 경주 🏁
          </h1>
          <p className="text-muted-foreground">
            친구들이 선택한 동물들이 결승선을 향해 달려갑니다!
          </p>
        </div>

        {/* Countdown & timer */}
        <div className="flex items-center justify-between bg-card rounded-2xl px-6 py-4 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">상태</span>
            <span className="font-semibold text-lg">
              {gamePhase === "selectingPlayers" && "참여 인원 선택 중"}
              {gamePhase === "selectingAnimals" && "동물 선택 중"}
              {isCountdown && "곧 출발합니다!"}
              {isRacing && "레이스 진행 중"}
              {isFinished && "레이스 종료"}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">경과 시간</div>
              <div className="font-mono font-semibold text-lg">
                {(elapsedTime / 1000).toFixed(2)}s
              </div>
            </div>
            {isCountdown && (
              <div className="text-4xl md:text-5xl font-bold text-primary animate-pulse">
                {countdown}
              </div>
            )}
          </div>
        </div>

        {/* Track */}
        <div className="bg-card rounded-2xl p-4 md:p-6 shadow-soft space-y-4">
          <div className="relative border border-border rounded-xl overflow-hidden bg-track-bg">
            {/* Finish line */}
            <div className="absolute inset-y-0 right-0 w-10 bg-[repeating-linear-gradient(135deg,#ffffff_0,#ffffff_10px,#000000_10px,#000000_20px)] opacity-70" />

            <div className="divide-y divide-border">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="relative h-16 md:h-20 flex items-center px-3 md:px-4"
                >
                  {/* Lane label */}
                  <div className="w-16 text-xs md:text-sm text-muted-foreground">
                    P{player.id}
                  </div>

                  {/* Animal runner */}
                  <div className="relative flex-1 h-10 md:h-12">
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl transition-all duration-[4500ms] ease-out",
                        player.finished && "drop-shadow-lg"
                      )}
                      style={{
                        left: `${player.position}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <span>{player.animal.emoji}</span>
                    </div>
                  </div>

                  {/* Rank / time */}
                  <div className="w-20 text-right text-xs md:text-sm">
                    {player.rank && (
                      <span className="font-bold">
                        {player.rank === 1 && "🥇"}
                        {player.rank === 2 && "🥈"}
                        {player.rank === 3 && "🥉"}
                        {player.rank > 3 && `${player.rank}등`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start button */}
          {!isRacing && !isCountdown && !isFinished && players.length > 0 && (
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                className="text-xl px-10 py-5 rounded-2xl shadow-button hover:shadow-button-hover"
                onClick={onStartRace}
              >
                🚀 레이스 시작!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

