"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit, Trash2, PlusCircle } from "lucide-react";

interface Advert {
    uid: string;
    title: string;
    description: string;
    image_url?: string;
    start_date: string;
    end_date: string;
    priority: number;
    link?: string;
}

export default function AdvertsListPage() {
    const [adverts, setAdverts] = useState<Advert[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchAdverts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/adverts`);
                if (!res.ok) throw new Error("Failed to fetch adverts");
                const data = await res.json();
                setAdverts(data);
            } catch (error) {
                console.error(error);
                alert("Error fetching adverts.");
            } finally {
                setLoading(false);
            }
        }
        fetchAdverts();
    }, []);

    const handleDelete = async (uid: string) => {
        if (!confirm("Are you sure you want to delete this advert?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/adverts/${uid}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete advert");
            setAdverts((prev) => prev.filter((a) => a.uid !== uid));
        } catch (error) {
            console.error(error);
            alert("Error deleting advert.");
        }
    };

    const getStatus = (start: string, end: string) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (now < startDate) return "upcoming";
        if (now > endDate) return "expired";
        return "active";
    };

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-600">Active</Badge>;
            case "expired":
                return <Badge className="bg-red-600">Expired</Badge>;
            case "upcoming":
                return <Badge className="bg-yellow-500 text-black">Upcoming</Badge>;
            default:
                return null;
        }
    };

    if (loading)
        return (
            <main className="flex items-center justify-center min-h-screen text-gray-600">
                <Loader2 className="animate-spin mr-2" /> Loading adverts...
            </main>
        );

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-blue-900">Manage Adverts</h1>
                    <Link href="/admin/adverts/add">
                        <Button className="bg-green-600 hover:bg-green-700">
                            <PlusCircle className="w-4 h-4 mr-2" /> Add New Advert
                        </Button>
                    </Link>
                </div>

                {adverts.length === 0 ? (
                    <p className="text-center text-gray-500">No adverts found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adverts.map((advert) => {
                            const status = getStatus(advert.start_date, advert.end_date);
                            return (
                                <Card key={advert.uid} className="overflow-hidden shadow-md hover:shadow-lg transition">
                                    {advert.image_url ? (
                                        <img
                                            src={
                                                advert.image_url.startsWith("http")
                                                    ? advert.image_url
                                                    : `${process.env.NEXT_PUBLIC_API_URL}/${advert.image_url.replace(/\\/g, "/")}`
                                            }
                                            alt={advert.title}
                                            className="w-full h-40 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}

                                    <CardHeader>
                                        <CardTitle className="flex justify-between items-center">
                                            <span>{advert.title}</span>
                                            {renderStatusBadge(status)}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                                            {advert.description}
                                        </p>
                                        <p className="text-xs text-gray-400 mb-3">
                                            {new Date(advert.start_date).toLocaleDateString()} →{" "}
                                            {new Date(advert.end_date).toLocaleDateString()}
                                        </p>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push(`/admin/adverts/edit/${advert.uid}`)}
                                                className="flex items-center gap-1"
                                            >
                                                <Edit className="w-4 h-4" /> Edit
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(advert.uid)}
                                                className="flex items-center gap-1"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
