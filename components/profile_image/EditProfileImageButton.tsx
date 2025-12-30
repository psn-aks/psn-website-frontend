"use client";

import { useRef, useState } from "react";
import { endpoints } from "@/lib/serverApi";

type Props = {
    licenseNumber: string;
};

export default function EditProfileImageButton({ licenseNumber }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    async function editImage(file: File) {
        if (loading) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("profile_picture", file);

            const res = await fetch(
                `${endpoints.pharmacists}/${licenseNumber}/profile-picture`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            // Refresh page to show updated image
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Failed to upload image");
            setLoading(false);
        }
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        editImage(file);
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
                disabled={loading}
            />

            <button
                type="button"
                disabled={loading}
                onClick={() => inputRef.current?.click()}
                className={`
                    mt-4 px-4 py-2 rounded text-white transition
                    ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-700"}
                `}
            >
                {loading ? "Uploading..." : "Edit Image"}
            </button>
        </>
    );
}
