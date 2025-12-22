"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual result component
const QuizResultComponent = dynamic(() => import("./QuizResultComponent"), { ssr: false });

export default function QuizResultPage() {
    return <QuizResultComponent />;
}
