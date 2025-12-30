import Link from "next/link";

import { endpoints } from "@/lib/serverApi";
import { Pharmacist } from "@/types/pharmacist";
import ProfileImage from "@/components/profile_image/ProfileImage";
import EditProfileImageButton from "@/components/profile_image/EditProfileImageButton";


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

export default async function AdminPharmacistDetailPage({ params }: {params: Promise<{ license_number: string }>}) {
    const { license_number } = await params;
    const pharmacist: Pharmacist = await getPharmacist(license_number)

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
                
                <nav className="mb-6 text-sm text-gray-600">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link
                                href="/admin"
                                className="hover:text-blue-700 transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href="/admin/pharmacists"
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


                <div className="flex flex-col items-center mb-8">
                    <ProfileImage
                        src={pharmacist.profile_picture}
                        alt={`${pharmacist.full_name} profile picture`}
                    />
                    <EditProfileImageButton
                        licenseNumber={pharmacist.pcn_license_number}
                    />


                    <h1 className="mt-4 text-3xl font-bold text-blue-900 text-center">
                        {pharmacist.full_name}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        PCN: {pharmacist.pcn_license_number}
                    </p>
                </div>


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
