import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import type { WindowState } from '@/pages/Index';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
  onOpenWindow: (component: string, title: string) => void;
}

const Taskbar = ({ windows, onWindowClick, onOpenWindow }: TaskbarProps) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(interval);
  });

  const menuItems = [
    { label: 'Мой компьютер', icon: 'HardDrive', component: 'file-manager' },
    { label: 'Терминал', icon: 'Terminal', component: 'terminal' },
    { label: 'Настройки', icon: 'Settings', component: 'settings' },
  ];

  return (
    <>
      <div className="h-12 bg-secondary retro-border border-t-border flex items-center px-1 gap-1 relative z-50">
        <Button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-10 px-4 retro-border bg-secondary hover:bg-secondary/90 text-foreground font-bold text-lg flex items-center gap-2"
        >
          <Icon name="Menu" size={20} />
          <span>Пуск</span>
        </Button>

        <div className="h-10 w-px bg-border mx-1" />

        <div className="flex-1 flex gap-1 overflow-x-auto">
          {windows.map(window => (
            <Button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-10 px-3 retro-border text-foreground font-semibold text-base truncate max-w-[200px] ${
                window.isMinimized 
                  ? 'bg-secondary hover:bg-secondary/90' 
                  : 'bg-card retro-border-inset'
              }`}
            >
              {window.title}
            </Button>
          ))}
        </div>

        <div className="h-10 retro-border-inset bg-secondary px-3 flex items-center">
          <Icon name="Volume2" size={16} className="mr-3 text-foreground" />
          <span className="font-bold text-lg text-foreground">{time}</span>
        </div>
      </div>

      {startMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setStartMenuOpen(false)}
          />
          <div className="absolute bottom-12 left-1 w-64 bg-secondary retro-border window-shadow z-50">
            <div className="bg-primary text-primary-foreground p-3 font-bold text-xl border-b-2 border-border">
              MiniOS 95
            </div>
            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onOpenWindow(item.component, item.label);
                    setStartMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-primary hover:text-primary-foreground text-foreground transition-colors text-left font-semibold text-lg"
                >
                  <Icon name={item.icon} size={24} />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-primary hover:text-primary-foreground text-foreground transition-colors text-left font-semibold text-lg"
              >
                <Icon name="Power" size={24} />
                <span>Завершение работы</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Taskbar;
