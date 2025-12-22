import { Pharmacist } from "@/types/pharmacist"
import { endpoints } from "@/lib/serverApi";


async function getPharmacistsByGroup(group: string): Promise<Pharmacist[]> {
  const res = await fetch(
    `${endpoints.pharmacists}?technical_group=${group}`,
    { cache: "no-store" } // fetch fresh data each time
  );
  if (!res.ok) throw new Error("Failed to fetch pharmacists");
  return res.json();
}


export default getPharmacistsByGroup;