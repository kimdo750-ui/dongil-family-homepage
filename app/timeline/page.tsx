'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  members?: {
    name: string
    role: string
  }[]
}

export default function TimelinePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const deletePost = async (postId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setDeleting(postId)
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다')
    } finally {
      setDeleting(null)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            category,
            created_at,
            members:member_id(name, role)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) throw error

        setPosts(data || [])
      } catch (error) {
        console.error('타임라인 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const defaultPosts = [
    {
      id: '1',
      title: '새로운 시작',
      content: '가족 홈페이지를 오픈했습니다. 앞으로 많은 추억을 함께 나누길 기대합니다.',
      category: 'memory',
      created_at: new Date().toISOString(),
      members: [{ name: '김동일', role: 'dad' }]
    },
    {
      id: '2',
      title: '대학 입학',
      content: '새로운 캠퍼스에서의 첫 수업이 너무 설렜어요. 열심히 공부하겠습니다!',
      category: 'university',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      members: [{ name: '김태환', role: 'son1' }]
    },
    {
      id: '3',
      title: '사업 계획',
      content: '새로운 사업 아이디어를 구상 중입니다. 가족의 응원이 가장 큰 힘입니다.',
      category: 'business',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      members: [{ name: '김동일', role: 'dad' }]
    },
    {
      id: '4',
      title: '오늘의 할일',
      content: '1. 공부 2시간 □\n2. 가족과 저녁 시간 가지기 ☑\n3. 새로운 취미 배우기 □',
      category: 'daily',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      members: [{ name: '김민환', role: 'son2' }]
    },
    {
      id: '5',
      title: '따뜻한 저녁',
      content: '가족이 함께 모여 밥을 먹으며 하루를 나누었습니다. 이런 순간이 최고예요.',
      category: 'memory',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      members: [{ name: '심희정', role: 'mom' }]
    },
    {
      id: '6',
      title: '주말 계획',
      content: '이번 주말은 가족과 함께 외출을 계획하고 있습니다. 어디로 갈까요?',
      category: 'daily',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      members: [{ name: '김민환', role: 'son2' }]
    }
  ]

  const categoryLabel: Record<string, string> = {
    all: '전체',
    daily: '할일',
    university: '대학생활',
    business: '사업구상',
    memory: '추억'
  }

  const categoryEmoji: Record<string, string> = {
    daily: '✅',
    university: '📚',
    business: '💼',
    memory: '💝'
  }

  const displayPosts = posts.length > 0 ? posts : defaultPosts

  const filteredPosts =
    selectedCategory === 'all'
      ? displayPosts
      : displayPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">📝 타임라인</h1>
            <p className="text-xl text-gray-600">
              가족의 일상과 추억을 시간순으로 기록합니다
            </p>
          </div>
          <Link href="/write">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap">
              ✏️ 글 작성
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              {['daily', 'university', 'business', 'memory'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {categoryEmoji[cat]} {categoryLabel[cat]}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <div key={post.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      {index < filteredPosts.length - 1 && (
                        <div className="w-1 h-24 bg-blue-200 mt-2"></div>
                      )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {categoryEmoji[post.category]} {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(post.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {categoryLabel[post.category]}
                          </span>
                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={deleting === post.id}
                            className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full hover:bg-red-200 transition disabled:opacity-50"
                          >
                            {deleting === post.id ? '삭제 중...' : '🗑️ 삭제'}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {post.content}
                      </p>
                      {post.members && post.members[0] && (
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span>👤</span>
                          <span>
                            {post.members[0].name} ({post.members[0].role})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-lg text-gray-600">
                    해당 카테고리의 글이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-16 text-center">
          <Link href="/gallery">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mr-4">
              📸 갤러리 보기
            </button>
          </Link>
          <Link href="/family">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition">
              👨‍👩‍👧‍👦 가족소개로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
