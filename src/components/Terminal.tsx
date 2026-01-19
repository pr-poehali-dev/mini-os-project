import { useState, useRef, useEffect } from 'react';

interface CommandHistory {
  command: string;
  output: string;
}

const Terminal = () => {
  const [currentPath] = useState('C:\\WINDOWS');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', output: 'MiniOS Terminal [Version 1.0]\n(c) 2024 MiniOS Corporation. Все права защищены.\n' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Доступные команды:\nHELP    - показать справку\nCLS     - очистить экран\nDIR     - показать файлы\nVER     - версия системы\nDATE    - показать дату\nTIME    - показать время\nECHO    - вывести текст';
        break;
      case 'cls':
        setHistory([]);
        setInput('');
        return;
      case 'dir':
        output = 'Содержимое C:\\WINDOWS\n\nДОКУМЕНТЫ    <DIR>     12.01.2024  14:30\nИЗОБРАЖЕНИЯ  <DIR>     10.01.2024  09:15\nМУЗЫКА       <DIR>     08.01.2024  16:45\nREADME.TXT            1,234 байт\nCONFIG.SYS            512 байт\n\n         5 файлов          1,746 байт';
        break;
      case 'ver':
        output = 'MiniOS [Version 1.0.95]';
        break;
      case 'date':
        output = new Date().toLocaleDateString('ru-RU');
        break;
      case 'time':
        output = new Date().toLocaleTimeString('ru-RU');
        break;
      case '':
        output = '';
        break;
      default:
        if (command.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `"${cmd}" не является внутренней или внешней командой,\nисполняемой программой или пакетным файлом.`;
        }
    }

    setHistory([...history, { command: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-400 p-4 font-mono overflow-auto cursor-text"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          {item.output && (
            <pre className="whitespace-pre-wrap mb-2 text-lg leading-relaxed">
              {item.output}
            </pre>
          )}
          {item.command && (
            <div className="text-lg">
              <span className="text-yellow-400">{currentPath}{'>'}</span>
              <span className="ml-1">{item.command}</span>
            </div>
          )}
        </div>
      ))}
      
      <div className="flex items-center text-lg">
        <span className="text-yellow-400">{currentPath}{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none ml-1 text-green-400 font-mono"
          autoFocus
        />
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
};

export default Terminal;
