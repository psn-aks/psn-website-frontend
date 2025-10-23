"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pharmacist } from "@/types/pharmacist";


export default function EditPharmacistClient({ pharmacist }: { pharmacist: Pharmacist }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        email: pharmacist.email || "",
        full_name: pharmacist.full_name || "",
        fellow: pharmacist.fellow || "",
        school_attended: pharmacist.school_attended || "",
        pcn_license_number: pharmacist.pcn_license_number || "",
        induction_year: pharmacist.induction_year || "",
        date_of_birth: pharmacist.date_of_birth
            ? pharmacist.date_of_birth.split("T")[0]
            : "",
        residential_address: pharmacist.residential_address || "",
        place_of_work: pharmacist.place_of_work || "",
        technical_group: pharmacist.technical_group || "",
        gender: pharmacist.gender || "",
        interest_groups: pharmacist.interest_groups?.join(", ") || "",
        created_at: pharmacist.created_at
            ? new Date(pharmacist.created_at).toLocaleString()
            : "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pharmacists/${pharmacist.pcn_license_number}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...formData,
                        interest_groups: formData.interest_groups
                            .split(",")
                            .map((g) => g.trim())
                            .filter(Boolean),
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to update pharmacist");

            alert("✅ Pharmacist updated successfully!");
            router.push("/admin/pharmacists");
            router.refresh();
        } catch (err: any) {
            alert("❌ Error updating pharmacist");
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Two-column responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {error && <p className="text-red-600 text-center">{error}</p>}

                {/* LEFT COLUMN */}
                <div className="space-y-5">
                    <Field label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
                    <Field label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    <div>
                        <label className="block text-sm font-semibold text-green-700 mb-1">
                            Fellow
                        </label>
                        <select
                            name="fellow"
                            value={formData.fellow}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <Field label="School Attended" name="school_attended" value={formData.school_attended} onChange={handleChange} />
                    <Field label="License Number" name="pcn_license_number" value={formData.pcn_license_number} readOnly />
                    <Field label="Induction Year" name="induction_year" value={formData.induction_year} onChange={handleChange} type="number" />
                    <Field label="Date of Birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} type="date" />
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-5">
                    <Field label="Residential Address" name="residential_address" value={formData.residential_address} onChange={handleChange} />
                    <Field label="Place of Work" name="place_of_work" value={formData.place_of_work} onChange={handleChange} />
                    <Field label="Technical Group" name="technical_group" value={formData.technical_group} onChange={handleChange} />
                    <div>
                        <label className="block text-sm font-semibold text-green-700 mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <Field label="Interest Groups (comma-separated)" name="interest_groups" value={formData.interest_groups} onChange={handleChange} />
                    <Field label="Created At" name="created_at" value={formData.created_at} readOnly />
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-center gap-6 pt-8">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-green-600 text-green-700 hover:bg-green-50"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-xl"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </motion.form>
    );
}

/* Reusable input field */
function Field({
    label,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    readOnly = false,
}: any) {
    return (
        <div>
            <label className="block text-sm font-semibold text-green-700 mb-1">
                {label}
            </label>
            <Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                className={`${readOnly ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-green-500"
                    } border border-gray-300 rounded-xl py-2 px-3 text-gray-700 shadow-sm`}
            />
        </div>
    );
}
