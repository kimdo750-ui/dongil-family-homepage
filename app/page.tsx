export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="mb-8">
            <span className="text-8xl drop-shadow-lg">👨‍👩‍👧‍👦</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-white leading-tight drop-shadow-2xl">
            동일가족
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light leading-relaxed">
            어렸을 때부터 함께 자란 우리의 추억과 일상을 담는<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">특별한 공간</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/family" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-lg">
              👥 가족 소개
            </a>
            <a href="/timeline" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition transform duration-300 hover:scale-105">
              📝 타임라인
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              우리의 공간
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-10 rounded-3xl group-hover:bg-transparent transition duration-300">
                <div className="text-6xl mb-6">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition duration-300">
                  가족 소개
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-white transition duration-300">
                  심희정, 김동일, 김태환, 김민환. 우리 가족의 이야기를 소개합니다.
                </p>
                <a href="/family" className="inline-flex items-center font-bold text-pink-500 group-hover:text-white transition duration-300">
                  자세히 보기 <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-10 rounded-3xl group-hover:bg-transparent transition duration-300">
                <div className="text-6xl mb-6">📸</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition duration-300">
                  갤러리
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-white transition duration-300">
                  어렸을 때부터 함께한 소중한 순간들을 사진으로 담았습니다.
                </p>
                <a href="/gallery" className="inline-flex items-center font-bold text-blue-500 group-hover:text-white transition duration-300">
                  사진 보기 <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-10 rounded-3xl group-hover:bg-transparent transition duration-300">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition duration-300">
                  타임라인
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-white transition duration-300">
                  대학, 사업, 일상, 추억. 우리의 이야기를 시간순으로 기록합니다.
                </p>
                <a href="/timeline" className="inline-flex items-center font-bold text-green-500 group-hover:text-white transition duration-300">
                  이야기 보기 <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-24 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-black text-white text-center mb-16">
            우리의 숫자
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">4</div>
              <p className="text-gray-300 text-lg">가족 구성원</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">∞</div>
              <p className="text-gray-300 text-lg">소중한 추억</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-pink-400 mb-2">📸</div>
              <p className="text-gray-300 text-lg">함께한 순간</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-2">💝</div>
              <p className="text-gray-300 text-lg">끝없는 사랑</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-black text-slate-900 mb-6">
            함께 만드는 추억
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            가족 모두가 참여하는 이 공간에서 각자의 이야기를 나누고<br className="hidden md:block" />
            소중한 순간들을 영원히 기억해보세요.
          </p>
          <a href="/write" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 shadow-lg">
            ✏️ 이야기 작성하기
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
