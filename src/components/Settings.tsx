import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SettingsProps {
  theme: 'classic' | 'dark';
  onThemeChange: (theme: 'classic' | 'dark') => void;
}

const Settings = ({ theme, onThemeChange }: SettingsProps) => {
  const themes = [
    { id: 'classic', name: 'Классическая', color: 'bg-[#008080]' },
    { id: 'dark', name: 'Тёмная', color: 'bg-[#333333]' },
  ];

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
            <Icon name="Palette" size={28} />
            Оформление
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            Выберите тему оформления для вашей системы
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {themes.map((t) => (
            <Card
              key={t.id}
              className={`p-4 cursor-pointer retro-border transition-all ${
                theme === t.id 
                  ? 'ring-2 ring-primary bg-primary/10' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onThemeChange(t.id as 'classic' | 'dark')}
            >
              <div className={`w-full h-24 ${t.color} retro-border mb-3`} />
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-foreground">{t.name}</span>
                {theme === t.id && (
                  <Icon name="CheckCircle2" size={24} className="text-primary" />
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="pt-4 border-t-2 border-border">
          <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
            <Icon name="Info" size={24} />
            О системе
          </h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between p-2 bg-muted/30 retro-border">
              <span className="font-semibold text-foreground">Версия:</span>
              <span className="text-muted-foreground">MiniOS 95 v1.0</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 retro-border">
              <span className="font-semibold text-foreground">Процессор:</span>
              <span className="text-muted-foreground">Intel 486DX 66MHz</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 retro-border">
              <span className="font-semibold text-foreground">Память:</span>
              <span className="text-muted-foreground">16 MB RAM</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full retro-border bg-secondary hover:bg-secondary/90 text-foreground font-bold text-lg h-12"
        >
          <Icon name="Save" size={20} className="mr-2" />
          Применить настройки
        </Button>
      </div>
    </div>
  );
};

export default Settings;
