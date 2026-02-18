import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BookmarkList from '@/components/bookmark-list'
import AddBookmark from '@/components/add-bookmark'
import { LogOut } from 'lucide-react'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors">
      <nav className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 shadow-sm sticky top-0 z-10 w-full mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              My Bookmarks
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block truncate max-w-[150px]">
                {user.email}
              </span>
              <form action="/auth/signout" method="post">
                <button
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
                  type="submit"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AddBookmark user={user} />
        <BookmarkList user={user} />
      </main>
    </div>
  )
}
