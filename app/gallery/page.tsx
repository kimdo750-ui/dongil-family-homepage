'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Photo {
  id: string
  title: string
  description: string
  image_url: string
  member_name: string
  created_at: string
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const members = ['심희정', '김동일', '김태환', '김민환']

  const [form, setForm] = useState({
    member_name: '',
    title: '',
    description: '',
    image_file: null as File | null
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setPhotos(data || [])
    } catch (err: any) {
      console.error('Error loading photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!form.member_name || !form.title.trim() || !form.image_file) {
      setError('모든 필드를 입력해주세요')
      return
    }

    setUploading(true)
    try {
      const file = form.image_file
      const fileName = `${Date.now()}_${file.name}`

      // Supabase Storage에 파일 업로드
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadErr) throw uploadErr

      // 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)

      // DB에 저장
      const { error: dbErr } = await supabase.from('photos').insert([
        {
          member_name: form.member_name,
          title: form.title.trim(),
          description: form.description.trim(),
          image_url: publicUrl
        }
      ])

      if (dbErr) throw dbErr

      setSuccess(true)
      setForm({ member_name: '', title: '', description: '', image_file: null })
      setShowUploadForm(false)

      setTimeout(() => {
        loadPhotos()
      }, 500)
    } catch (err: any) {
      setError('저장 실패: ' + err.message)
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return

    setDeleting(id)
    try {
      const { error: err } = await supabase.from('photos').delete().eq('id', id)
      if (err) throw err
      setPhotos(photos.filter(p => p.id !== id))
    } catch (err: any) {
      alert('삭제 실패: ' + err.message)
      console.error(err)
    } finally {
      setDeleting(null)
    }
  }

  const displayPhotos = photos

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">📸 갤러리</h1>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {showUploadForm ? '닫기' : '사진 추가'}
          </button>
        </div>

        {showUploadForm && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            {error && <div className="text-red-600 mb-4 p-4 bg-red-50 rounded">{error}</div>}
            {success && <div className="text-green-600 mb-4 p-4 bg-green-50 rounded">✅ 저장되었습니다!</div>}

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">이름</label>
                <select
                  value={form.member_name}
                  onChange={(e) => setForm({ ...form, member_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">선택</option>
                  {members.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
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

              <div>
                <label className="block font-semibold mb-2">사진 선택</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image_file: e.target.files?.[0] || null })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {form.image_file && <p className="text-sm text-gray-600 mt-2">선택됨: {form.image_file.name}</p>}
              </div>

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

              <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                {uploading ? '저장 중...' : '저장'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">로딩 중...</p>
        ) : displayPhotos.length === 0 ? (
          <p className="text-center text-gray-600 py-12">사진이 없습니다</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={photo.image_url} alt={photo.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{photo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{photo.member_name}</span>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      disabled={deleting === photo.id}
                      className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                    >
                      {deleting === photo.id ? '삭제 중...' : '삭제'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
