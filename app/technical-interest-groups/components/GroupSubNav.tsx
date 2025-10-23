"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


export default function GroupSubNav({ base }: { base: string }) {
    const pathname = usePathname()
    const [clicked, setClicked] = useState<string | null>(null)

    const normalize = (path: string) =>
        path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path


    const tabs = [

        { name: "Home", href: `${base}` },
        { name: "Excos", href: `${base}/excos` },
        { name: "Members", href: `${base}/members` },
        { name: "Activities", href: `${base}/news` },
    ]

    return (
        <nav className="flex justify-center gap-6 mb-8">
            {tabs.map((tab) => {
                const isActive = normalize(pathname).startsWith(normalize(tab.href))
                const isClicked = clicked === tab.href

                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        onClick={() => setClicked(tab.href)}
                        className={`pb-2 border-b-2 transition-colors duration-200 active:scale-95 ${isActive || isClicked
                                ? "border-blue-600 text-blue-700 font-semibold"
                                : "border-transparent hover:border-blue-400 text-gray-600"
                            }`}
                    >
                        {tab.name}
                    </Link>
                )
            })}
        </nav>
    )
}
