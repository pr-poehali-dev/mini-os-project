import Icon from '@/components/ui/icon';

interface DesktopProps {
  onOpenWindow: (component: string, title: string) => void;
}

const Desktop = ({ onOpenWindow }: DesktopProps) => {
  const desktopIcons = [
    { id: 'my-computer', label: 'Мой компьютер', icon: 'HardDrive', component: 'file-manager' },
    { id: 'terminal', label: 'Терминал', icon: 'Terminal', component: 'terminal' },
    { id: 'settings', label: 'Настройки', icon: 'Settings', component: 'settings' },
  ];

  return (
    <div className="flex-1 bg-accent p-4 relative overflow-hidden">
      <div className="grid grid-cols-1 gap-4 w-24">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            onDoubleClick={() => onOpenWindow(icon.component, icon.label)}
            className="flex flex-col items-center gap-1 p-2 hover:bg-primary/20 rounded-sm transition-colors cursor-default"
          >
            <Icon name={icon.icon} size={48} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]" />
            <span className="text-sm text-white font-bold text-center drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              {icon.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Desktop;
