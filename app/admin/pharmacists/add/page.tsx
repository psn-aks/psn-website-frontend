"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { endpoints } from "@/lib/serverApi";

export default function AddPharmacistPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        fellow: "No",
        school_attended: "",
        pcn_license_number: "",
        induction_year: "",
        date_of_birth: "",
        residential_address: "",
        place_of_work: "",
        technical_group: "",
        interest_groups: "",
        gender: "",
        phone_number: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const response = await fetch(endpoints.pharmacists, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    induction_year: Number(formData.induction_year),
                    interest_groups: formData.interest_groups
                        ? formData.interest_groups.split(",").map((g) => g.trim())
                        : [],
                }),
            })

            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.detail || "Failed to add pharmacist")
            }

            alert("✅ Pharmacist added successfully!")
            router.push("/admin/pharmacists")
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-16">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <motion.h1
                    className="text-3xl font-bold text-blue-900 mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Add New Pharmacist
                </motion.h1>

                {error && (
                    <div className="mb-6 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" name="full_name" placeholder="Pharm John Doe" value={formData.full_name} onChange={handleChange} required />
                        <Input label="Email" name="email" type="email" placeholder="john@doe.com" value={formData.email} onChange={handleChange} />
                        <Input label="School Attended" name="school_attended" placeholder="UNIUYO" value={formData.school_attended} onChange={handleChange} />
                        <Input label="License Number" name="pcn_license_number" placeholder="123456" value={formData.pcn_license_number} onChange={handleChange} />
                        <Input label="Induction Year" name="induction_year" type="number" placeholder="2010" value={formData.induction_year} onChange={handleChange} />
                        <Input label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
                        <Input label="Residential Address" name="residential_address" placeholder="11 Aka Road Uyo" value={formData.residential_address} onChange={handleChange} />
                        <Input label="Place of Work" name="place_of_work" placeholder="UUTH" value={formData.place_of_work} onChange={handleChange} />
                        <Select label="Technical Group" name="technical_group" value={formData.technical_group} onChange={handleChange}
                            options={["", "ACPN", "AHAPN", "NAIP"]} />
                        <Input label="Interest Groups (comma-separated)" name="interest_groups" placeholder="PSNYPG, ALPS, Elders Forum" value={formData.interest_groups} onChange={handleChange} />
                        <Select label="Fellow" name="fellow" value={formData.fellow} onChange={handleChange} options={["Yes", "No"]} />
                        <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["", "Male", "Female"]} />
                        <Input label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between mt-8 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-2 border-gray-400 hover:bg-gray-100"
                            onClick={() => router.push("/admin/pharmacists")}
                            disabled={loading}
                        >
                            <ArrowLeft size={18} />
                            Back to List
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {loading ? "Saving..." : "Save Pharmacist"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <input
                {...props}
                className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
        </div>
    )
}

function Select({
    label,
    options,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <select
                {...props}
                className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt || "Select..."}
                    </option>
                ))}
            </select>
        </div>
    )
}
