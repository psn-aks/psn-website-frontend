"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddAdvertPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [link, setLink] = useState("");
    const [priority, setPriority] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("link", link);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("priority", priority);
        if (image) formData.append("image", image);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/adverts`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to create advert");

            alert("Advert created successfully!");
            router.push("/admin/adverts");
        } catch (error) {
            console.error(error);
            alert("Error creating advert. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg border-t-4 border-green-600">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-blue-900">
                            Add New Advert
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter advert title"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter advert description"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-3 w-full h-48 object-cover rounded-md border"
                                    />
                                )}
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Priority */}
                            <div>
                                <Label htmlFor="link">Priority (1 - 10)</Label>
                                <Input
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    placeholder="7"
                                />
                            </div>

                            {/* Link */}
                            <div>
                                <Label htmlFor="link">External Link (optional)</Label>
                                <Input
                                    id="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-center gap-6 pt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="border-green-600 text-green-700 hover:bg-green-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save Advert"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
