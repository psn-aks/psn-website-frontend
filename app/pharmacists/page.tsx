import SearchBar from "./components/SearchBar"

async function getPharmacists() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pharmacists`, {
        headers: { accept: "application/json" },
        next: { revalidate: 60 }, 
    })
    if (!res.ok) throw new Error("Failed to fetch pharmacists")
    return res.json()
}

export default async function PharmacistsPage() {
    const pharmacists = await getPharmacists()

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
                    Pharmacists Directory
                </h1>
                
                <SearchBar pharmacists={pharmacists} />
            </div>
        </main>
    )
}

