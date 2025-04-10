export default function FileExplorer() {
    return (
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-sm text-gray-300">📁 프로젝트</div>
        <ul className="pl-4">
          <li>📄 editor.js</li>
          <li>📄 파일</li>
        </ul>
      </div>
    );
  }