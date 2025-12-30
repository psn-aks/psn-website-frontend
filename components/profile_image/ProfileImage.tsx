"use client";

import Image from "next/image";
import { useState, useRef } from "react";

type Props = {
    src?: string | null;
    alt: string;
};

export default function ProfileImage({ src, alt }: Props) {
    const [open, setOpen] = useState(false);
    const [dragY, setDragY] = useState(0);

    const startY = useRef(0);
    const dragging = useRef(false);

    const imageSrc = src || "/images/avatar_placeholder.png";

    function onTouchStart(e: React.TouchEvent) {
        startY.current = e.touches[0].clientY;
        dragging.current = true;
    }

    function onTouchMove(e: React.TouchEvent) {
        if (!dragging.current) return;

        const currentY = e.touches[0].clientY;
        const delta = currentY - startY.current;

        if (delta > 0) {
            setDragY(delta);
        }
    }

    function onTouchEnd() {
        dragging.current = false;

        if (dragY > 120) {
            setOpen(false);
        }

        setDragY(0);
    }

    return (
        <>
            {/* Avatar */}
            <button
                onClick={() => setOpen(true)}
                className="relative w-50 h-50 rounded-full overflow-hidden border-4 border-blue-100 shadow-sm focus:outline-none"
            >
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
                    <div
                        className="relative max-w-3xl max-h-[90vh] transition-transform duration-200 ease-out"
                        style={{ transform: `translateY(${dragY}px)` }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Image
                            src={imageSrc}
                            alt={alt}
                            width={800}
                            height={800}
                            className="object-contain rounded-lg"
                            priority
                        />

                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-white text-2xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
