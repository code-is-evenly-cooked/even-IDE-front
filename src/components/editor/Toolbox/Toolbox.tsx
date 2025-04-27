"use client";

import React, { ReactNode } from "react";
import { MessageCircleCodeIcon } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { AIIcon, MemoIcon, SelectedMemoIcon } from "@/components/common/Icons";
import { useMemoStore } from "@/stores/useMemoStore";
import { PanelType, usePanelStore } from "@/stores/usePanelState";

const Toolbox = () => {
    const { activePanel, togglePanel } = usePanelStore();
    const { isVisible: isMemoVisible, setVisible: setMemoVisible } = useMemoStore();

    const TOOLBOX_ITEMS: {
        panel: PanelType;
        icon: ReactNode;
        label: string;
        isActive: boolean;
        onClick: () => void;
    }[] = [
        {
            panel: "chat",
            icon: <MessageCircleCodeIcon width={16} height={16} />,
            label: "채팅",
            isActive: activePanel === "chat",
            onClick: () => {
                togglePanel("chat");
                setMemoVisible(false);
            },
        },
        {
            panel: "memo",
            icon: isMemoVisible ? (
                <SelectedMemoIcon className="w-4 h-4" />
            ) : (
                <MemoIcon className="w-4 h-4" />
            ),
            label: "메모",
            isActive: activePanel === "memo",
            onClick: () => {
                setMemoVisible(true);
                togglePanel("memo");
            },
        },
        {
            panel: "ai",
            icon: <AIIcon />,
            label: "AI",
            isActive: activePanel === "ai",
            onClick: () => {
                setMemoVisible(false);
                togglePanel("ai");
            },
        },
    ];

    return (
        <aside className="flex flex-col w-9 mx-1 bg-gray900 shrink-0 gap-1">
            {TOOLBOX_ITEMS.map(({ panel, icon, label, isActive, onClick }) => (
                <IconButton
                    key={panel}
                    icon={icon}
                    label={isActive ? `${label} 닫기` : `${label} 열기`}
                    color="gray700"
                    isActive={isActive}
                    onClick={onClick}
                />
            ))}
        </aside>
    );
};

export default Toolbox;