"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function ProjectPage({ params }: { params: { uuid: string } }) {
  const projectId = params.uuid;

  return (
    <div className="flex">
      <Sidebar projectId={projectId} /> {/* 전달 */}
      
    </div>
  );
}
