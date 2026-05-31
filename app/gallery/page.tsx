'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Photo {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
  members?: {
    name: string
    role: string
  }[]
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPhotos(data || [])
    } catch (error) {
      console.error('갤러리 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const defaultPhotos = [
    {
      id: '1',
      title: '우리 가족',
      description: '함께하는 시간이 가장 소중합니다',
      image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '심희정', role: 'mom' }]
    },
    {
      id: '2',
      title: '가족 여행',
      description: '추억을 만드는 순간들',
      image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '김동일', role: 'dad' }]
    },
    {
      id: '3',
      title: '함께의 시간',
      description: '모두 함께 웃는 모습이 최고예요',
      image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '김태환', role: 'son1' }]
    },
    {
      id: '4',
      title: '일상 속의 행복',
      description: '작은 것에 감사하는 마음',
      image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '김민환', role: 'son2' }]
    },
    {
      id: '5',
      title: '함께 하는 밥상',
      description: '밥상이 둥글다는 건 마음도 둥글다는 뜻',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '심희정', role: 'mom' }]
    },
    {
      id: '6',
      title: '함께 웃다',
      description: '웃음이 최고의 약입니다',
      image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
      members: [{ name: '김민환', role: 'son2' }]
    }
  ]

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">📸 갤러리</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          우리 가족의 소중한 순간들을 담았습니다
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.src = 'https://via.placeholder.com/500x500?text=사진'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{photo.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{photo.description}</p>
                  {photo.members && photo.members[0] && (
                    <div className="text-xs text-gray-500">
                      <span>📌 {photo.members[0].name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/timeline">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition mr-4">
              📝 타임라인 보기
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
