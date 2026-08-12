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
│   ├── requirements.txt  # Python 의존성
│   └── .gitignore
├── docker-compose.yml
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
