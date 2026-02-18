import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AuthButton from '@/components/auth-button'

export default async function LoginPage() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (user) {
        redirect('/')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-zinc-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmark Manager</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to manage your bookmarks</p>
                </div>
                <div className="mt-8 space-y-4">
                    <AuthButton />
                </div>
            </div>
        </div>
    )
}
