import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '동일가족 홈페이지',
  description: '가족의 추억과 일상을 공유하는 공간',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900">
        <nav className="bg-white shadow-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <a href="/" className="flex items-center flex-shrink-0">
                <img src="/images/logo.png" alt="동일가족" className="h-20 md:h-40 w-auto" />
              </a>
              <ul className="flex flex-wrap gap-3 md:gap-6 text-base md:text-lg font-semibold">
                <li><a href="/" className="hover:text-blue-600 transition">홈</a></li>
                <li><a href="/family" className="hover:text-blue-600 transition">가족소개</a></li>
                <li><a href="/gallery" className="hover:text-blue-600 transition">갤러리</a></li>
                <li><a href="/timeline" className="hover:text-blue-600 transition">타임라인</a></li>
                <li><a href="/write" className="hover:text-blue-600 transition">글쓰기</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 동일가족 홈페이지. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
