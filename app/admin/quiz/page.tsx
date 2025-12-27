"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import TopicList from "./components/TopicList";
import TopicFormModal from "./components/TopicFormModal";
import { endpoints } from "@/lib/serverApi";
import { Topic } from "@/types/quiz";

export default function AdminTopicsPage() {
    const router = useRouter();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    const [topicModalOpen, setTopicModalOpen] = useState(false);
    const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

    // Fetch Topics
    useEffect(() => {
        async function fetchTopics() {
            try {
                const res = await fetch(`${endpoints.quiz}/topics`);
                const data = await res.json();
                setTopics(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTopics();
    }, []);

    // CRUD operations
    async function handleDeleteTopic(id: string) {
        if (!confirm("Delete this topic?")) return;
        await fetch(`${endpoints.quiz}/topics/${id}`, { method: "DELETE" });
        setTopics((prev) => prev.filter((t) => t._id !== id));
    }

    if (loading) return <p className="text-center py-10">Loading…</p>;

    return (
        <main className="max-w-4xl mx-auto p-10">
            <div className="flex justify-between items-center mb-6 ">
                <h1 className="text-3xl font-bold text-blue-900">Pick your Weapon 🥷</h1>
                <Button className="bg-green-500" size="sm" onClick={() => { setEditingTopic(null); setTopicModalOpen(true); }}>+ Add Topic</Button>
            </div>

            <TopicList
                topics={topics}
                selectedTopic={null}
                onSelectTopic={(t) => router.push(`/admin/quiz/topics/${t.slug}`)}
                onEditTopic={(t) => { setEditingTopic(t); setTopicModalOpen(true); }}
                onDeleteTopic={handleDeleteTopic}
            />

            <TopicFormModal
                open={topicModalOpen}
                initialData={editingTopic ?? undefined}
                onClose={() => setTopicModalOpen(false)}
                onSave={async (data) => {
                    const method = editingTopic ? "PUT" : "POST";
                    const url = editingTopic
                        ? `${endpoints.quiz}/topics/${editingTopic._id}`
                        : `${endpoints.quiz}/topics`;
                    console.log(data);
                    
                    const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
                    const saved = await res.json();
                    setTopics((prev) => editingTopic ? prev.map(t => t._id === saved._id ? saved : t) : [...prev, saved]);
                    setTopicModalOpen(false);
                }}
            />
        </main>
    );
}
