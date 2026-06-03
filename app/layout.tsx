import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { ThemeToggle } from './components/theme-toggle'

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
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-200">
        <Providers>
          <nav className="bg-white dark:bg-slate-900 shadow-md border-b dark:border-slate-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="flex items-center">
                  <img src="/images/logo.png" alt="동일가족" className="h-32 w-auto" />
                </a>
                <div className="flex items-center gap-6">
                  <ul className="hidden md:flex gap-6">
                    <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">홈</a></li>
                    <li><a href="/family" className="hover:text-blue-600 dark:hover:text-blue-400 transition">가족소개</a></li>
                    <li><a href="/gallery" className="hover:text-blue-600 dark:hover:text-blue-400 transition">갤러리</a></li>
                    <li><a href="/timeline" className="hover:text-blue-600 dark:hover:text-blue-400 transition">타임라인</a></li>
                  </ul>
                  <ThemeToggle />
                </div>
              </div>
              {/* 모바일 메뉴 */}
              <ul className="md:hidden flex gap-4 mt-4 text-sm">
                <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">홈</a></li>
                <li><a href="/family" className="hover:text-blue-600 dark:hover:text-blue-400">가족소개</a></li>
                <li><a href="/gallery" className="hover:text-blue-600 dark:hover:text-blue-400">갤러리</a></li>
                <li><a href="/timeline" className="hover:text-blue-600 dark:hover:text-blue-400">타임라인</a></li>
              </ul>
            </div>
          </nav>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 border-t dark:border-slate-800">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 동일가족 홈페이지. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
