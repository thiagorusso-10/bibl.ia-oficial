import { Skeleton } from "@/components/ui/skeleton";

export default function KidsLoading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <Skeleton className="h-4 w-full max-w-xl" />
            </div>

            {/* Tabs */}
            <div className="flex gap-0">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
            </div>

            {/* Filters (Activities only) */}
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="neo-border bg-white overflow-hidden flex flex-col">
                        <Skeleton className="w-full aspect-[4/3] border-b-2 border-black" />
                        <div className="p-5 flex flex-col gap-3">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <div className="mt-4 flex gap-2">
                                <Skeleton className="h-8 flex-1" />
                                <Skeleton className="h-8 flex-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
