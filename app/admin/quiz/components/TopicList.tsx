"use client";

import { Topic } from "@/types/quiz";
import { Button } from "@/components/ui/button";

type Props = {
    topics: Topic[];
    selectedTopic: Topic | null;
    onSelectTopic: (topic: Topic) => void;
    onEditTopic: (topic: Topic) => void;
    onDeleteTopic: (topicId: string) => void;
};

export default function TopicList({ topics, selectedTopic, onSelectTopic, onEditTopic, onDeleteTopic }: Props) {
    return (
        <div className="rounded shadow-lg">

            {topics.map((t) => (
                <div
                    key={t._id}
                    className={`p-3 mb-2 border bg-gray-100 hover:bg-green-50 cursor-pointer flex justify-between items-center `}
                    onClick={() => onSelectTopic(t)}
                >
                    <span>{t.title}</span>
                    <div className="flex gap-2 pr-3">
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onEditTopic(t); }}>Edit</Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500"
                            onClick={(e) => { e.stopPropagation(); onDeleteTopic(t._id); }}
                        >
                            Del
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
