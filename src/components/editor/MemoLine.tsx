import {useEffect, useRef} from 'react';
import * as monacoType from 'monaco-editor';

type Props = {
    editor: monacoType.editor.IStandaloneCodeEditor;
    monaco: typeof monacoType;
    lineNumber: number | null;
};

const MemoIndicator = ({editor, monaco, lineNumber}: Props) => {
    const decorationsRef = useRef<string[]>([]);

    useEffect(() => {
        if (!editor || !monaco || lineNumber === null) return;

        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
            {
                range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                options: {
                    isWholeLine: true,
                    glyphMarginClassName: 'memo-icon',
                    glyphMarginHoverMessage: {value: '📝 메모를 추가해보세요!'},
                },
            },
        ]);
    }, [editor, monaco, lineNumber]);

    return null;
};

export default MemoIndicator;