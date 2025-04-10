import FileExplorer from "@/components/editor/FileExplorer";

export default function Sidebar() {
    return (
      <aside className="w-[240px] min-w-[240px] h-screen bg-gray700 text-white flex flex-col">
        
        <div className="px-4 py-3 text-lg font-bold border-b border-gray-700">
          even ide 로고
        </div>
  
        <FileExplorer />
      </aside>
    );
  }