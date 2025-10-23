"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchBar({ pharmacists }: { pharmacists: any[] }) {
    const router = useRouter()
    const [query, setQuery] = useState("")

    const filteredPharmacists = useMemo(() => {
        const q = query.toLowerCase()
        return pharmacists.filter(
            (p) =>
                p.full_name.toLowerCase().includes(q) ||
                p.place_of_work.toLowerCase().includes(q) ||
                p.pcn_license_number?.toLowerCase().includes(q) ||
                p.residential_address?.toLowerCase().includes(q) ||
                p.technical_group?.toLowerCase().includes(q) ||
                p.fellow?.toLowerCase().includes(q) ||
                (Array.isArray(p.interest_groups) &&
                    p.interest_groups.some((ig: string) =>
                        ig.toLowerCase().includes(q)
                    ))
        )
    }, [query, pharmacists])

    return (
        <>
            {/* Search bar */}
            <div className="relative mb-10 max-w-md mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by pharmacist or license or location..."
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>

            {/* Results table */}
            <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="py-3 px-4 whitespace-nowrap">Name</th>
                                <th className="py-3 px-4 whitespace-nowrap">Premise</th>
                                <th className="py-3 px-4 whitespace-nowrap">License No.</th>
                                <th className="py-3 px-4 whitespace-nowrap">Location</th>
                                <th className="py-3 px-4 whitespace-nowrap">Technical Group</th>
                                <th className="py-3 px-4 whitespace-nowrap">Interest Groups</th>
                                <th className="py-3 px-4 whitespace-nowrap">Fellow</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPharmacists.length > 0 ? (
                                filteredPharmacists.map((pharmacist, index) => (
                                    <motion.tr
                                        key={pharmacist.pcn_license_number}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b hover:bg-green-50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                                            {pharmacist.full_name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {pharmacist.place_of_work}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                                            {pharmacist.pcn_license_number}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {pharmacist.residential_address}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {pharmacist.technical_group}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {pharmacist.interest_groups.join(", ") || "-"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {pharmacist.fellow}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No pharmacists found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
