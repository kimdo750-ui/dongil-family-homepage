const { Client } = require('pg')

const connectionString = 'postgresql://postgres:M2R5ng@kimdo@db.cootcelpoigmyjxvvlrd.supabase.co:5432/postgres'

const schema = `
-- 가족 멤버 테이블
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 사진 테이블
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  title TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  uploaded_by UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_posts_member_id ON posts(member_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_photos_post_id ON photos(post_id);
CREATE INDEX IF NOT EXISTS idx_photos_uploaded_by ON photos(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_member_id ON comments(member_id);

-- 초기 멤버 데이터 추가 (중복 방지)
DELETE FROM members;
INSERT INTO members (name, role, bio) VALUES
('심희정', 'mom', '엄마'),
('김동일', 'dad', '아빠'),
('김태환', 'son1', '큰아들'),
('김민환', 'son2', '작은아들');
`

async function initializeDatabase() {
  const client = new Client({ connectionString })

  try {
    console.log('🔄 데이터베이스 초기화 시작...')

    await client.connect()
    console.log('✅ PostgreSQL 연결 성공')

    // 스키마 실행
    await client.query(schema)
    console.log('✅ 스키마 생성 완료')

    // 멤버 데이터 조회 확인
    const result = await client.query('SELECT * FROM members')

    console.log('')
    console.log('✅ 데이터베이스 초기화 완료!')
    console.log('📋 생성된 테이블:')
    console.log('  - members (가족 멤버)')
    console.log('  - posts (게시글)')
    console.log('  - photos (사진)')
    console.log('  - comments (댓글)')
    console.log('')
    console.log('👨‍👩‍👧‍👦 초기 멤버 데이터 (' + result.rows.length + '명):')
    result.rows.forEach(member => {
      console.log(`  - ${member.name} (${member.role})`)
    })

  } catch (error) {
    console.error('❌ 초기화 실패:', error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

initializeDatabase()
