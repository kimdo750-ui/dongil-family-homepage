# 동일가족 홈페이지

가족의 추억과 일상을 공유하는 웹사이트입니다.

## 🎯 프로젝트 목표

- 어렸을 때부터 자란 사진을 저장하고 공유
- 가족 멤버별 할일, 대학생활, 사업 계획 등을 기록
- 모든 가족 구성원이 추억을 함께 만들 수 있는 플랫폼

## 👨‍👩‍👧‍👦 가족 구성원

- 엄마: 심희정
- 아빠: 김동일
- 큰아들: 김태환
- 작은아들: 김민환

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Hosting**: Vercel
- **Repository**: GitHub

## 📦 설치 방법

### 1. 저장소 클론
```bash
git clone https://github.com/kimdo750-ui/dongil-family-homepage.git
cd dongil-family-homepage
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일이 이미 설정되어 있습니다.
```
NEXT_PUBLIC_SUPABASE_URL=https://cootcelpoigmyjxvvlrd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_wxfqbO4DmLv9Jkel7WUgaw_UFg0ifRS
```

### 4. 데이터베이스 초기화

Supabase 대시보드에서:
1. SQL Editor 열기
2. `lib/schema.sql` 파일의 내용 복사 및 실행
3. 멤버 데이터와 테이블이 생성됨

### 5. 개발 서버 시작
```bash
npm run dev
```

`http://localhost:3000` 에서 확인 가능합니다.

## 📁 폴더 구조

```
dongil-family-homepage/
├── app/
│   ├── layout.tsx          # 기본 레이아웃
│   ├── page.tsx            # 홈 페이지
│   ├── family/             # 가족소개 페이지
│   ├── gallery/            # 갤러리 페이지
│   ├── timeline/           # 타임라인 페이지
│   ├── admin/              # 관리자 페이지
│   └── globals.css         # 전역 스타일
├── lib/
│   ├── supabase.ts         # Supabase 클라이언트
│   └── schema.sql          # 데이터베이스 스키마
├── public/                 # 정적 파일
├── .env.local              # 환경 변수
├── package.json            # 의존성
├── tsconfig.json           # TypeScript 설정
└── next.config.js          # Next.js 설정
```

## 🎨 기능 (계획중)

### Phase 1: 기본 구조
- [x] 프로젝트 초기 설정
- [x] 데이터베이스 스키마 설계
- [ ] 가족 소개 페이지
- [ ] 갤러리 페이지

### Phase 2: 기능 개발
- [ ] 타임라인 페이지
- [ ] 개별 멤버 페이지 (할일, 사업구상 등)
- [ ] 댓글 기능
- [ ] 사진 업로드 기능

### Phase 3: 고급 기능
- [ ] 인증 시스템
- [ ] 관리자 페이지
- [ ] 알림 기능
- [ ] 검색 & 필터

## 🚀 배포

### Vercel 배포
1. GitHub에 푸시
2. Vercel 대시보드에서 프로젝트 import
3. 환경 변수 설정
4. 자동 배포

## 📝 개발 가이드

### 새 페이지 추가
```bash
# app/새페이지/page.tsx 생성
mkdir app/새페이지
touch app/새페이지/page.tsx
```

### Supabase 데이터 조회 예시
```typescript
import { supabase } from '@/lib/supabase'

export default async function Page() {
  const { data: members } = await supabase
    .from('members')
    .select('*')

  return (
    // JSX here
  )
}
```

## 🤝 기여

가족 홈페이지 개발에 함께하고 싶으신가요?
- 주소: https://github.com/kimdo750-ui/dongil-family-homepage
- 이슈: 새로운 기능 제안이나 버그 보고

## 📧 문의

문의사항이 있으시면 깃허브 이슈로 남겨주세요.

---

Made with ❤️ for the Dongil Family
