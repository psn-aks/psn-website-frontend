"use client";

import { useState, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { endpoints } from "@/app/config/api";


export default function AdminPharmacistsClient({ pharmacists }: { pharmacists: any[] }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition();

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
                    p.interest_groups.some((ig: string) => ig.toLowerCase().includes(q)))
        );
    }, [query, pharmacists]);

    const handleDelete = async (license: string) => {
        if (!confirm("Are you sure you want to delete this pharmacist?")) return;

        try {
            const res = await fetch(
                `${endpoints.pharmacists}/${license}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Failed to delete pharmacist");

            // Refresh page data
            startTransition(() => router.refresh());
        } catch (error) {
            alert("Error deleting pharmacist");
            console.error(error);
        }
    };

    return (
        <>
            {/* Search bar */}
            <div className="relative mb-10 max-w-md mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, license, or location..."
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
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Premise</th>
                                <th className="py-3 px-4">License No.</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Technical Group</th>
                                <th className="py-3 px-4">Interest Groups</th>
                                <th className="py-3 px-4">Fellow</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPharmacists.length > 0 ? (
                                filteredPharmacists.map((p, index) => (
                                    <motion.tr
                                        key={p.pcn_license_number || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b hover:bg-green-50 transition"
                                    >
                                        <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                                            {p.full_name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{p.place_of_work}</td>
                                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{p.pcn_license_number}</td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{p.residential_address}</td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{p.technical_group}</td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                                            {p.interest_groups.join(", ") || "-"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{p.fellow}</td>

                                        {/* Actions */}
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.push(`/admin/pharmacists/edit/${p.pcn_license_number}`)}
                                                    className="text-blue-600 border-blue-500 hover:bg-blue-50"
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(p.pcn_license_number)}
                                                    className="text-red-600 border-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                                        No pharmacists found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add button */}
            <div className="mt-8 flex justify-center">
                <Button
                    onClick={() => router.push("/admin/pharmacists/add")}
                    className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-xl cursor-pointer"
                >
                    + Add New Pharmacist
                </Button>
            </div>
        </>
    );
}
