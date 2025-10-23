export default function ArticleSkeleton() {
    return (
        <div className="max-w-3xl mx-auto animate-pulse space-y-6 py-10">
            <div className="h-6 bg-gray-300 rounded w-1/3" />
            <div className="h-10 bg-gray-300 rounded w-2/3" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
        </div>
    );
}
