import { Skeleton } from "@/components/ui/skeleton";

export default function LearnLoading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <Skeleton className="h-4 w-full max-w-2xl" />
            </div>

            {/* Ebooks List */}
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="neo-border bg-white overflow-hidden flex flex-col md:flex-row">
                        {/* Cover Skeleton */}
                        <Skeleton className="w-full md:w-64 aspect-[3/4] md:aspect-auto md:min-h-[320px] shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-black" />

                        {/* Content Skeleton */}
                        <div className="flex-1 p-6 flex flex-col gap-4">
                            <Skeleton className="h-6 w-24" /> {/* Badge */}
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-3/4" /> {/* Title */}
                                <Skeleton className="h-4 w-1/2" /> {/* Subtitle */}
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                            </div>

                            <div className="mt-auto flex gap-3">
                                <Skeleton className="h-10 flex-1" />
                                <Skeleton className="h-10 flex-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
