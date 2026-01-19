import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: string;
}

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('C:\\');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const files: FileItem[] = [
    { name: 'Документы', type: 'folder', icon: 'Folder' },
    { name: 'Изображения', type: 'folder', icon: 'Folder' },
    { name: 'Музыка', type: 'folder', icon: 'Folder' },
    { name: 'Видео', type: 'folder', icon: 'Folder' },
    { name: 'Загрузки', type: 'folder', icon: 'FolderDown' },
    { name: 'readme.txt', type: 'file', icon: 'FileText' },
    { name: 'config.sys', type: 'file', icon: 'FileCode' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-secondary border-b-2 border-border p-2 flex items-center gap-2">
        <Button className="w-8 h-8 p-0 retro-border bg-card text-foreground" disabled>
          <Icon name="ArrowLeft" size={16} />
        </Button>
        <Button className="w-8 h-8 p-0 retro-border bg-card text-foreground" disabled>
          <Icon name="ArrowRight" size={16} />
        </Button>
        <Button className="w-8 h-8 p-0 retro-border bg-card text-foreground" disabled>
          <Icon name="ArrowUp" size={16} />
        </Button>
        <div className="flex-1 retro-border-inset bg-input px-2 py-1">
          <span className="font-semibold text-base text-foreground">{currentPath}</span>
        </div>
      </div>

      <div className="flex-1 p-4 bg-card overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setSelectedItem(file.name)}
              onDoubleClick={() => {
                if (file.type === 'folder') {
                  setCurrentPath(`${currentPath}${file.name}\\`);
                }
              }}
              className={`flex flex-col items-center gap-2 p-3 rounded ${
                selectedItem === file.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon 
                name={file.icon} 
                size={48} 
                className={selectedItem === file.name ? 'text-primary-foreground' : 'text-foreground'}
              />
              <span className="text-sm font-semibold text-center break-words w-full">
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-secondary border-t-2 border-border px-2 py-1 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {files.length} объектов
        </span>
        <span className="text-sm font-semibold text-foreground">
          {selectedItem ? `Выбран: ${selectedItem}` : 'Готово'}
        </span>
      </div>
    </div>
  );
};

export default FileManager;
