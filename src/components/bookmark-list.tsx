'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Bookmark } from '@/types'
import { User } from '@supabase/supabase-js'
import { Trash2 } from 'lucide-react'

export default function BookmarkList({ user }: { user: User }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const supabase = createClient()

    useEffect(() => {
        // Initial fetch
        const fetchBookmarks = async () => {
            const { data } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false })
            if (data) setBookmarks(data)
        }

        fetchBookmarks()

        // Realtime subscription
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, user.id])

    const handleDelete = async (id: string) => {
        // Optimistic update
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
        const { error } = await supabase.from('bookmarks').delete().eq('id', id)
        if (error) {
            console.error('Error deleting bookmark:', error)
            // Ideally revert state here if error
        }
    }

    return (
        <div className="space-y-4">
            {bookmarks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No bookmarks yet. Add one above to get started!</p>
            ) : (
                bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.id}
                        className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-700 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex-1 min-w-0 mr-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
                                {bookmark.title}
                            </h3>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:text-blue-600 hover:underline truncate block"
                            >
                                {bookmark.url}
                            </a>
                        </div>
                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 opacity-0 group-hover:opacity-100 focus:opacity-100"
                            aria-label="Delete bookmark"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}
