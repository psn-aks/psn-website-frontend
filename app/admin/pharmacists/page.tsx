// app/admin/pharmacists/page.tsx
import AdminPharmacistsClient from "./AdminPharmacistsClient"

async function getPharmacists() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pharmacists`, {
        headers: { accept: "application/json" },
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Failed to fetch pharmacists")
    }

    return res.json()
}

export default async function AdminPharmacistsPage() {
    const pharmacists = await getPharmacists()

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
                    Admin – Pharmacists Directory
                </h1>

                <AdminPharmacistsClient pharmacists={pharmacists} />
            </div>
        </main>
    )
}
