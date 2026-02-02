// Reusable order controls component
import { ChevronUp, ChevronDown } from 'lucide-react';

interface OrderControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function OrderControls({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: OrderControlsProps) {
  return (
    <div className="flex gap-1">
      <button 
        onClick={onMoveUp} 
        disabled={!canMoveUp} 
        className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors"
        type="button"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={onMoveDown} 
        disabled={!canMoveDown} 
        className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors"
        type="button"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
