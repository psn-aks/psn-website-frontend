"use client";

import Modal from "@/components/ui/Modal";
import TopicForm from "./TopicForm";
import { Topic } from "@/types/quiz";

type Props = {
    open: boolean;
    initialData?: Topic;
    onSave: (data: { title: string; description?: string }) => void;
    onClose: () => void;
};

export default function TopicFormModal({ open, initialData, onSave, onClose }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <TopicForm initialData={initialData} onSave={onSave} />
        </Modal>
    );
}
