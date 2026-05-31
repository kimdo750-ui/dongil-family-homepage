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

interface UploadFormData {
  member_id: string
  title: string
  description: string
  image_url: string
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [uploadForm, setUploadForm] = useState<UploadFormData>({
    member_id: '',
    title: '',
    description: '',
    image_url: ''
  })

  const members = [
    { id: 'mom', name: '심희정 (엄마)' },
    { id: 'dad', name: '김동일 (아빠)' },
    { id: 'son1', name: '김태환 (큰아들)' },
    { id: 'son2', name: '김민환 (작은아들)' }
  ]

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select(`
          id,
          title,
          description,
          image_url,
          created_at,
          members:uploaded_by(name, role)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPhotos(data || [])
    } catch (error) {
      console.error('갤러리 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!uploadForm.member_id) {
      setError('멤버를 선택해주세요')
      return
    }
    if (!uploadForm.title.trim()) {
      setError('사진 제목을 입력해주세요')
      return
    }
    if (!uploadForm.image_url.trim()) {
      setError('이미지 URL을 입력해주세요')
      return
    }

    setUploading(true)

    try {
      // 멤버 ID를 UUID로 변환
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('id')
        .eq('role', uploadForm.member_id.trim())
        .single()

      if (memberError || !memberData) {
        console.error('Member lookup error:', memberError)
        setError('멤버 정보를 찾을 수 없습니다. 다시 선택해주세요.')
        return
      }

      const { error: insertError } = await supabase
        .from('photos')
        .insert([
          {
            uploaded_by: memberData.id,
            title: uploadForm.title.trim(),
            description: uploadForm.description.trim(),
            image_url: uploadForm.image_url.trim()
          }
        ])

      if (insertError) throw insertError

      setSuccess(true)
      setUploadForm({
        member_id: '',
        title: '',
        description: '',
        image_url: ''
      })
      setShowUploadForm(false)

      // 새로운 사진 로드
      setTimeout(() => {
        fetchPhotos()
      }, 500)
    } catch (err: any) {
      setError(err.message || '업로드 중 오류가 발생했습니다')
    } finally {
      setUploading(false)
    }
  }

  const deletePhoto = async (photoId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId)

      if (error) throw error
      setPhotos(photos.filter(photo => photo.id !== photoId))
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다')
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-5xl font-bold mb-2">📸 갤러리</h1>
            <p className="text-xl text-gray-600">
              우리 가족의 소중한 순간들을 담았습니다
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap"
          >
            {showUploadForm ? '❌ 닫기' : '⬆️ 사진 업로드'}
          </button>
        </div>

        {/* 업로드 폼 */}
        {showUploadForm && (
          <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">사진 업로드</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-red-800">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-green-800">
                ✅ 사진이 업로드되었습니다!
              </div>
            )}

            <form onSubmit={handleUploadSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-semibold mb-2">멤버 선택</label>
                  <select
                    name="member_id"
                    value={uploadForm.member_id}
                    onChange={handleUploadChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">선택해주세요</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">사진 제목</label>
                  <input
                    type="text"
                    name="title"
                    value={uploadForm.title}
                    onChange={handleUploadChange}
                    placeholder="예: 가족 여행"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2">이미지 URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={uploadForm.image_url}
                  onChange={handleUploadChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <p className="text-sm text-gray-600 mt-2">
                  💡 구글 포토에서 이미지를 복사한 후, 우클릭 → 이미지 주소 복사로 URL을 얻을 수 있습니다.
                </p>
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2">설명</label>
                <textarea
                  name="description"
                  value={uploadForm.description}
                  onChange={handleUploadChange}
                  placeholder="사진에 대한 설명 (선택사항)"
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                >
                  {uploading ? '업로드 중...' : '📤 업로드'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition font-semibold"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <>
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
                    <div className="flex justify-between items-center">
                      {photo.members && photo.members[0] && (
                        <div className="text-xs text-gray-500">
                          <span>📌 {photo.members[0].name}</span>
                        </div>
                      )}
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition"
                      >
                        🗑️ 삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
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
