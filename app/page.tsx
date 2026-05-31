export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">동일가족 홈페이지</h1>
        <p className="text-xl text-gray-600 mb-8">
          어렸을 때부터 함께한 추억들을 간직하는 공간입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">👨‍👩‍👧‍👦 가족소개</h2>
            <p className="text-gray-600 mb-4">
              엄마, 아빠, 형, 동생이 함께 만드는 특별한 이야기
            </p>
            <a href="/family" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              자세히 보기
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">📸 갤러리</h2>
            <p className="text-gray-600 mb-4">
              함께 찍은 사진들과 그 추억들
            </p>
            <a href="/gallery" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              자세히 보기
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">📝 일상</h2>
            <p className="text-gray-600 mb-4">
              대학생활, 사업, 그리고 함께한 순간들
            </p>
            <a href="/timeline" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              자세히 보기
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">⭐ 특별함</h2>
            <p className="text-gray-600 mb-4">
              더 많은 이야기가 기다리고 있습니다.
            </p>
            <a href="/gallery" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              자세히 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
