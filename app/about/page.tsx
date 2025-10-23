import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
            <section className="max-w-5xl mx-auto space-y-16">
                {/* Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-700 mb-2">About Us</h1>
                    <p className="text-gray-600">
                        Learn more about our existence, mission, and leadership.
                    </p>
                </div>

                {/* 1️⃣ Existence */}
                <Card className="shadow-md">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-2xl font-semibold text-green-700">Our Existence</h2>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            The Pharmaceutical Society of Nigeria (PSN), Akwa Ibom State branch was
                            established to promote and protect the practice of pharmacy within
                            the the state. Our existence is rooted in the belief that
                            pharmacists play an indispensable role in the healthcare delivery
                            system, ensuring safe and effective use of medicines for all.
                        </p>
                    </CardContent>
                </Card>

                {/* 2️⃣ Aims & Objectives */}
                <Card className="shadow-md">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-2xl font-semibold text-green-700">Aims & Objectives</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>To promote excellence and professionalism in pharmacy practice.</li>
                            <li>To safeguard public health through rational use of medicines.</li>
                            <li>To foster collaboration among pharmacists and other healthcare providers.</li>
                            <li>To engage in continuous education and policy advocacy for pharmacy growth.</li>
                            <li>To support research and innovation in pharmaceutical care.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* 3️⃣ Code of Ethics */}
                <Card className="shadow-md">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-2xl font-semibold text-green-700">Code of Ethics</h2>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            We uphold the highest standards of integrity, responsibility, and
                            respect in all our dealings. Our members are expected to:
                        </p>
                        <ul className="list-decimal pl-6 text-gray-700 space-y-2">
                            <li>Serve patients with honesty, compassion, and professionalism.</li>
                            <li>Maintain confidentiality and trust at all times.</li>
                            <li>Abide by all regulations governing pharmacy practice in Nigeria.</li>
                            <li>Promote ethical competition and mutual respect among colleagues.</li>
                            <li>Commit to lifelong learning and self-development.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* 4️⃣ Vision & Mission */}
                <Card className="shadow-md">
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-2xl font-semibold text-green-700">Vision & Mission</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg text-green-600">Vision</h3>
                                <p className="text-gray-700">
                                    To be the leading professional association advancing
                                    pharmacy practice and promoting quality healthcare delivery
                                    across Nigeria.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-green-600">Mission</h3>
                                <p className="text-gray-700">
                                    To empower pharmacists through education,
                                    collaboration, and advocacy, fostering innovation and ethical
                                    service to humanity.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5️⃣ Executive Members */}
                <section>
                    <h2 className="text-2xl font-semibold text-green-700 mb-6">Executive Members</h2>
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {/* Example Executive Card */}
                        {[
                            { name: "Dr. John Okon", role: "Chairman", img: "/images/logo.png" },
                            { name: "Pharm. Grace Udo", role: "Vice Chairperson", img: "/images/logo.png" },
                            { name: "Pharm. Michael Etuk", role: "Secretary", img: "/images/logo.png" },
                            { name: "Dr. John Okon", role: "Chairman", img: "/images/logo.png" },
                            { name: "Pharm. Grace Udo", role: "Vice Chairperson", img: "/images/logo.png" },
                            { name: "Pharm. Michael Etuk", role: "Secretary", img: "/images/logo.png" },
                        ].map((exec, i) => (
                            <div
                                key={i}
                                className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                            >
                                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4">
                                    <Image
                                        src={exec.img}
                                        alt={exec.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-green-700">{exec.name}</h3>
                                <p className="text-gray-500 text-sm">{exec.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </main>
    );
}
