-- 기존 테이블 삭제 (순서 중요!)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS members CASCADE;

-- 가족 멤버 테이블
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 게시글 테이블 (할일, 대학생활, 사업구상 등)
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

-- 사진 테이블 (단순화 - member_name을 TEXT로 저장)
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  member_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 댓글 테이블
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_posts_member_id ON posts(member_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_photos_member_name ON photos(member_name);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_member_id ON comments(member_id);

-- 초기 멤버 데이터 추가
INSERT INTO members (name, role, bio) VALUES
('심희정', 'mom', '엄마'),
('김동일', 'dad', '아빠'),
('김태환', 'son1', '큰아들'),
('김민환', 'son2', '작은아들');

-- RLS 비활성화 (모든 테이블)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
