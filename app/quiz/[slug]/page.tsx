"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { endpoints } from "@/lib/serverApi";
import { Button } from "@/components/ui/button";

interface Question {
    _id: string;
    question: string;
    options: string[];
    correct_index: number;
}

export default function QuizPage() {
    const { slug } = useParams();
    
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch(`${endpoints.quiz}/topics/slug/${slug}/questions`);
            const data = await res.json();
            setQuestions(data);
            setLoading(false);
        }
        fetchQuestions();
    }, [slug]);

    if (loading) return <p className="text-center py-10">Loading quiz…</p>;
    if (!questions.length) return <p className="text-center py-10">No questions found.</p>;

    const q = questions[current];


    function handleNext() {
        
        if (selected === q.correct_index) {
            setScore((s) => s + 1);
        }

        if (current + 1 === questions.length) {
            router.push(`/quiz/result?score=${score + (selected === q.correct_index ? 1 : 0)}&total=${questions.length}`);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
        }
    }

    return (
        <main className="max-w-3xl mx-auto py-20 px-4">
            <div className="bg-white shadow rounded-2xl p-8">
                <p className="text-sm text-gray-500 mb-4">
                    Question {current + 1} of {questions.length}
                </p>

                <h2 className="text-2xl font-semibold mb-6">{q.question}</h2>

                <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelected(idx)}
                            className={`w-full text-left p-4 rounded-lg border transition
                ${selected === idx ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}
              `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <Button
                    className="mt-8 w-full"
                    disabled={selected === null}
                    onClick={handleNext}
                >
                    {current + 1 === questions.length ? "Finish Quiz" : "Next"}
                </Button>
            </div>
        </main>
    );
}
