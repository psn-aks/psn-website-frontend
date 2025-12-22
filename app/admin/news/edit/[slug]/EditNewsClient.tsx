"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { endpoints } from "@/lib/serverApi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface EditNewsClientProps {
    news: {
        id: number;
        slug: string;
        title: string;
        author: string;
        tags: string;
        content: string;
        group: string;
        image_url?: string;
    };
}

export default function EditNewsClient({ news }: EditNewsClientProps) {
    const [title, setTitle] = useState(news.title || "");
    const [author, setAuthor] = useState(news.author || "");
    const [tags, setTags] = useState(news.tags || "");
    const [content, setContent] = useState(news.content || "");
    const [group, setGroup] = useState(news.group || "");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(news.image_url || null);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    // 🖼 Handle image change and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);

        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    // 💾 Handle update
    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !content.trim()) {
            alert("Please fill in the title, author, and content.");
            return;
        }

        setSaving(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("tags", tags);
        formData.append("content", content);
        formData.append("group", group);
        if (image) formData.append("image", image);

        const res = await fetch(`${endpoints.news}/slug/${news.slug}`, {
            method: "PUT",
            body: formData,
        });

        setSaving(false);

        if (res.ok) {
            router.push("/admin/news");
        } else {
            alert("Error updating news article.");
        }
    };

    const handleCancel = () => {
        router.push("/admin/news");
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
            <Card className="shadow-lg rounded-2xl border border-gray-100">
                <CardContent className="space-y-6">
                    <h1 className="text-2xl font-semibold text-green-700">
                        ✏️ Edit News Article
                    </h1>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Title
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Author
                        </label>
                        <Input
                            type="text"
                            placeholder="Author name..."
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Article Content
                        </label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            theme="snow"
                            placeholder="Edit article content..."
                            className="bg-white rounded-lg"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Tags
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter tags (comma-separated)..."
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    {/* Group */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Group
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter Technical or Interest group..."
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </div>

                    {/* Image upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Upload Image
                        </label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 rounded-lg max-h-64 object-cover shadow-sm border"
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
