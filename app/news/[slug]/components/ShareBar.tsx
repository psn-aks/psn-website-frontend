"use client";

import { Share2 } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { WEB_DOMAIN_URL } from "@/app/config/base";

export default function ShareBar({
    title,
    slug,
}: {
    title: string;
    slug: string;
}) {
    const shareUrl = `${WEB_DOMAIN_URL}/news/${slug}`;

    return (
        <div className="flex items-center gap-4 mb-12">
            <Share2 size={18} className="text-blue-600" />
            <span className="text-sm text-gray-700">Share this article:</span>

            <div className="flex gap-3">
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                    )}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                >
                    <FaXTwitter size={20} />
                </a>

                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                    )}`}
                    target="_blank"
                >
                    <FaLinkedinIn size={20} />
                </a>

                <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                        title + " " + shareUrl
                    )}`}
                    target="_blank"
                >
                    <FaWhatsapp size={20} />
                </a>
            </div>
        </div>
    );
}
