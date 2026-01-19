import { useState } from 'react';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import Window from '@/components/Window';
import FileManager from '@/components/FileManager';
import Terminal from '@/components/Terminal';
import Settings from '@/components/Settings';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Index = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [theme, setTheme] = useState<'classic' | 'dark'>('classic');

  const openWindow = (component: string, title: string) => {
    const existingWindow = windows.find(w => w.component === component);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w => 
          w.id === existingWindow.id 
            ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
            : w
        ));
        setHighestZIndex(highestZIndex + 1);
      } else {
        bringToFront(existingWindow.id);
      }
      return;
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      title,
      component,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
      position: { 
        x: 100 + windows.length * 30, 
        y: 80 + windows.length * 30 
      },
      size: { width: 600, height: 400 }
    };

    setWindows([...windows, newWindow]);
    setHighestZIndex(highestZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
    ));
    setHighestZIndex(highestZIndex + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const renderWindowContent = (component: string) => {
    switch (component) {
      case 'file-manager':
        return <FileManager />;
      case 'terminal':
        return <Terminal />;
      case 'settings':
        return <Settings theme={theme} onThemeChange={setTheme} />;
      default:
        return <div className="p-4">Неизвестное приложение</div>;
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="h-screen flex flex-col overflow-hidden select-none">
        <Desktop onOpenWindow={openWindow} />
        
        {windows.map(window => (
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              isMaximized={window.isMaximized}
              zIndex={window.zIndex}
              position={window.position}
              size={window.size}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            >
              {renderWindowContent(window.component)}
            </Window>
          )
        ))}
        
        <Taskbar 
          windows={windows} 
          onWindowClick={(id) => {
            const window = windows.find(w => w.id === id);
            if (window?.isMinimized) {
              setWindows(windows.map(w => 
                w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
              ));
              setHighestZIndex(highestZIndex + 1);
            } else {
              bringToFront(id);
            }
          }}
          onOpenWindow={openWindow}
        />
      </div>
    </div>
  );
};

export default Index;
