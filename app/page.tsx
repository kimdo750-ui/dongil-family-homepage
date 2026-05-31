'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="text-2xl font-black text-slate-900">동일가족</div>
          <div className="flex gap-6">
            <a href="#portfolio" className="text-slate-900 font-semibold hover:text-blue-600 transition">포트폴리오</a>
            <a href="/timeline" className="text-slate-900 font-semibold hover:text-blue-600 transition">이야기</a>
            <a href="/family" className="text-slate-900 font-semibold hover:text-blue-600 transition">가족</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
                우리 가족의<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">소중한 순간들</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                어렸을 때부터 함께 자란 추억들과 일상을 담은 특별한 공간입니다. 가족 모두의 이야기를 함께 나누세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#portfolio" className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 text-center">
                  📸 포트폴리오
                </a>
                <a href="/timeline" className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-900 hover:text-white transition duration-300 text-center">
                  📝 이야기
                </a>
              </div>
            </div>
            <div className="text-8xl text-center md:text-right">
              👨‍👩‍👧‍👦
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">4</div>
              <p className="text-gray-600">가족 구성원</p>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-600 mb-2">∞</div>
              <p className="text-gray-600">소중한 추억</p>
            </div>
            <div>
              <div className="text-4xl font-black text-pink-600 mb-2">📸</div>
              <p className="text-gray-600">함께한 순간</p>
            </div>
            <div>
              <div className="text-4xl font-black text-green-600 mb-2">💝</div>
              <p className="text-gray-600">끝없는 사랑</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">포트폴리오</h2>
            <p className="text-xl text-gray-600">가족의 소중한 순간들을 사진으로 담았습니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
                  📸
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/portfolio" className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
              전체 포트폴리오 보기→
            </a>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="py-32 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">최근 이야기</h2>
            <p className="text-xl text-gray-600">우리 가족의 일상과 추억</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 group cursor-pointer">
                <div className="text-sm text-gray-500 mb-4">2024년 {i + 1}월</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition">
                  이야기 제목 {i + 1}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  가족과 함께한 소중한 순간과 일상의 이야기를 담았습니다. 매일이 소중한 추억이 됩니다.
                </p>
                <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition">더 읽기→</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/timeline" className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
              모든 이야기 보기→
            </a>
          </div>
        </div>
      </div>

      {/* Family Section */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">가족 소개</h2>
            <p className="text-xl text-gray-600">동일가족의 네 명</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { name: '심희정', role: '(엄마)' },
              { name: '김동일', role: '(아빠)' },
              { name: '김태환', role: '(큰아들)' },
              { name: '김민환', role: '(작은아들)' }
            ].map((person, i) => (
              <div key={i} className="group text-center">
                <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition duration-300">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {person.name}
                </h3>
                <p className="text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/family" className="inline-block border-2 border-slate-900 text-slate-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-slate-900 hover:text-white transition duration-300">
              가족 상세 정보→
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            새로운 순간을 기록하세요
          </h2>
          <p className="text-xl text-gray-200 mb-12">
            가족의 이야기를 함께 나누고 소중한 추억을 영원히 간직하세요.
          </p>
          <a href="/write" className="inline-block bg-white text-slate-900 px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-xl">
            ✏️ 이야기 작성하기
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-center text-gray-400">
        <p>© 2024 동일가족. 모든 추억은 소중합니다.</p>
      </footer>
    </div>
  )
}
