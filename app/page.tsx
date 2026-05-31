'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <div className="mb-12 text-8xl">👨‍👩‍👧‍👦</div>
          <h1 className="text-7xl md:text-8xl font-black text-white mb-8 leading-tight">
            동일가족
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">
            어렸을 때부터 함께한 우리의 이야기
          </p>
          <p className="text-xl text-gray-400 mb-16">
            추억, 일상, 함께하는 순간들
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/portfolio" className="bg-white text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-xl">
              📸 포트폴리오
            </a>
            <a href="/timeline" className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-slate-900 transition transform duration-300 hover:scale-105">
              📝 이야기
            </a>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="py-32 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4">포트폴리오</h2>
            <p className="text-xl text-gray-600">가족의 소중한 순간들</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl overflow-hidden">
                  <span className="group-hover:scale-110 transition duration-300">📸</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">순간 {i + 1}</h3>
                  <p className="text-gray-600 text-sm">소중한 추억이 담긴 사진</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/portfolio" className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition duration-300">
              전체 포트폴리오 보기 →
            </a>
          </div>
        </div>
      </div>

      {/* Story Preview */}
      <div className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4">최근 이야기</h2>
            <p className="text-xl text-gray-600">가족의 일상과 추억</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💝</span>
                  <span className="text-sm text-gray-500">2024년 {i + 1}월</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">이야기 제목</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  가족과 함께한 소중한 순간과 이야기를 담았습니다.
                </p>
                <span className="text-sm text-blue-600 font-semibold">더 읽기 →</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/timeline" className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition duration-300">
              모든 이야기 보기 →
            </a>
          </div>
        </div>
      </div>

      {/* Family Section */}
      <div className="py-32 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4">가족 소개</h2>
            <p className="text-xl text-gray-600">동일가족의 네 명</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['심희정\n(엄마)', '김동일\n(아빠)', '김태환\n(큰아들)', '김민환\n(작은아들)'].map((name, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-5xl shadow-lg">
                  👤
                </div>
                <h3 className="text-xl font-bold text-slate-900 whitespace-pre-line">{name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/family" className="inline-block border-2 border-slate-900 text-slate-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-slate-900 hover:text-white transition duration-300">
              가족 상세 정보 →
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-32 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            새로운 순간을 기록하세요
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            가족의 이야기를 함께 나누고 소중한 추억을 영원히 간직하세요.
          </p>
          <a href="/write" className="inline-block bg-white text-slate-900 px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-xl">
            ✏️ 이야기 작성하기
          </a>
        </div>
      </div>
    </div>
  )
}
