# Web IDE 프로젝트

웹 기반 코드 에디터 플랫폼으로, 사용자들이 온라인에서 코드 작성, 실행, 실시간 협업, 채팅 기능을 제공받을 수 있는 서비스입니다.

[Even Web IDE](https://even-ide.vercel.app)

## 진행 프로세스
<img width="939" alt="image" src="https://github.com/user-attachments/assets/71d66c0d-e701-4ee1-8d0d-f0f48ac26eb0" />


## 주요 기능

- 프로젝트 및 파일 탐색기
- Monaco Editor 기반 코드 편집
- Xterm 기반 실행 터미널
- 실시간 채팅 (STOMP + WebSocket)
- 실시간 코드 협업(WebSocket)
- AI 챗봇 통합 (IndexedDB 히스토리 저장)
- 로그인 / 회원가입 / 비밀번호 초기화
- 프로젝트 공유 (QR코드 생성)
- 사이드 패널 기반 확장 UI 구조


## 기술 스택

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (전역 상태 관리)
- **Monaco Editor** (코드 에디터)
- **Xterm.js** (터미널 UI)
- **STOMP + SockJS** (실시간 채팅 및 )
- **IndexedDB** (AI 채팅 히스토리 저장)
- **Vercel** (배포)


## 결과물
|로그인|회원가입|
|--|--|
|<img width="1414" alt="스크린샷 2025-04-30 오전 9 38 35" src="https://github.com/user-attachments/assets/b6eb92fd-8265-45cd-829a-561cd818d7e5" />|<img width="1414" alt="스크린샷 2025-04-30 오전 9 38 59" src="https://github.com/user-attachments/assets/8cfd3936-4ccc-4917-93f4-7c23e8fd5478" />|
|비밀번호재발급|비밀번호 재설정|
|<img width="1414" alt="image" src="https://github.com/user-attachments/assets/c89d6b71-3911-4634-a470-4c0fc4411412" />|<img width="1414" alt="image" src="https://github.com/user-attachments/assets/95d492b8-d859-4b9c-b535-21649603f8cd" />|
|랜딩페이지|에디터조회|
|<img width="1414" alt="image" src="https://github.com/user-attachments/assets/e9261095-08ac-4b34-a207-fd88c9c393d8" />|<img width="1370" alt="image" src="https://github.com/user-attachments/assets/316155c4-1fd4-41ae-b212-dd2b79d83a45" />|
|프로젝트 및 파일 생성|코드 실행|
|<img width="1414" alt="스크린샷 2025-04-30 오전 9 44 13" src="https://github.com/user-attachments/assets/556e76d9-f6c0-4505-9fdf-110f521a910c" />|<img width="1414" alt="스크린샷 2025-04-30 오전 9 46 02" src="https://github.com/user-attachments/assets/c7445b47-376b-4fde-b93d-7aa198663e74" />
|채팅|AI 기능|
|<img width="421" alt="image" src="https://github.com/user-attachments/assets/35f67e9d-ad90-4fe2-ade3-695c229000a4" />|<img width="383" alt="image" src="https://github.com/user-attachments/assets/5fbbbe29-832d-4724-90af-a4d0cb0859b9" />|
