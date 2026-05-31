'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function WritePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    member_id: '',
    title: '',
    content: '',
    category: 'daily'
  })

  const members = [
    { id: 'mom', name: '심희정 (엄마)' },
    { id: 'dad', name: '김동일 (아빠)' },
    { id: 'son1', name: '김태환 (큰아들)' },
    { id: 'son2', name: '김민환 (작은아들)' }
  ]

  const categories = [
    { value: 'daily', label: '✅ 할일' },
    { value: 'university', label: '📚 대학생활' },
    { value: 'business', label: '💼 사업구상' },
    { value: 'memory', label: '💝 추억' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.member_id) {
      setError('멤버를 선택해주세요')
      return
    }
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요')
      return
    }
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요')
      return
    }

    setLoading(true)

    try {
      // 멤버 ID를 UUID로 변환
      const { data: memberData } = await supabase
        .from('members')
        .select('id')
        .eq('role', formData.member_id)
        .single()

      if (!memberData) {
        setError('멤버 정보를 찾을 수 없습니다')
        return
      }

      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            member_id: memberData.id,
            title: formData.title,
            content: formData.content,
            category: formData.category,
            published: true
          }
        ])

      if (insertError) throw insertError

      setSuccess(true)
      setFormData({
        member_id: '',
        title: '',
        content: '',
        category: 'daily'
      })

      setTimeout(() => {
        router.push('/timeline')
      }, 1500)
    } catch (err: any) {
      setError(err.message || '저장 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">✏️ 글 작성</h1>
        <p className="text-gray-600 text-center mb-12">
          가족과 함께 나눌 이야기를 작성해주세요
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8"
        >
          {/* 멤버 선택 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              누가 작성하세요?
            </label>
            <select
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
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

          {/* 카테고리 선택 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              어떤 내용인가요?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(cat => (
                <label key={cat.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat.value}
                    checked={formData.category === cat.value}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              제목
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력해주세요"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 내용 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              내용
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="내용을 입력해주세요"
              rows={8}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-red-800">
              {error}
            </div>
          )}

          {/* 성공 메시지 */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-green-800">
              ✅ 글이 저장되었습니다! 타임라인으로 이동합니다...
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? '저장 중...' : '💾 저장'}
            </button>
            <Link href="/timeline" className="flex-1">
              <button
                type="button"
                className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                취소
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-12 text-center">
          <Link href="/timeline">
            <button className="text-blue-600 hover:text-blue-800 font-semibold">
              ← 타임라인으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
