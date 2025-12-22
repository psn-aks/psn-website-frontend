import Link from "next/link";

export default function NewsNotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">
                    Article Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    This news article may have been removed or does not exist.
                </p>
                <Link
                    href="/news"
                    className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
                >
                    Back to News
                </Link>
            </div>
        </main>
    );
}
