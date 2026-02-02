import { Player } from '@/types/game';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  players: Player[];
}

export function ResultModal({ open, onClose, onRestart, players }: ResultModalProps) {
  const sortedPlayers = [...players].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const winner = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-card border-0 rounded-3xl shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">🏆 경주 결과 🏆</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Winner */}
          <div className="text-center p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl border-2 border-gold/30">
            <div className="text-6xl mb-2 animate-bounce">{winner?.animal.emoji}</div>
            <div className="text-gold font-bold text-xl">🥇 1등 우승!</div>
            <div className="text-muted-foreground">플레이어 {winner?.id}</div>
            <div className="mt-2 text-sm text-gold/80">
              {((winner?.finishTime || 0) / 1000).toFixed(2)}초
            </div>
          </div>

          {/* Loser */}
          {players.length > 1 && (
            <div className="text-center p-4 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-2xl border-2 border-destructive/30">
              <div className="text-4xl mb-2">{loser?.animal.emoji}</div>
              <div className="text-destructive font-bold">😱 꼴등 벌칙 당첨!</div>
              <div className="text-muted-foreground text-sm">플레이어 {loser?.id}</div>
            </div>
          )}

          {/* Full Rankings */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold mb-3 text-center text-sm text-muted-foreground">전체 순위</h4>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto">
              {sortedPlayers.map(player => (
                <div
                  key={player.id}
                  className="flex flex-col items-center p-2 bg-card rounded-lg"
                >
                  <span className="text-xl">{player.animal.emoji}</span>
                  <span className="text-xs font-bold">
                    {player.rank === 1 && '🥇'}
                    {player.rank === 2 && '🥈'}
                    {player.rank === 3 && '🥉'}
                    {player.rank && player.rank > 3 && `${player.rank}등`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              닫기
            </Button>
            <Button
              onClick={onRestart}
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
            >
              🔄 다시 시작
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
