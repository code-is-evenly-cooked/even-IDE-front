/**
 * SockJS는 공식 타입 정의 파일(@types/sockjs-client)을 제공하지 않기 때문에
 * TypeScript에서 인식 가능하도록 직접 타입 선언을 추가함.
 *
 * 최소한의 생성자 및 메서드만 정의했고, WebSocket 인터페이스에 맞춰 작성됨.
 * 필요 시 확장 가능.
 */
declare module "sockjs-client" {
	export default class SockJS {
		constructor(url: string, protocols?: string[], options?: object);
		onopen: ((e: Event) => void) | null;
		onclose: ((e: CloseEvent) => void) | null;
		onmessage: ((e: MessageEvent) => void) | null;
		send(data: string): void;
		close(): void;
		readyState: number;
	}
}
