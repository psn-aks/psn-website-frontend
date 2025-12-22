"use client";

import { Question } from "@/types/quiz";

import { Button } from "@/components/ui/button";

type Props = {
    questions: Question[];
    onEditQuestion: (q: Question) => void;
    onDeleteQuestion: (qId: string) => void;
};

export default function QuestionList({ questions, onEditQuestion, onDeleteQuestion }: Props) {
    if (questions.length === 0) return <p>No questions yet.</p>;

    return (
        <div>
            {questions.map((q) => (
                <div key={q._id} className="p-3 border rounded mb-2">
                    <p className="font-medium">{q.question}</p>
                    <ul className="list-disc list-inside mb-2">
                        {q.options.map((o, idx) => (
                            <li key={idx} className={idx === q.correct_index ? "font-bold text-green-600" : ""}>
                                {o}
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEditQuestion(q)}>Edit</Button>
                        <Button className="bg-red-500" variant="destructive" size="sm" onClick={() => onDeleteQuestion(q._id)}>Del</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
