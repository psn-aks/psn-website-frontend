"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

import QuestionList from "../../components/QuestionList";
import QuestionFormModal from "../../components/QuestionFormModal";
import { endpoints } from "@/lib/serverApi";
import { Question, Topic } from "@/types/quiz";


export default function AdminTopicQuestionsPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;

    const [topic, setTopic] = useState<Topic | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    const [questionModalOpen, setQuestionModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    // Fetch Topic and Questions
    useEffect(() => {
        if (!slug) return;

        async function fetchTopicAndQuestions() {
            try {
                console.log(slug);
                
                const topicRes = await fetch(`${endpoints.quiz}/topics/slug/${slug}`);
                const topicData = await topicRes.json();
                
                setTopic(topicData);

                const topicId = topicData._id

                const qRes = await fetch(`${endpoints.quiz}/topics/${topicId}/questions`);
                const qData = await qRes.json();
                setQuestions(qData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchTopicAndQuestions();
    }, [slug]);

    // CRUD Question
    async function handleDeleteQuestion(qId: string) {
        if (!confirm("Delete this question?")) return;
        await fetch(`${endpoints.quiz}/questions/${qId}`, { method: "DELETE" });
        setQuestions(prev => prev.filter(q => q._id !== qId));
    }

    if (loading) return <p className="text-center py-10">Loading…</p>;
    if (!topic) return <p className="text-center py-10 text-red-500">Topic not found.</p>;

    return (
        <main className="max-w-4xl mx-auto p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-900">Questions for: {topic.title}</h1>
                <Button className="bg-green-500" size="sm" onClick={() => { setEditingQuestion(null); setQuestionModalOpen(true); }}>+ Add Question</Button>
            </div>

            <Button
                variant="outline"
                className="mb-6"
                onClick={() => router.push("/admin")}
            >
                ← Back to Topics
            </Button>

            <QuestionList
                questions={questions}
                onEditQuestion={(q) => { setEditingQuestion(q); setQuestionModalOpen(true); }}
                onDeleteQuestion={handleDeleteQuestion}
            />

            <QuestionFormModal
                open={questionModalOpen}
                initialData={editingQuestion ?? undefined}
                onClose={() => setQuestionModalOpen(false)}
                onSave={async (data) => {
                    const method = editingQuestion ? "PUT" : "POST";
                    const url = editingQuestion
                        ? `${endpoints.quiz}/questions/${editingQuestion._id}`
                        : `${endpoints.quiz}/questions`;
                    // const body = editingQuestion ? data : { ...data, topic_id: topic._id };
                    const body = {
                        ...data,
                        topic_slug: slug,
                        ...(editingQuestion ? {} : { topic_id: topic._id })
                    }
                    console.log(body);
                    
                    const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    });
                    const saved = await res.json();
                    setQuestions(prev => editingQuestion ? prev.map(q => q._id === saved._id ? saved : q) : [...prev, saved]);
                    setQuestionModalOpen(false);
                }}
            />
        </main>
    );
}
