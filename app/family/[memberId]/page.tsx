import Link from 'next/link'

export default function MemberPage({ params }: { params: { memberId: string } }) {
  const memberData: Record<string, any> = {
    mom: {
      name: '심희정',
      role: '엄마',
      emoji: '👩',
      bio: '따뜻한 손길로 가족을 지키는 분',
      color: 'bg-pink-50',
      borderColor: 'border-pink-300',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      about: '가족의 중심에서 모두를 챙기고 사랑으로 감싸주시는 분입니다.',
      daily: [
        '일상의 소중함을 나누고 있습니다',
        '가족 행사를 계획하고 준비하고 있습니다',
        '매일 새로운 레시피를 시도하고 있어요'
      ]
    },
    dad: {
      name: '김동일',
      role: '아빠',
      emoji: '👨',
      bio: '가족의 중심이 되는 분',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      about: '든든한 등받이가 되어주고 가족을 이끌어주시는 분입니다.',
      daily: [
        '가족과의 시간을 소중히 여기고 있습니다',
        '사업 계획을 세우고 실행하고 있습니다',
        '가족 모두의 꿈을 응원하고 있습니다'
      ]
    },
    son1: {
      name: '김태환',
      role: '큰아들',
      emoji: '👦',
      bio: '형으로서의 책임감 있는 분',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      about: '대학생활을 하며 미래를 준비하고 있는 형입니다.',
      daily: [
        '대학 공부에 충실하고 있습니다',
        '동생들과의 시간을 소중히 하고 있습니다',
        '미래의 꿈을 구체화하고 있어요'
      ]
    },
    son2: {
      name: '김민환',
      role: '작은아들',
      emoji: '👦',
      bio: '막내로서의 밝은 에너지',
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      about: '막내로서 밝고 긍정적인 에너지를 나누고 있는 동생입니다.',
      daily: [
        '새로운 것들에 도전하고 있습니다',
        '가족과 함께하는 시간이 가장 좋아요',
        '꿈을 향해 열심히 나아가고 있습니다'
      ]
    }
  }

  const member = memberData[params.memberId]

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">찾을 수 없는 멤버입니다</h1>
        <Link href="/family">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            ← 가족소개로 돌아가기
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className={`${member.color} min-h-screen py-16`}>
      <div className="container mx-auto px-4">
        <Link href="/family">
          <button className="mb-8 text-blue-600 hover:text-blue-800 font-semibold">
            ← 가족소개로 돌아가기
          </button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className={`${member.borderColor} border-4 bg-white rounded-lg shadow-lg p-8 mb-8`}>
            <div className="text-7xl text-center mb-6">{member.emoji}</div>
            <h1 className="text-5xl font-bold text-center mb-2">{member.name}</h1>
            <p className="text-2xl text-gray-600 text-center mb-4">{member.role}</p>
            <p className="text-lg text-gray-700 text-center italic">{member.bio}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">소개</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {member.about}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">현재 하고 있는 것들</h2>
            <ul className="space-y-4">
              {member.daily.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-2xl mr-4">✨</span>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/gallery">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                📸 갤러리에서 사진 보기
              </button>
            </Link>
            <Link href="/timeline">
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold">
                📝 타임라인 보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
