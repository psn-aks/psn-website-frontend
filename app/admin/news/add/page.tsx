"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { endpoints } from "@/app/config/api";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function NewsEditorPage() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [group, setGroup] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();

    // 🧠 Load draft from localStorage (auto-save)
    useEffect(() => {
        const savedTitle = localStorage.getItem("news_draft_title");
        const savedAuthor = localStorage.getItem("news_draft_author");
        const savedTags = localStorage.getItem("news_draft_tags");
        const savedContent = localStorage.getItem("news_draft_content");
        const savedGroup = localStorage.getItem("news_draft_group");
        if (savedTitle) setTitle(savedTitle);
        if (savedAuthor) setAuthor(savedAuthor);
        if (savedTags) setTags(savedTags);
        if (savedContent) setContent(savedContent);
        if (savedGroup) setGroup(savedGroup);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("news_draft_title", title);
            localStorage.setItem("news_draft_author", author);
            localStorage.setItem("news_draft_tags", tags);
            localStorage.setItem("news_draft_content", content);
            localStorage.setItem("news_draft_group", group);
        }, 500);
        return () => clearTimeout(timeout);
    }, [title, author, tags, content, group]);

    // 🖼 Handle image upload + preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);

        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !content.trim()) {
            alert("Please enter a title, author, content and group.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("tags", tags);
        formData.append("content", content);
        formData.append("group", group);
        if (image) formData.append("image", image);

        const res = await fetch(endpoints.news, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            // Clear drafts on successful submission
            localStorage.removeItem("news_draft_title");
            localStorage.removeItem("news_draft_author");
            localStorage.removeItem("news_draft_tags");
            localStorage.removeItem("news_draft_content");
            localStorage.removeItem("news_draft_group");
            router.push("/news");
        } else {
            alert("Error publishing news item.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 space-y-4">
            <Card>
                <CardContent className="space-y-4">
                    <h1 className="text-2xl font-semibold">📰 Create News Article</h1>

                    {/* Title */}
                    <Input
                        type="text"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Author */}
                    <Input
                        type="text"
                        placeholder="Author name..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    {/* Editor */}
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        placeholder="Write your article content..."
                        className="bg-white rounded-lg"
                    />

                    {/* Tags */}
                    <Input
                        type="text"
                        placeholder="Enter tags (comma-separated)..."
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />

                    {/* Group */}
                    <Input
                        type="text"
                        placeholder="Enter Technical or Interest group (comma-separated)..."
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                    />

                    {/* Image upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Upload Image</label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 rounded-lg max-h-64 object-cover"
                            />
                        )}
                    </div>

                    {/* Submit button */}
                    <Button onClick={handleSubmit} className="w-full">
                        Publish Article
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
