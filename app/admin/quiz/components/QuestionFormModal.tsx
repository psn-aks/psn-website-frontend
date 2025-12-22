"use client";

import Modal from "@/components/ui/Modal";
import QuestionForm from "./QuestionForm";
import { Question } from "@/types/quiz";

type Props = {
    open: boolean;
    initialData?: Question;
    onSave: (data: { question: string; options: string[]; correct_index: number }) => void;
    onClose: () => void;
};

export default function QuestionFormModal({ open, initialData, onSave, onClose }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <QuestionForm initialData={initialData} onSave={onSave} />
        </Modal>
    );
}
