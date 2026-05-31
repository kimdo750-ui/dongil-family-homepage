import Link from 'next/link'

export default function FamilyPage() {
  const members = [
    {
      id: 'mom',
      name: '심희정',
      role: '엄마',
      description: '따뜻한 손길로 가족을 지키는 분',
      color: 'bg-pink-100',
      borderColor: 'border-pink-300'
    },
    {
      id: 'dad',
      name: '김동일',
      role: '아빠',
      description: '가족의 중심이 되는 분',
      color: 'bg-blue-100',
      borderColor: 'border-blue-300'
    },
    {
      id: 'son1',
      name: '김태환',
      role: '큰아들',
      description: '형으로서의 책임감 있는 분',
      color: 'bg-green-100',
      borderColor: 'border-green-300'
    },
    {
      id: 'son2',
      name: '김민환',
      role: '작은아들',
      description: '막내로서의 밝은 에너지',
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-300'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">👨‍👩‍👧‍👦 우리 가족</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          함께 만드는 특별한 추억들
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {members.map((member) => (
            <Link key={member.id} href={`/family/${member.id}`}>
              <div
                className={`${member.color} ${member.borderColor} border-4 rounded-lg p-8 cursor-pointer transform transition hover:scale-105 hover:shadow-lg`}
              >
                <div className="text-5xl mb-4">
                  {member.id === 'mom' && '👩'}
                  {member.id === 'dad' && '👨'}
                  {member.id === 'son1' && '👦'}
                  {member.id === 'son2' && '👦'}
                </div>
                <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                <p className="text-lg text-gray-600 mb-3">{member.role}</p>
                <p className="text-gray-700">{member.description}</p>
                <div className="mt-4 text-blue-600 font-semibold">
                  → 프로필 보기
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">우리 가족의 이야기</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            어렸을 때부터 함께 자란 우리 가족.
            많은 추억과 이야기들이 담겨 있는 이곳에서
            각자의 현재를 나누고 미래를 함께 그려갑니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            대학생활, 사업 계획, 그리고 일상의 작은 순간들...
            모든 것이 우리 가족의 소중한 자산입니다.
          </p>
        </div>

        <div className="text-center">
          <Link href="/gallery">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mr-4">
              📸 갤러리 보기
            </button>
          </Link>
          <Link href="/timeline">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
              📝 타임라인 보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
