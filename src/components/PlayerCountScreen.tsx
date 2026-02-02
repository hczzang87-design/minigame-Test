import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlayerCountScreenProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  onComplete: () => void;
}

export function PlayerCountScreen({ playerCount, setPlayerCount, onComplete }: PlayerCountScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-track-bg p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            🏃 동물 달리기 경주 🏃
          </h1>
          <p className="text-muted-foreground text-lg">
            친구들과 함께 신나는 경주를 즐겨보세요!
          </p>
        </div>

        {/* Player Count Selection */}
        <div className="bg-card rounded-2xl p-8 shadow-soft">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground text-center">
            👥 참여 인원 선택
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Array.from({ length: 14 }, (_, i) => i + 2).map(count => (
              <button
                key={count}
                onClick={() => setPlayerCount(count)}
                className={cn(
                  "w-14 h-14 md:w-16 md:h-16 rounded-xl font-bold text-lg transition-all duration-200",
                  playerCount === count
                    ? "bg-primary text-primary-foreground shadow-button scale-110"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:scale-105"
                )}
              >
                {count}
              </button>
            ))}
          </div>

          {/* Complete Button */}
          <div className="text-center">
            <Button
              onClick={onComplete}
              size="lg"
              className="text-xl px-12 py-6 rounded-2xl shadow-button hover:shadow-button-hover transition-all duration-200"
            >
              완료
            </Button>
            <p className="text-muted-foreground mt-3 text-sm">
              선택된 인원: {playerCount}명
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
