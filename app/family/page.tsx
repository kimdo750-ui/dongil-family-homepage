'use client'

import Link from 'next/link'

export default function FamilyPage() {
  const members = [
    {
      id: '1',
      name: '심희정',
      emoji: '👩‍🏫',
      image: '/images/family/mom.jpg',
      title: '30년 교육 전문가 & 어린이집 원장',
      tags: ['30년경력', '보육1급전문가', '가족의정신적지주'],
      bio: '30년 동안 아동 교육 현장의 첫 줄에서 아이들의 성장을 지켜온 교육 전문가입니다. \n1급 보육교사로서의 전문성을 바탕으로 어린이집을 운영하며 무수한 아이들과 학부모들의 신뢰를 얻었습니다.\n가족의 정신적 지주로서 사랑과 인내심으로 가족을 이끌며, 자녀들의 모든 도전을 응원하고 계십니다.',
      highlights: ['30년 아동 교육 경력', '1급 보육교사', '어린이집 원장', '교육 철학 전문가']
    },
    {
      id: '2',
      name: '김동일',
      emoji: '👨‍💼',
      image: '/images/family/dad.jpg',
      title: 'K-러그 비즈니스 전문가',
      tags: ['러그비즈니스', '전통문양', '비즈니스리더'],
      bio: 'AI와 증강현실 기술을 활용하여 한국 전통문양을 현대적으로 재해석한 프리미엄 러그 비즈니스를 주도하고 있습니다.\n전통과 혁신을 결합하여 새로운 가치를 창출하는 기업가정신으로\n어머니의 교육적 가치관을 바탕으로 사회에 긍정적인 영향을 미치는 비즈니스 모델을 구축 중입니다.',
      highlights: ['K-러그 비즈니스 주도', 'AI & AR 기술 활용', '한국 전통문양 현대화', '글로벌 마케팅']
    },
    {
      id: '3',
      name: '김태환',
      emoji: '👨‍💻',
      image: '/images/family/taehwan.jpg',
      title: '스마트팜 사업가 & 농업 기술 전문가',
      tags: ['스마트팜', '토마토농장', '정부지원사업'],
      bio: '정부 지원금 5억 원을 활용하여 1,000평 규모의 프리미엄 토마토 스마트팜 사업을 추진 중입니다.\n첨단 농업 기술과 과학적 경영을 통해 연간 50톤의 고품질 토마토를 생산하는\n실현 가능한 사업 모델을 구축하며, 어머니의 교육 전문성을 활용한 체험형 농장 확대를 비전으로 하고 있습니다.',
      highlights: ['1,000평 스마트팜', '정부 지원금 5억', '연간 50톤 생산', '3년 수익성 목표']
    },
    {
      id: '4',
      name: '김민환',
      emoji: '✈️',
      image: '/images/family/minhwan.jpg',
      title: '공군 ROTC 준비 & 항공 드론 전문가',
      tags: ['공군ROTC', '드론항공', '국방기술'],
      bio: '항공 모빌리티 분야의 전문가가 되기 위해 드론항공학과 진학과 공군 ROTC 장교 임관을 목표로 준비 중입니다.\n국방 분야에서 혁신과 기술로 기여하고자 하는 진지한 다짐을 지니고 있으며,\n2026년부터 2033년까지 7년의 명확한 커리어 로드맵을 구축하여 전문 장교로의 성장을 준비 중입니다.',
      highlights: ['드론항공학과 진학', '공군 ROTC 합격 준비', '항공 모빌리티 전문화', '7년 커리어 로드맵']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-black mb-4">가족 소개</h1>
          <p className="text-xl text-gray-300">어렸을 때부터 함께한 4명의 가족 구성원</p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-6">우리 가족을 소개합니다</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            어렸을 때부터 함께 자란 4명의 가족 구성원, 그들의 꿈과 도전, 그리고 함께하는 성장의 이야기
          </p>
        </div>
      </div>

      {/* Members */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-7xl space-y-20">
          {members.map((member, idx) => (
            <div key={member.id} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="mb-8"></div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">{member.name}</h3>
                <p className="text-2xl text-blue-600 font-bold mb-4">{member.title}</p>

                <div className="flex gap-2 mb-6 flex-wrap">
                  {member.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {member.bio}
                </p>

                <div className="space-y-3">
                  {member.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div className="w-full aspect-square rounded-2xl shadow-2xl hover:shadow-xl transition transform hover:scale-105 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="py-32 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-black text-slate-900 mb-16 text-center">우리가 함께하는 방식</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: '🤝', title: '함께 만드는 공간', desc: '모든 가족 구성원이 직접 이야기를 작성하고 추억을 기록할 수 있는 참여형 구조로 설계되었습니다.' },
              { emoji: '📖', title: '기록의 연속성', desc: '과거의 추억(어린 시절 사진)부터 현재의 일상(사업, 대학 생활)까지 연결되는 시간의 흐름을 담습니다.' },
              { emoji: '💝', title: '따뜻한 소통', desc: '가족 모두가 서로를 격려하고 응원하는 문화 속에서 각자의 성장을 나누고 기념합니다.' },
              { emoji: '🚀', title: '미래지향적 성장', desc: '개인의 도전과 가족의 안정이 어우러져 함께 나아갈 수 있는 미래를 그립니다.' }
            ].map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-32 px-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-black text-white mb-16 text-center">우리 가족의 수치</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-black mb-2">30+</div>
              <p className="text-gray-300">년의 교육 경력</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">4</div>
              <p className="text-gray-300">명의 가족 구성원</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">∞</div>
              <p className="text-gray-300">개의 소중한 추억</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">3</div>
              <p className="text-gray-300">개의 주요 사업</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-6">우리의 포트폴리오를 살펴보세요</h2>
          <p className="text-xl text-gray-600 mb-12">
            30년 교육 전문가의 역량과 가족의 혁신적인 사업이 담긴 프로젝트들을 만나보세요.
          </p>
          <a href="/portfolio" className="inline-block bg-slate-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
            포트폴리오 보기
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-8 px-4 bg-slate-50 text-center">
        <a href="/" className="text-blue-600 font-semibold hover:text-blue-800 transition">
          ← 홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}
