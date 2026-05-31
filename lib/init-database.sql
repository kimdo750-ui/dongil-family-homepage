-- ============================================
-- 가족 홈페이지 완벽한 초기화 스크립트
-- 이 파일을 Supabase SQL Editor에서 실행하면 모든 게 해결됩니다!
-- ============================================

-- 1. 모든 테이블 완전 삭제 (RLS 포함)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS members CASCADE;

-- 2. members 테이블 생성
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. posts 테이블 생성
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. photos 테이블 생성 (RLS 없음)
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  member_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. comments 테이블 생성
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. 인덱스 생성
CREATE INDEX idx_posts_member_id ON posts(member_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_photos_member_name ON photos(member_name);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_member_id ON comments(member_id);

-- 7. 멤버 데이터 추가
INSERT INTO members (name, role, bio) VALUES
('심희정', 'mom', '엄마'),
('김동일', 'dad', '아빠'),
('김태환', 'son1', '큰아들'),
('김민환', 'son2', '작은아들');

-- 8. RLS 비활성화 (중요!)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;

-- 9. 확인
SELECT '✅ 모든 설정이 완료되었습니다!' as message;
SELECT COUNT(*) as members_count FROM members;
SELECT COUNT(*) as photos_count FROM photos;
