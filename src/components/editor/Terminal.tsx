'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalView = () => {
    const terminalRef = useRef<HTMLDivElement>(null);

    const xterm = useRef<Terminal>();

    useEffect(() => {
        if (terminalRef.current) {
          xterm.current = new Terminal({
            cols: 80,
            rows: 20,
            cursorBlink: true,
            theme: {
              background: '#1e1e1e',
            },
          });

          xterm.current.open(terminalRef.current);
          xterm.current.write('Web IDE Terminal \r\n');
        }

        return () => {
            xterm.current?.dispose();
        };
    }, []);

    return (
        <div
        ref={terminalRef}
        className="w-full h-60 overflow-hidden"
      /> 
    );
};

export default TerminalView;