import { Pharmacist } from "@/types/pharmacist"

async function getPharmacistsByGroup(group: string): Promise<Pharmacist[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pharmacists?technical_group=${group}`,
    { cache: "no-store" } // fetch fresh data each time
  );
  if (!res.ok) throw new Error("Failed to fetch pharmacists");
  return res.json();
}


export default getPharmacistsByGroup;