현재 suksuk_picker 프로젝트를 다음 목표로 리팩토링 + 기능 추가해줘.

이번 작업의 핵심 목표는 4가지다.

1. 기존에 file:// 대응 때문에 제거했던 ES module(import/export) 구조를 다시 도입한다.
2. 로컬 개발 환경과 최종 배포 환경을 "http://localhost" 및 "GitHub Pages" 기준으로 맞춘다.
3. 기존 랜덤 추첨 흐름은 유지하면서, "다음 1명 예약(next reserved ball)" 기능을 추가한다.
4. 지금은 한 페이지에서 동작하지만, 나중에 display/control 2페이지로 분리하기 쉬운 구조로 만든다.

중요한 전제:
- 이제 file:// 직접 실행은 지원 기준이 아니다.
- 개발은 로컬 HTTP 서버(py -m http.server 등) 기준으로 한다.
- 최종 배포는 GitHub Pages 같은 정적 호스팅 기준이다.
- 따라서 import/export를 다시 사용하는 방향이 맞다.
- HTML에서는 type="module"을 사용해도 된다.

반드시 지킬 것:
- 기존 UX/문구/기본 추첨 흐름은 최대한 유지
- 기존 랜덤 추첨은 계속 기본값이어야 함
- "다음 1명 예약"은 랜덤을 1회 override 하는 기능으로만 추가
- 과도한 기능 추가 금지
- 백엔드/DB/로그인 기능 추가 금지
- 바닐라 JavaScript 유지
- 빌드 도구(Vite/Webpack 등) 도입 금지
- GitHub Pages에서 그대로 동작 가능한 정적 구조 유지

현재 구현에서 반영해야 할 방향:
- window.SuksukApp 네임스페이스 방식은 정리하고, ES module import/export로 다시 전환
- app.js를 composition root로 유지하되, 각 모듈은 필요한 의존성만 import 하거나 생성 시 주입받게 정리
- UI/상태/로직/저장소 책임을 분리
- 한 페이지 안에 display 역할과 control 역할이 함께 존재하더라도, 내부 구조는 나중에 display.html / control.html 로 분리할 수 있도록 설계

원하는 구조 방향(필요시 이름은 약간 조정 가능):
- js/app.js                     // 엔트리포인트, 조립
- js/constants.js
- js/elements.js
- js/state/createState.js
- js/storage/settingsStorage.js
- js/storage/sessionStorage.js
- js/game/initGame.js
- js/game/picking.js
- js/game/reservation.js
- js/game/sessionState.js
- js/ui/render.js
- js/ui/setupModal.js
- js/ui/controlPanel.js
- js/events/settingsForm.js
- js/events/bindEvents.js

이번 작업에서 새로 추가할 기능 정의:
- 다음 1명 예약(nextReservedBall) 기능
- 교사용 진행 제어 패널에서 번호를 입력해 다음 발표자 예약 가능
- 예약된 번호는 다음 추첨 1회에서 우선 선택
- 사용되면 자동으로 예약 해제
- 예약 취소 가능
- 현재 예약된 번호를 UI에 표시

기능 규칙:
1. 기본 추첨은 기존과 동일하게 랜덤
2. 추첨 시 nextReservedBall 이 존재하면 우선 사용
3. 단, 예약 번호가 remainingBalls 안에 실제로 남아 있을 때만 사용
4. 예약 번호가 이미 뽑힌 번호면 예약 불가
5. 예약 번호가 excludedNumbers에 포함되어 있으면 예약 불가
6. 초기화 시 예약 상태도 함께 초기화
7. 설정 변경으로 세션을 다시 구성하면 예약 상태도 초기화
8. 예약은 1회성이다. 사용 후 자동 해제된다.

상태 설계 원칙:
- 설정 상태(settings)
- 세션 상태(draw session)
- 진행 제어 상태(control state: nextReservedBall)
- UI 일시 상태는 가능하면 저장하지 않는다

저장 원칙:
- localStorage 사용 가능
- settings 와 draw session/control state 의 책임을 분리
- 나중에 display/control 2페이지로 나눠도 재사용 가능한 형태로 저장 구조를 정리
- 저장소 접근 코드는 한곳에 모아라

UI 원칙:
- 메인 추첨 화면은 기존 구조를 최대한 유지
- 교사용 제어 패널은 별도 작은 패널로 추가
- 설정 모달과 진행 제어 패널은 역할을 분리
- 패널에는 최소한 다음 항목이 있어야 한다:
  - 번호 입력
  - 예약 버튼
  - 현재 예약 번호 표시
  - 예약 취소 버튼
  - 유효하지 않은 번호일 때 안내 메시지

아키텍처 원칙:
- 지금은 한 페이지지만, 추후 display/control 2페이지 분리가 가능해야 한다
- 따라서 "화면 표시(display)"와 "조작(control)" 관련 코드를 분리할 것
- picking 규칙 결정은 UI 코드 안에 직접 박지 말고 game 로직 쪽에 둘 것
- 렌더링은 상태를 읽어 화면에 반영하는 역할에 집중시킬 것
- 이벤트 바인딩은 상태 변경 명령을 호출하는 역할에 집중시킬 것

이번 작업에서 반드시 함께 반영할 것:
- index.html의 script 로딩을 ES module 방식으로 다시 정리
- import/export 경로가 로컬 서버 및 GitHub Pages에서 바로 동작하도록 맞출 것
- file:// 전용 우회 코드가 남아 있다면 제거하거나 정리할 것

검증 포인트:
- localhost:8000 에서 정상 실행
- 첫 화면 로드 정상
- 기존 랜덤 추첨 정상
- 효과음 정상
- 설정 모달 정상
- 다음 1명 예약 기능 정상
- 예약 사용 후 자동 해제 정상
- 초기화 후 예약 제거 정상

결과 보고 형식:
1. 변경한 파일 목록
2. import/export 재도입 방식 설명
3. nextReservedBall 기능이 어느 모듈에 어떻게 배치됐는지 설명
4. 한 페이지지만 향후 display/control 분리가 가능하도록 어떤 경계를 세웠는지 설명
5. 수동 테스트 포인트 정리

가능하면 diff 중심으로 작업해라.

중요: 이번 작업은 "한 페이지 구현"이지만, 내부 구조는 미래의 display/control 분리를 준비하는 중간 단계여야 한다.
