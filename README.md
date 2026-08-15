# D-Bench

Discord를 벤치마킹하며 주요 기능을 직접 구현하는 프로젝트입니다.

## 폴더 구조

```text
D-Bench/
├── D-Front/              # React + TypeScript + Vite 프런트엔드
│   ├── src/
│   │   ├── pages/        # 시작, 인증, 앱 화면
│   │   ├── auth.ts       # 브라우저 세션 관리
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── D-Back/               # Python FastAPI 백엔드
│   ├── app.py            # 서버 실행 진입점
│   ├── controller/       # 요청 처리 로직
│   ├── db/               # 데이터베이스 연결
│   ├── repository/       # 데이터베이스 쿼리 작성 위치
│   ├── router/           # API 경로 등록
│   ├── Dockerfile
│   ├── requirements.txt  # Python 의존성
│   └── .gitignore
├── D-Nginx/              # 프런트 정적 파일 서빙 및 API 프록시
│   ├── Dockerfile
│   └── nginx.conf
├── D-MySQL/              # MySQL 데이터베이스 및 초기화 설정
│   ├── Dockerfile
│   └── init.sql
├── .env.example          # 환경변수 작성 예시
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
$env:JWT_SECRET="로컬_개발용_랜덤값"
python app.py
```

현재 인증 경로는 `POST /login`, `POST /signup`입니다.

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
- `backend`: FastAPI 앱을 Uvicorn으로 8000번 포트에서 실행합니다.
- `database`: Compose가 `.env` 값을 주입하고 MySQL이 데이터베이스와 애플리케이션 사용자를 생성합니다.
- 프런트, Nginx, 백엔드는 `d-bench-network`에 연결됩니다.
- 백엔드와 MySQL은 `d-bench-db-network`에 연결됩니다.
- MySQL 데이터는 `d-bench-mysql-data` 볼륨에 보관됩니다.

### 환경변수

루트 `.env` 파일에서 다음 값을 관리합니다.

```dotenv
MYSQL_ROOT_PASSWORD=d_bench_root_password
MYSQL_DATABASE=d_bench
MYSQL_USER=d_bench_user
MYSQL_PASSWORD=d_bench_password
JWT_SECRET=새로운_랜덤_비밀값
```

실제 배포 전에는 비밀번호와 `JWT_SECRET`을 반드시 변경해야 합니다. `.env`는 Git에서 제외되며 `.env.example`만 저장소에 포함됩니다.

`JWT_SECRET`은 로그인과 회원가입 때 반환하는 JWT의 서명에 사용됩니다. JWT payload에는 사용자 `uuid`와 `id`가 포함됩니다.

MySQL 공식 이미지가 `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`를 사용해 데이터베이스와 사용자 및 권한을 생성합니다. `init.sql`은 생성된 데이터베이스를 선택하고 이후 추가될 테이블 초기화를 담당합니다.

MySQL 초기화는 데이터 볼륨이 비어 있을 때만 실행됩니다. 환경변수를 바꾸고 데이터베이스를 처음부터 다시 초기화해야 한다면 개발 데이터 삭제 여부를 확인한 후 `docker compose down -v`를 사용합니다.
