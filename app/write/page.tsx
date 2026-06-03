'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('daily')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/timeline" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← 타임라인으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">✏️ 새로운 이야기</h1>
          <p className="text-gray-600 mb-8">가족의 추억과 일상을 공유하세요</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              ✅ 글이 저장되었습니다! 타임라인으로 이동 중...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">✅ 할일</option>
                <option value="university">📚 대학생활</option>
                <option value="business">💼 사업구상</option>
                <option value="memory">💝 추억</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="이야기를 입력하세요"
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? '저장 중...' : '💾 저장'}
              </button>
              <Link href="/timeline" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
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
