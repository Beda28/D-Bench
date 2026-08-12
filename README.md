# D-Bench

Discord를 벤치마킹하며 주요 기능을 직접 구현하는 프로젝트입니다.

## 폴더 구조

```text
D-Bench/
├── D-Front/              # React + TypeScript + Vite 프런트엔드
│   ├── src/
│   │   ├── pages/        # 시작, 인증, 앱 화면
│   │   ├── auth.ts       # 임시 브라우저 인증 로직
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── D-Back/               # Python Flask 백엔드
│   ├── app.py            # 서버 실행 진입점
│   ├── Dockerfile
│   ├── requirements.txt  # Python 의존성
│   └── .gitignore
├── D-Nginx/              # 프런트 정적 파일 서빙 및 API 프록시
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml    # 전체 컨테이너, 볼륨, 네트워크 구성
└── README.md
```

## 백엔드 실행

PowerShell에서 다음 명령을 실행합니다.

```powershell
cd D-Back
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

서버 실행 후 브라우저에서 `http://127.0.0.1:8000`에 접속하면 `Hello, World!`가 표시됩니다.

가상환경을 종료하려면 `deactivate`를 실행합니다.

## Docker Compose 실행

Docker Desktop을 실행한 뒤 프로젝트 루트에서 다음 명령을 사용합니다.

```powershell
docker compose up --build
```

- 프런트엔드: `http://127.0.0.1`
- Nginx API 프록시: `http://127.0.0.1/api/`
- 백엔드는 호스트에 포트를 공개하지 않으며, `d-bench-network` 내부에서만 `backend:8000`으로 접근할 수 있습니다.

컨테이너를 종료하려면 다음 명령을 실행합니다.

```powershell
docker compose down
```

### 컨테이너 구성

- `frontend-builder`: React 앱을 빌드해 `frontend-dist` 볼륨에 결과물을 복사한 후 종료합니다.
- `nginx`: `frontend-dist` 볼륨을 읽기 전용으로 공유받아 정적 파일을 제공합니다.
- `backend`: Flask 앱을 8000번 포트로 실행합니다.
- 세 서비스는 `d-bench-network` 브리지 네트워크에 연결됩니다.
