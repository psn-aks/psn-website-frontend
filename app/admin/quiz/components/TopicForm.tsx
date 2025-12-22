"use client";

import { useEffect, useState } from "react";

type TopicFormProps = {
    onSave: (data: { title: string; description?: string }) => void;
    initialData?: { title: string; description?: string };
};

export default function TopicForm({ onSave, initialData }: TopicFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return alert("Title is required");
        onSave({ title, description });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
