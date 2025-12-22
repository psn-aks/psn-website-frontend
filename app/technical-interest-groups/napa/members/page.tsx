import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"
import BackToGroup from "@/app/technical-interest-groups/components/BackToGroup"
import getPharmacistsByGroup from "../../get_members"


export default async function NAPAMembersPage() {

    const members = await getPharmacistsByGroup("NAPA")

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
                <BackToGroup />
                
                <GroupSubNav base="/technical-interest-groups/napa" />
                <h1 className="text-2xl font-bold text-blue-800 mb-6">
                    NAPA Members
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-t">
                        <thead className="bg-blue-100 text-blue-900">
                            <tr>
                                <th className="py-2 px-3">Name</th>
                                <th className="py-2 px-3">Premise</th>
                                <th className="py-2 px-3">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m) => (
                                <tr key={m.pcn_license_number} className="border-b hover:bg-blue-50">
                                    <td className="py-2 px-3">{m.full_name}</td>
                                    <td className="py-2 px-3">{m.place_of_work}</td>
                                    <td className="py-2 px-3">{m.residential_address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {members.length === 0 && (
                    <p className="text-gray-500 italic text-center py-6">
                        No members found in this group.
                    </p>
                )}
            </div>
        </main>
    )
}
