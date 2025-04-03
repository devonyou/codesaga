# CodeSaga PRD (Product Requirements Document)

## 1. 개요

**CodeSaga**는 개발자를 위한 Cursor 확장 프로그램으로, **코드 보완 및 리팩토링을 지원하는 Cursor 확장 기능**을 제공합니다.  
Meta의 **OLLAMA3 8B (`llama-3-Korean-Bllossom-8B-gguf-Q4_K_M`)** 모델을 기반으로 동작하며, AWS EC2에서 실행되는 NestJS 서버를 통해 요청을 처리합니다.

## 2. 목표 및 핵심 기능

### 🎯 목표

- **코드 작성 및 보완 지원**
- **코드 스타일 및 리팩토링 제안**
- **프로그래밍 관련 질문 처리**
- **Cursor와 유사한 자연스러운 코드 자동완성 기능 제공**

### 🚀 핵심 기능

1. **코드 보완 및 자동완성** (e.g., "이 함수의 더 나은 구현 방법은?")
2. **코드 리팩토링 제안** (e.g., "이 코드를 더 최적화할 방법이 있을까?")
3. **오류 해결 지원** (e.g., "이 에러 메시지를 해결하는 방법이 뭐야?")
4. **특정 라이브러리 또는 프레임워크 사용법 설명**
5. **코드 스타일 및 가이드 제안** (e.g., "이 코드가 ESLint 규칙에 맞는지 확인해줘")

## 3. 시스템 아키텍처

### 🏗 **아키텍처 개요**

CodeSaga는 VS Code Extension과 NestJS 기반의 서버, 그리고 LLaMA 모델이 결합된 구조로 동작합니다.

```plaintext
+------------------------+
|   VS Code Extension    |
| (사용자 입력 및 결과 표시)   |
+------------------------+
          |
          | WebSocket / REST API 요청
          v
+------------------------+
|      API GATEWAY       |
|                        |
+------------------------+
          |
          | GRPC 요청
          v
+------------------------+
|      NestJS 서버        |
|   (요청 처리 및 모델 호출)  |
+------------------------+
          |
          | LLaMA 모델 API 요청
          v
+------------------------+
|   Code LLaMA 7B 모델    |
|    (코드 보완 및 생성)     |
+------------------------+
```

### 🛠 기술 스택

| 컴포넌트      | 기술 스택                                             |
| ------------- | ----------------------------------------------------- |
| **Extension** | TypeScript, Cursor API                                |
| **Backend**   | NestJS (MSA), WebSocket, REST API, gRPC, Redis        |
| **LLM**       | OLLAMA3 8B (`llama-3-Korean-Bllossom-8B-gguf-Q4_K_M`) |
| **Infra**     | AWS EC2, Redis, Docker, Kafka (Saga Pattern)          |

## 4. 로드맵

### ✅ 1단계: 기본 기능 개발

- Cursor Extension 초기 설정
- NestJS 서버 구축 (MSA 아키텍처 적용)
- LLaMA 모델 EC2 배포 및 API 연동
- 기본적인 코드 보완 기능 구현

### 🔄 2단계: 성능 개선 및 추가 기능

- Redis 캐싱 적용 (속도 최적화)
- WebSocket 기반 실시간 코드 보완 기능 추가
- gRPC 기반 서비스 간 통신 구현
- 프롬프트 최적화 및 모델 튜닝
- Kafka를 활용한 Saga 패턴 적용

### 🚀 3단계: 배포 및 확장

- Cursor 마켓플레이스에 배포
- 사용자 피드백 반영 및 개선
- 지원하는 프로그래밍 언어 확장 (Python, TypeScript, etc.)
