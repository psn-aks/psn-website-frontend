"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function QuizResultComponent() {
    const params = useSearchParams();
    const router = useRouter();

    const score = Number(params.get("score"));
    const total = Number(params.get("total"));

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">
                    Quiz Completed 🎉
                </h1>

                <p className="text-xl mb-6">
                    You scored <span className="font-bold">{score}</span> out of{" "}
                    <span className="font-bold">{total}</span>
                </p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => router.push("/quiz")}>Take Another Quiz</Button>
                    <Button variant="outline" onClick={() => router.push("/")}>Go Home</Button>
                </div>
            </div>
        </main>
    );
}
