import {create} from "zustand";
import {persist} from "zustand/middleware"; // 상태를 localStorage에 저장할 때 사용

type IdeFile = {
    id: string;
    name: string;
    content: string;
};
type OpenTab =
    | { type: "file"; id: string }
    | { type: "memo" };

type IdeStore = {
    files: IdeFile[];
    openedTabs: OpenTab[];
    currentTab: OpenTab | null;

    selectTab: (tab: OpenTab) => void;
    openTab: (tab: OpenTab) => void;
    closeTab: (tab: OpenTab) => void;

    updateFileContent: (id: string, newContent: string) => void;
    addFile: (name: string, id?: string) => void;
    deleteFile: (id: string) => void;

    renameFile: (id: string, newName: string) => void;
    editingFileId: string | null;
    setEditingFileId: (id: string | null) => void;

    currentCode: string;
    setCurrentCode: (code: string) => void;
};

export const useIdeStore = create<IdeStore>()(
    persist(
        (set, get) => ({
            files: [],
            openedTabs: [],
            currentTab: null,

            // 탭 선택
            selectTab: (tab) => set({currentTab: tab}),

            openTab: (tab) => {
                const {openedTabs} = get();
                const isAlreadyOpen = openedTabs.some((t) =>
                    t.type === tab.type && t.type === "file"
                        ? t.id === (tab as any).id
                        : t.type === "memo"
                );
                if (!isAlreadyOpen) {
                    set({openedTabs: [...openedTabs, tab]});
                }
                set({currentTab: tab});
            },

            closeTab: (tab) => {
                const {openedTabs, currentTab} = get();
                const newTabs = openedTabs.filter((t) =>
                    t.type === "file" && tab.type === "file"
                        ? t.id !== tab.id
                        : t.type !== "memo" // memo 탭이면 무조건 제거
                );
                set({openedTabs: newTabs});

                if (
                    currentTab?.type === tab.type &&
                    (tab.type === "memo" || (tab.type === "file" && currentTab?.id === tab.id))
                ) {
                    const fallback = newTabs[newTabs.length - 1] || null;
                    set({currentTab: fallback});
                }
            },

            // 파일 내용 수정 (코드 입력 시 호출)
            updateFileContent: (id, content) =>
                set((state) => ({
                    files: state.files.map((file) =>
                        file.id === id ? {...file, content} : file
                    ),
                })),

            // 새 파일 생성 -> 자동으로 탭 열기 + 선택 상태
            addFile: (name, id = Date.now().toString()) => {
                const newFile = {id, name, content: ""};
                set((state) => ({
                    files: [...state.files, newFile],
                    openedTabs: [...state.openedTabs, {type: "file", id}],
                    currentTab: {type: "file", id},
                }));
            },

            // 파일 탭 열기 (중복 방지) + 선택 상태 전환
            // openFile: (id) => {
            //     const {openedFileIds, selectFile} = get();
            //     if (!openedFileIds.includes(id)) {
            //         set({openedFileIds: [...openedFileIds, id]});
            //     }
            //     selectFile(id);
            // },

            // 파일 탭 닫기 + 이전 탭 이동
            // closeFile: (id) => {
            //     const {openedFileIds, currentFileId, selectFile} = get();
            //     const newOpened = openedFileIds.filter((fid: string) => fid !== id);
            //     set({openedFileIds: newOpened});
            //
            //     if (currentFileId === id) {
            //         const fallbackId = newOpened[newOpened.length - 1] || null;
            //         selectFile(fallbackId);
            //     }
            // },

            // 파일 이름 변경
            renameFile: (id, newName) =>
                set((state) => ({
                    files: state.files.map((file) =>
                        file.id === id ? {...file, name: newName} : file
                    ),
                    editingFileId: null,
                })),

            // 파일 삭제
            deleteFile: (id) => {
                const {files, openedTabs, currentTab} = get();
                const newFiles = files.filter((f) => f.id !== id);
                const newTabs = openedTabs.filter(
                    (tab) => !(tab.type === "file" && tab.id === id)
                );
                const newCurrent =
                    currentTab?.type === "file" && currentTab.id === id
                        ? newTabs[newTabs.length - 1] || null
                        : currentTab;
                set({
                    files: newFiles,
                    openedTabs: newTabs,
                    currentTab: newCurrent,
                });
            },

            // 현재 코드 값 저장 (Monaco Editor 외부에서도 접근 가능)
            editingFileId: null,
            setEditingFileId: (id) => set({editingFileId: id}),

            currentCode: "",
            setCurrentCode: (code) => set({currentCode: code}),
        }),
        {
            name: "even-ide-files",
            partialize: (state) => ({
                files: state.files,
                openedTabs: state.openedTabs,
                currentTab: state.currentTab,
            }), // 저장할 상태만 선택
        }
    )
);
