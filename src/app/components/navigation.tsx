'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Links() {
    const pathname = usePathname()

    return (
        <nav>
            <ul className="mx-auto max-w-screen-xl px-6 py-3">
                <li className="p-1 font-medium">
                    <Link className={`flex items-center hover:text-blue-500 transition-colors link ${pathname === '/' ? 'active' : ''}`} href="/">
                        Home
                    </Link>
                </li>
            </ul>
        </nav>
    )
}