import { useState, useRef, useEffect, ReactNode } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

const Window = ({
  id,
  title,
  children,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = position.x + e.clientX - dragStart.x;
        const newY = position.y + e.clientY - dragStart.y;
        onPositionChange({ x: newX, y: newY });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position, onPositionChange, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (!isMaximized && e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex }
    : { top: position.y, left: position.x, width: size.width, height: size.height, zIndex };

  return (
    <div
      ref={windowRef}
      className="absolute bg-secondary retro-border window-shadow flex flex-col"
      style={windowStyle}
      onClick={onFocus}
    >
      <div
        className="h-8 bg-primary text-primary-foreground flex items-center justify-between px-1 cursor-move"
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <span className="font-bold text-lg ml-1 select-none">{title}</span>
        <div className="flex gap-1">
          <Button
            onClick={onMinimize}
            className="w-7 h-7 p-0 retro-border bg-secondary hover:bg-secondary/90 text-foreground"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <Button
            onClick={onMaximize}
            className="w-7 h-7 p-0 retro-border bg-secondary hover:bg-secondary/90 text-foreground"
          >
            <Icon name="Square" size={14} />
          </Button>
          <Button
            onClick={onClose}
            className="w-7 h-7 p-0 retro-border bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-card overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
