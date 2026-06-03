'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Photo {
  id: string
  title: string
  description: string
  image_url: string
  member_name: string
  created_at: string
}

export default function PortfolioPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url')

  const members = ['심희정', '김동일', '김태환', '김민환']

  const [form, setForm] = useState({
    member_name: '',
    title: '',
    description: '',
    image_url: ''
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setPhotos((data || []) as Photo[])
    } catch (err: any) {
      console.error('Error loading photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('파일 크기가 5MB를 초과합니다')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setForm({ ...form, image_url: dataUrl })
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!form.member_name || !form.title.trim() || !form.image_url.trim()) {
      setError('모든 필드를 입력해주세요')
      return
    }

    if (uploadMethod === 'url' && !form.image_url.trim().startsWith('http')) {
      setError('유효한 URL을 입력해주세요')
      return
    }

    setUploading(true)
    try {
      const { error: insertError } = await supabase
        .from('photos')
        .insert([
          {
            member_name: form.member_name,
            title: form.title.trim(),
            description: form.description.trim(),
            image_url: form.image_url.trim()
          }
        ])

      if (insertError) throw insertError

      setSuccess(true)
      setForm({ member_name: '', title: '', description: '', image_url: '' })
      setShowUploadForm(false)

      setTimeout(() => {
        loadPhotos()
      }, 500)
    } catch (err: any) {
      setError('저장 실패: ' + (err.message || '알 수 없는 오류'))
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const deletePhoto = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPhotos(photos.filter(photo => photo.id !== id))
    } catch (err: any) {
      alert('삭제 실패: ' + (err.message || '알 수 없는 오류'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-black mb-4">📸 포트폴리오</h1>
          <p className="text-xl text-gray-300">가족의 소중한 순간들을 담았습니다</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-7xl">
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {showUploadForm ? '❌ 닫기' : '➕ 사진 추가'}
          </button>

          {showUploadForm && (
            <div className="mt-8 bg-blue-50 p-8 rounded-lg">
              {error && <div className="text-red-600 mb-4 p-4 bg-red-50 rounded">{error}</div>}
              {success && <div className="text-green-600 mb-4 p-4 bg-green-50 rounded">✅ 저장되었습니다!</div>}

              <div className="mb-6 flex gap-4 border-b">
                <button
                  type="button"
                  onClick={() => {
                    setUploadMethod('file')
                    setForm({ ...form, image_url: '' })
                  }}
                  className={`pb-2 font-semibold transition ${
                    uploadMethod === 'file'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📁 파일 업로드
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadMethod('url')
                    setForm({ ...form, image_url: '' })
                  }}
                  className={`pb-2 font-semibold transition ${
                    uploadMethod === 'url'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🔗 URL 입력
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">이름</label>
                    <select
                      value={form.member_name}
                      onChange={(e) => setForm({ ...form, member_name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">선택</option>
                      {members.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">제목</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="제목"
                    />
                  </div>
                </div>

                {uploadMethod === 'file' ? (
                  <div>
                    <label className="block font-semibold mb-2">📁 이미지 파일 (최대 5MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {form.image_url && (
                      <div className="mt-2 text-sm text-green-600">✅ 파일 선택됨</div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold mb-2">이미지 URL</label>
                    <input
                      type="url"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">구글 포토 공유 링크를 붙여넣어도 됩니다</p>
                  </div>
                )}

                <div>
                  <label className="block font-semibold mb-2">설명</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    placeholder="설명"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? '저장 중...' : '저장'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <p className="text-center text-gray-600">로딩 중...</p>
          ) : photos.length === 0 ? (
            <p className="text-center text-gray-600 py-12">아직 사진이 없습니다</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{photo.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{photo.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{photo.member_name}</span>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                      >
                        🗑️ 삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="py-12 px-4 bg-gray-50 text-center">
        <Link href="/">
          <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
            ← 홈으로
          </button>
        </Link>
      </div>
    </div>
  )
}
