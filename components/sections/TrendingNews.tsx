"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NewsItem {
    slug: string;
    title: string;
    author: string;
    created_at: string;
    image_url?: string;
    content?: string;
}

function NewsImage({ src, alt }: { src?: string; alt: string }) {
    const [error, setError] = useState(false);

    const validSrc =
        src && !error
            ? src.startsWith("http")
                ? src
                : `${process.env.NEXT_PUBLIC_API_URL}/${src.replace(/\\/g, "/")}`
            : "/images/logo.png"; 

    return (
        <div className="relative w-full h-48 bg-gray-100">
            <Image
                src={validSrc}
                alt={alt}
                fill
                className="object-cover rounded-t-lg"
                onError={() => setError(true)}
            />
        </div>
    );
}


export default function TrendingNews() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [isHovered, setIsHovered] = useState(false);

    // Fetch latest 3 news
    useEffect(() => {
        const fetchNews = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news`);
            const data = await res.json();
            const sorted = data.sort(
                (a: NewsItem, b: NewsItem) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setNews(sorted.slice(0, 3));
        };
        fetchNews();
    }, []);

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (!emblaApi) return;
        let interval: NodeJS.Timeout;

        if (!isHovered) {
            interval = setInterval(() => {
                if (emblaApi.canScrollNext()) emblaApi.scrollNext();
                else emblaApi.scrollTo(0);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [emblaApi, isHovered]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (news.length === 0) return null;

    return (
        <section
            className="bg-gray-50 py-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-green-700">📰 Trending News</h2>
                    <p className="text-gray-600">Stay up to date with the latest pharmacy updates.</p>
                </div>

                {/* Navigation arrows */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {news.map((item) => (
                                <Card
                                    key={item.slug}
                                    className="flex-none w-full sm:w-[80%] md:w-[45%] lg:w-[30%] shadow-md hover:shadow-lg transition"
                                >
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <NewsImage src={item.image_url} alt={item.title} />

                                        <div className="p-5 flex flex-col justify-between flex-grow">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    By {item.author} •{" "}
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                                <p className="text-gray-600 mt-3 line-clamp-3">
                                                    {item.content?.replace(/<[^>]+>/g, "") || ""}
                                                </p>
                                            </div>

                                            <Link href={`/news/${item.slug}`}>
                                                <Button className="mt-4 w-full">Read More</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Left/Right Arrows */}
                    <button
                        onClick={scrollPrev}
                        className="hidden md:flex absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-6 h-6 text-green-700" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        <ChevronRight className="w-6 h-6 text-green-700" />
                    </button>
                </div>
            </div>
        </section>
    );
}
