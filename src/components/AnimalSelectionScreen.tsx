import { useState } from 'react';
import { Animal, ANIMALS } from '@/types/game';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimalSelectionScreenProps {
  playerCount: number;
  onStart: (selectedAnimals: Animal[]) => void;
}

export function AnimalSelectionScreen({ playerCount, onStart }: AnimalSelectionScreenProps) {
  const [selectedAnimals, setSelectedAnimals] = useState<(Animal | null)[]>(
    Array(15).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleAnimalSelect = (animal: Animal) => {
    const isAlreadySelected = selectedAnimals.some(a => a?.id === animal.id);
    if (isAlreadySelected) return;

    const newSelected = [...selectedAnimals];
    newSelected[currentPlayer] = animal;
    setSelectedAnimals(newSelected);

    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  const canStart = selectedAnimals.slice(0, playerCount).every(a => a !== null);

  const handleStart = () => {
    const validAnimals = selectedAnimals.slice(0, playerCount).filter((a): a is Animal => a !== null);
    onStart(validAnimals);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-track-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            🏃 동물 달리기 경주 🏃
          </h1>
          <p className="text-muted-foreground text-lg">
            각 플레이어의 동물을 선택하세요 ({playerCount}명)
          </p>
        </div>

        {/* Animal Selection */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h2 className="text-xl font-semibold mb-2 text-card-foreground">
            🐾 동물 선택
          </h2>
          <p className="text-muted-foreground mb-4">
            플레이어 {currentPlayer + 1}의 동물을 선택하세요 ({currentPlayer + 1}/{playerCount})
          </p>

          {/* Player slots */}
          <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
            {Array.from({ length: playerCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPlayer(i)}
                className={cn(
                  "w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-200 border-2",
                  currentPlayer === i
                    ? "border-primary bg-primary/10 scale-110"
                    : selectedAnimals[i]
                    ? "border-success bg-success/10"
                    : "border-dashed border-muted-foreground/30 bg-muted/50"
                )}
              >
                {selectedAnimals[i]?.emoji || (
                  <span className="text-muted-foreground text-sm">{i + 1}</span>
                )}
              </button>
            ))}
          </div>

          {/* Animal grid */}
          <div className="grid grid-cols-5 md:grid-cols-5 gap-3">
            {ANIMALS.map(animal => {
              const isSelected = selectedAnimals.some(a => a?.id === animal.id);
              const selectedByPlayer = selectedAnimals.findIndex(a => a?.id === animal.id);
              
              return (
                <button
                  key={animal.id}
                  onClick={() => handleAnimalSelect(animal)}
                  disabled={isSelected}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200",
                    isSelected
                      ? "bg-muted/50 opacity-50 cursor-not-allowed"
                      : "bg-animal-card hover:bg-animal-card-hover hover:scale-105 hover:shadow-animal cursor-pointer"
                  )}
                >
                  <span className="text-3xl md:text-4xl">{animal.emoji}</span>
                  <span className="text-xs text-muted-foreground hidden md:block">
                    {animal.name}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-primary">
                      P{selectedByPlayer + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button
            onClick={handleStart}
            disabled={!canStart}
            size="lg"
            className="text-xl px-12 py-6 rounded-2xl shadow-button hover:shadow-button-hover transition-all duration-200"
          >
            🏁 경주 시작!
          </Button>
          {!canStart && (
            <p className="text-muted-foreground mt-2 text-sm">
              모든 플레이어의 동물을 선택해주세요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
