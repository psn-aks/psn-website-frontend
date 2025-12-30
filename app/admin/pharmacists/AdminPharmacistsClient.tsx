"use client";

import { useState, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { API_BASE_URL } from "@/lib/clientApi";
import { endpoints } from "@/lib/serverApi";


export default function AdminPharmacistsClient({
    pharmacists,
}: {
    pharmacists: any[];
}) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition();

    /* -------------------- filtering -------------------- */
    const filteredPharmacists = useMemo(() => {
        const q = query.toLowerCase();
        return pharmacists.filter(
            (p) =>
                p.full_name?.toLowerCase().includes(q) ||
                p.place_of_work?.toLowerCase().includes(q) ||
                p.pcn_license_number?.toLowerCase().includes(q) ||
                p.residential_address?.toLowerCase().includes(q) ||
                p.technical_group?.toLowerCase().includes(q) ||
                p.fellow?.toLowerCase().includes(q) ||
                (Array.isArray(p.interest_groups) &&
                    p.interest_groups.some((ig: string) =>
                        ig.toLowerCase().includes(q)
                    ))
        );
    }, [query, pharmacists]);

    /* -------------------- delete -------------------- */
    const handleDelete = async (license: string) => {
        if (!confirm("Are you sure you want to delete this pharmacist?")) return;

        try {
            const res = await fetch(
                `${endpoints.pharmacists}/${license}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Failed");

            startTransition(() => router.refresh());
        } catch (err) {
            alert("Error deleting pharmacist");
            console.error(err);
        }
    };

    /* -------------------- export (backend-driven) -------------------- */
    function exportCSV() {
        const params = new URLSearchParams({ q: query });
        window.open(`${API_BASE_URL}/api/v1/pharmacists/export/csv?${params}`);
    }

    function exportExcel() {
        const params = new URLSearchParams({ q: query });
        window.open(`${API_BASE_URL}/api/v1/pharmacists/export/excel?${params}`);
    }

    return (
        <>
            {/* Search */}
            <div className="relative mb-10 max-w-md mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search pharmacists..."
                    className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <Search
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                />
            </div>

            {/* Export dropdown (attendance-style) */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 px-3 py-2 rounded-xl shadow">
                    <select
                        defaultValue=""
                        onChange={(e) => {
                            const v = e.target.value;
                            if (v === "csv") exportCSV();
                            if (v === "excel") exportExcel();
                            e.currentTarget.value = "";
                        }}
                        className="bg-transparent outline-none text-gray-700"
                    >
                        <option value="">Export</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="py-3 px-4 whitespace-nowrap">Name</th>
                                <th className="py-3 px-4 whitespace-nowrap">Place of Work</th>
                                <th className="py-3 px-4 whitespace-nowrap">License No.</th>
                                <th className="py-3 px-4 whitespace-nowrap">Location</th>
                                <th className="py-3 px-4 whitespace-nowrap">Technical Group</th>
                                <th className="py-3 px-4 whitespace-nowrap">Interest Groups</th>
                                <th className="py-3 px-4 whitespace-nowrap">Fellow</th>
                                <th className="py-3 px-4 whitespace-nowrap text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPharmacists.length > 0 ? (
                                filteredPharmacists.map((p, i) => (
                                    <motion.tr
                                        key={p.pcn_license_number}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="border-b hover:bg-green-50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    router.push(`/admin/pharmacists/${p.pcn_license_number}`)
                                                }
                                                className="text-blue-700 hover:underline hover:text-blue-900 transition"
                                            >
                                                {p.full_name}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.place_of_work}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.pcn_license_number}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.residential_address}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.technical_group}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {Array.isArray(p.interest_groups)
                                                ? p.interest_groups.join(", ")
                                                : "-"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.fellow}
                                        </td>

                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-3">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-blue-600"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/pharmacists/edit/${p.pcn_license_number}`
                                                        )
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-red-600"
                                                    onClick={() =>
                                                        handleDelete(
                                                            p.pcn_license_number
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
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

            {/* Add */}
            <div className="mt-8 flex justify-center">
                <Button
                    onClick={() =>
                        router.push("/admin/pharmacists/add")
                    }
                    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
                >
                    + Add New Pharmacist
                </Button>
            </div>
        </>
    );
}
