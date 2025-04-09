"use client";

import { useEffect, useRef } from "react";
import { Terminal as Xterm } from "xterm";
import "xterm/css/xterm.css";

type TerminalProps = {
  terminalRef: React.RefObject<Xterm | null>;
};

const TerminalView = ({ terminalRef }: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const xterm = useRef<Xterm | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      xterm.current = new Xterm({
        cols: 80,
        rows: 20,
        cursorBlink: true,
        theme: {
          background: "#1e1e1e",
        },
      });

      xterm.current.open(containerRef.current);
      xterm.current.write("even IDE Terminal \r\n");
    }

    return () => {
      xterm.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (terminalRef && xterm.current) {
      terminalRef.current = xterm.current;
    }
  }, [terminalRef]);

  return (
    <div ref={containerRef} className="w-full h-[300px] overflow-hidden" />
  );
};

export default TerminalView;
