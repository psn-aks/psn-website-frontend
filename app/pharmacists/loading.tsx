import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Title shimmer */}
                <div className="flex justify-center mb-8">
                    <Skeleton className="h-8 w-64 rounded-lg" />
                </div>

                {/* Search bar shimmer */}
                <div className="flex justify-center mb-10">
                    <Skeleton className="h-12 w-full max-w-md rounded-xl" />
                </div>

                {/* Table shimmer */}
                <div className="bg-white shadow-md rounded-2xl overflow-hidden p-6">
                    <table className="w-full text-left">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Premise</th>
                                <th className="py-3 px-4">License No.</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Technical Group</th>
                                <th className="py-3 px-4">Interest Groups</th>
                                <th className="py-3 px-4">Fellow</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b">
                                    {Array.from({ length: 7 }).map((_, j) => (
                                        <td key={j} className="py-3 px-4">
                                            <Skeleton className="h-4 w-24 rounded-md" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Button shimmer */}
                <div className="mt-10 flex justify-center">
                    <Skeleton className="h-12 w-52 rounded-xl" />
                </div>
            </div>
        </main>
    )
}
