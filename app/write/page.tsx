'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  published: boolean
}

function WriteContent() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('daily')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [pageLoading, setPageLoading] = useState(!!editId)

  useEffect(() => {
    if (editId) {
      const loadPost = async () => {
        try {
          const { data, error: fetchError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', editId)
            .single()

          if (fetchError) throw fetchError

          if (data) {
            const post = data as Post
            setTitle(post.title)
            setContent(post.content)
            setCategory(post.category)
            setIsEditing(true)
          }
        } catch (err) {
          console.error('글 불러오기 실패:', err)
        } finally {
          setPageLoading(false)
        }
      }
      loadPost()
    }
  }, [editId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요')
      return
    }

    setLoading(true)
    try {
      if (isEditing && editId) {
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            title: title.trim(),
            content: content.trim(),
            category
          })
          .eq('id', editId)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert([
            {
              title: title.trim(),
              content: content.trim(),
              category,
              published: true
            }
          ])

        if (insertError) throw insertError
      }

      setSuccess(true)
      setTitle('')
      setContent('')
      setCategory('daily')

      setTimeout(() => {
        window.location.href = '/timeline'
      }, 1500)
    } catch (err: any) {
      setError('저장 실패: ' + (err.message || '알 수 없는 오류'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-3 md:px-4 flex items-center justify-center">
        <p className="text-sm md:text-base lg:text-lg text-gray-600">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 md:mb-8">
          <Link href="/timeline" className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base">
            ← 타임라인으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-slate-900">
            {isEditing ? '✏️ 이야기 수정' : '✏️ 새로운 이야기'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 md:mb-8">
            {isEditing ? '기존 이야기를 수정하세요' : '가족의 추억과 일상을 공유하세요'}
          </p>

          {error && (
            <div className="mb-6 p-3 md:p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm md:text-base">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 md:p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm md:text-base">
              ✅ 글이 저장되었습니다! 타임라인으로 이동 중...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option value="daily">✅ 할일</option>
                <option value="university">📚 대학생활</option>
                <option value="business">💼 사업구상</option>
                <option value="memory">💝 추억</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="이야기를 입력하세요"
                rows={8}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 text-sm md:text-base"
              >
                {loading ? '저장 중...' : isEditing ? '수정 저장' : '💾 저장'}
              </button>
              <Link href="/timeline" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-300 text-gray-800 py-2 md:py-3 rounded-lg font-bold hover:bg-gray-400 transition text-sm md:text-base"
                >
                  취소
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function WritePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center"><p className="text-lg text-gray-600">로딩 중...</p></div>}>
      <WriteContent />
    </Suspense>
  )
}
