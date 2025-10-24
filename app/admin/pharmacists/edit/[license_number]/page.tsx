import EditPharmacistClient from "./EditPharmacistClient";
import { endpoints } from "@/app/config/api";


async function getPharmacist(license_number: string) {
    const res = await fetch(
        `${endpoints.pharmacists}/${license_number}`,
        {
            headers: { accept: "application/json" },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch pharmacist details");
    }

    return res.json();
}

export default async function EditPharmacistPage(props: {
    params: Promise<{ license_number: string }>

}) {
    const { license_number } = await props.params
    const pharmacist = await getPharmacist(license_number)

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center">
                    Edit Pharmacist
                </h1>

                <EditPharmacistClient pharmacist={pharmacist} />
            </div>
        </main>
    );
}
