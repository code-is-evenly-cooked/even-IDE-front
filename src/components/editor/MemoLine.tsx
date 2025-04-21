"use client";

import { useEffect, useRef, useState } from "react";
import * as monacoType from "monaco-editor";
import { createPortal } from "react-dom";
import { MemoIcon } from "@/components/common/Icons";

type Props = {
    editor: monacoType.editor.IStandaloneCodeEditor;
    monaco: typeof monacoType;
    lineNumber: number | null;
    onClickIcon: () => void;
};

const MemoIndicator = ({editor, monaco, lineNumber, onClickIcon}: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const zoneIdRef = useRef<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!editor || !monaco || lineNumber === null) return;

        if (zoneIdRef.current) {
            editor.changeViewZones((accessor) => {
                accessor.removeZone(zoneIdRef.current!);
            });
        }

        const domNode = document.createElement("div");
        containerRef.current = domNode;

        const zoneId = editor.changeViewZones((accessor) => {
            const id = accessor.addZone({
                afterLineNumber: lineNumber - 1,
                heightInPx: 0,
                domNode,
                marginDomNode: domNode,
            });
            zoneIdRef.current = id;
        });

        setMounted(true);

        return () => {
            if (zoneIdRef.current) {
                editor.changeViewZones((accessor) => {
                    accessor.removeZone(zoneIdRef.current!);
                });
                zoneIdRef.current = null;
            }
        };
    }, [editor, monaco, lineNumber]);

    if (!mounted || !containerRef.current) return null;

    return createPortal(
        <div
            onClick={onClickIcon}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                cursor: "pointer",
                paddingLeft: 4,
            }}
        >
            <MemoIcon className="w-4 h-4"/>
        </div>,
        containerRef.current
    );
};

export default MemoIndicator;