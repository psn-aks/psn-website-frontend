import { endpoints } from "@/lib/serverApi";
import Link from "next/link";


async function getPharmacist(licenseNumber: string) {
    const res = await fetch(
        `${endpoints.pharmacists}/${licenseNumber}`,
        {
            headers: { accept: "application/json" },
            next: { revalidate: 60 },
        }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch pharmacist")
    }

    return res.json()
}

export default async function PharmacistDetailPage({ params }: {params: Promise<{ license_number: string }>}) {
    const { license_number } = await params;
    const pharmacist = await getPharmacist(license_number)

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
                
                <nav className="mb-6 text-sm text-gray-600">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-blue-700 transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href="/pharmacists"
                                className="hover:text-blue-700 transition"
                            >
                                Pharmacists
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium">
                            {pharmacist.pcn_license_number}
                        </li>
                    </ol>
                </nav>

                
                <h1 className="text-3xl font-bold text-blue-900 mb-6">
                    {pharmacist.full_name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                    <Detail label="License Number" value={pharmacist.pcn_license_number} />
                    <Detail label="Email" value={pharmacist.email} />
                    <Detail label="Gender" value={pharmacist.gender} />
                    <Detail label="Fellow" value={pharmacist.fellow} />
                    <Detail label="School Attended" value={pharmacist.school_attended} />
                    <Detail label="Induction Year" value={pharmacist.induction_year} />
                    <Detail label="Date of Birth" value={pharmacist.date_of_birth} />
                    <Detail label="Residential Address" value={pharmacist.residential_address} />
                    <Detail label="Place of Work" value={pharmacist.place_of_work} />
                    <Detail label="Technical Group" value={pharmacist.technical_group} />
                    <Detail label="Phone Number" value={pharmacist.phone_number} />
                    <Detail
                        label="Interest Groups"
                        value={pharmacist.interest_groups.join(", ")}
                    />
                </div>
            </div>
        </main>
    )
}

function Detail({ label, value }: { label: string; value: any }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value || "-"}</p>
        </div>
    )
}
