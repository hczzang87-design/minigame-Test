import { cn } from '@/lib/utils';

interface RunningAnimalProps {
  emoji: string;
  isRunning: boolean;
  isFinished: boolean;
}

export function RunningAnimal({ emoji, isRunning, isFinished }: RunningAnimalProps) {
  return (
    <div className="relative">
      {/* Main body container with bounce animation */}
      <div
        className={cn(
          "relative flex flex-col items-center",
          isRunning && !isFinished && "animate-running-bob"
        )}
      >
        {/* Arms */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          {/* Left arm */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-xs origin-right",
              isRunning && !isFinished && "animate-arm-swing"
            )}
          >
            💪
          </div>
          {/* Right arm */}
          <div
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-xs origin-left",
              isRunning && !isFinished && "animate-arm-swing-reverse"
            )}
          >
            💪
          </div>
        </div>

        {/* Animal emoji */}
        <span className="text-2xl md:text-3xl relative z-10">{emoji}</span>

        {/* Legs */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {/* Left leg */}
          <div
            className={cn(
              "text-[8px] origin-top",
              isRunning && !isFinished && "animate-leg-run"
            )}
          >
            🦶
          </div>
          {/* Right leg */}
          <div
            className={cn(
              "text-[8px] origin-top",
              isRunning && !isFinished && "animate-leg-run-reverse"
            )}
          >
            🦶
          </div>
        </div>
      </div>

      {/* Dust particles when running */}
      {isRunning && !isFinished && (
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
          <div className="animate-dust-float text-[6px] opacity-60">💨</div>
          <div className="animate-dust-float-delay text-[5px] opacity-40">💨</div>
          <div className="animate-dust-float-delay-2 text-[4px] opacity-30">💨</div>
        </div>
      )}

      {/* Sparkle effect when finished */}
      {isFinished && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <span className="text-sm">✨</span>
        </div>
      )}
    </div>
  );
}
