'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Loader2, Plus } from 'lucide-react'

export default function AddBookmark({ user }: { user: User }) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !url) return

        setLoading(true)
        const { error } = await supabase.from('bookmarks').insert({
            title,
            url,
            user_id: user.id,
        })

        setLoading(false)

        if (error) {
            console.error('Error adding bookmark:', error)
            alert('Failed to add bookmark: ' + error.message)
        } else {
            setTitle('')
            setUrl('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-all hover:shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Add New Bookmark</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Title (e.g., My Blog)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
                        required
                    />
                </div>
                <div className="flex-1">
                    <input
                        type="url"
                        placeholder="URL (e.g., https://example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[120px] shadow-sm hover:shadow"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-5 h-5 mr-2" />
                            Add
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
