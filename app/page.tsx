export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-6 animate-bounce">
            <span className="text-6xl">👨‍👩‍👧‍👦</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            동일가족
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            어렸을 때부터 함께 자란 우리의 추억과 일상을 담는 특별한 공간
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/family" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-lg transition transform hover:scale-105">
              👥 가족 알아보기
            </a>
            <a href="/timeline" className="bg-white bg-opacity-20 text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-30 transition transform hover:scale-105 border border-white">
              📝 이야기 보기
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 h-40 flex items-center justify-center">
              <span className="text-6xl">👨‍👩‍👧‍👦</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">가족소개</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                심희정, 김동일, 김태환, 김민환. 네 명의 소중한 가족을 만나보세요.
              </p>
              <a href="/family" className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                자세히 보기 →
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-40 flex items-center justify-center">
              <span className="text-6xl">📸</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">갤러리</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                어렸을 때부터 함께한 소중한 순간들을 사진으로 담았습니다.
              </p>
              <a href="/gallery" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                사진 보기 →
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-40 flex items-center justify-center">
              <span className="text-6xl">📝</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">타임라인</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                대학생활, 사업, 할일, 추억. 우리의 이야기를 시간순으로 기록합니다.
              </p>
              <a href="/timeline" className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                이야기 보기 →
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">우리의 이야기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600">가족 구성원</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
              <p className="text-gray-600">소중한 추억</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">📸</div>
              <p className="text-gray-600">함께한 사진</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">💝</div>
              <p className="text-gray-600">사랑과 응원</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">함께 만드는 추억</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            가족 모두가 참여하는 이 공간에서 각자의 이야기를 나누고 소중한 추억을 기록해보세요.
          </p>
          <a href="/write" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:scale-105">
            ✏️ 첫 번째 이야기 작성하기
          </a>
        </div>
      </div>
    </div>
  )
}
