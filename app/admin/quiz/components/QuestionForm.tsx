"use client";

import { useEffect, useState } from "react";

type QuestionFormProps = {
    onSave: (data: { question: string; options: string[]; correct_index: number }) => void;
    initialData?: {
        question: string;
        options: string[];
        correct_index: number;
    };
};

export default function QuestionForm({ onSave, initialData }: QuestionFormProps) {
    const [question, setQuestion] = useState(initialData?.question || "");
    const [options, setOptions] = useState<string[]>(initialData?.options || ["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(initialData?.correct_index || 0);

    function handleOptionChange(idx: number, value: string) {
        const newOptions = [...options];
        newOptions[idx] = value;
        setOptions(newOptions);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!question.trim()) return alert("Question is required");
        if (options.some((o) => !o.trim())) return alert("All options are required");
        onSave({ question, options, correct_index: correctIndex });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Question</label>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            {options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="correctOption"
                        checked={correctIndex === idx}
                        onChange={() => setCorrectIndex(idx)}
                    />
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
            ))}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
