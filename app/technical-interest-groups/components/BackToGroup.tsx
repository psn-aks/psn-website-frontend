"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackToGroup() {

    const router = useRouter()

    return (
        <div>
            <button
                onClick={() => router.push("/technical-interest-groups")}
                className="flex items-center gap-2 text-blue-600 hover:underline mb-6 cursor-pointer"
            >
                <ArrowLeft size={18} /> Back to Groups
            </button>



        </div>
    );
}