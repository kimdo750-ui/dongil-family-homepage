'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  published?: boolean
  member_id?: string
}

interface Photo {
  id: string
  title: string
  description: string
  image_url: string
  member_name: string
  created_at: string
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [portfolioPhotos, setPortfolioPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentPosts()
    loadPortfolioPhotos()
  }, [])

  const loadRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4)

      if (error) throw error

      setRecentPosts((data || []) as Post[])
    } catch (err) {
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadPortfolioPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      setPortfolioPhotos((data || []) as Photo[])
    } catch (err) {
      console.error('Error loading photos:', err)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      daily: '📅',
      university: '🎓',
      business: '💼',
      memory: '💝'
    }
    return emojis[category] || '📝'
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-8 md:pt-20 pb-12 md:pb-24 px-3 md:px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
                우리 가족의<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">소중한 순간들</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                어렸을 때부터 함께 자란 추억들과 일상을 담은 특별한 공간입니다. 가족 모두의 이야기를 함께 나누세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a href="/gallery" className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 text-center">
                  📸 갤러리
                </a>
                <a href="/timeline" className="border-2 border-slate-900 text-slate-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:bg-slate-900 hover:text-white transition duration-300 text-center">
                  📝 이야기
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/family/family.jpg"
                alt="동일가족"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-8 md:py-16 px-3 md:px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-black text-blue-600 mb-1 md:mb-2">4</div>
              <p className="text-xs md:text-base text-gray-600">가족 구성원</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black text-purple-600 mb-1 md:mb-2">∞</div>
              <p className="text-xs md:text-base text-gray-600">소중한 추억</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black text-pink-600 mb-1 md:mb-2">📸</div>
              <p className="text-xs md:text-base text-gray-600">함께한 순간</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">💝</div>
              <p className="text-xs md:text-base text-gray-600">끝없는 사랑</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-16 md:py-32 px-3 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 md:mb-4">갤러리</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">가족의 소중한 순간들을 사진으로 담았습니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {portfolioPhotos.length > 0 ? (
              portfolioPhotos.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-40 sm:h-48 md:h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-end p-3 md:p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition duration-300">
                      <p className="font-bold text-sm md:text-base">{photo.title}</p>
                      <p className="text-xs md:text-sm text-gray-200">{photo.member_name}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              [...Array(6)].map((_, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                  <div className="h-40 sm:h-48 md:h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl md:text-6xl group-hover:scale-110 transition duration-300">
                    📸
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300"></div>
                </div>
              ))
            )}
          </div>

          <div className="text-center">
            <a href="/gallery" className="inline-block bg-slate-900 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
              전체 갤러리 보기→
            </a>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="py-16 md:py-32 px-3 md:px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 md:mb-4">최근 이야기</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">우리 가족의 일상과 추억</p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-600">로딩 중...</div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-sm md:text-base">아직 이야기가 없습니다. 타임라인에서 첫 이야기를 작성해보세요!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
              {recentPosts.map((post) => (
                <a key={post.id} href="/timeline" className="group">
                  <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer h-full flex flex-col">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                      <span>{getCategoryEmoji(post.category)}</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 group-hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3 flex-grow">
                      {post.content || '이야기 내용이 없습니다'}
                    </p>
                    <div className="text-blue-600 font-semibold text-sm md:text-base group-hover:translate-x-2 transition">더 읽기→</div>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="text-center">
            <a href="/timeline" className="inline-block bg-slate-900 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
              모든 이야기 보기→
            </a>
          </div>
        </div>
      </div>

      {/* Family Section */}
      <div className="py-16 md:py-32 px-3 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 md:mb-4">가족 소개</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">동일가족의 네 명</p>
          </div>

          <div className="mb-12 md:mb-16 rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition">
            <img
              src="/images/family/family.jpg"
              alt="동일가족"
              className="w-full h-auto object-cover hover:scale-105 transition duration-300"
            />
          </div>

          <div className="text-center">
            <a href="/family" className="inline-block border-2 border-slate-900 text-slate-900 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:bg-slate-900 hover:text-white transition duration-300">
              각 멤버 상세 정보→
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-32 px-3 md:px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6">
            새로운 순간을 기록하세요
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-8 md:mb-12">
            가족의 이야기를 함께 나누고 소중한 추억을 영원히 간직하세요.
          </p>
          <a href="/write" className="inline-block bg-white text-slate-900 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-xl">
            ✏️ 이야기 작성하기
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-3 md:px-4 bg-slate-900 text-center text-gray-400 text-xs md:text-sm">
        <p>© 2024 동일가족. 모든 추억은 소중합니다.</p>
      </footer>
    </div>
  )
}
