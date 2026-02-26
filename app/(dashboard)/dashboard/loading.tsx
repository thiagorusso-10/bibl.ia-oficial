import { Skeleton } from "@/components/ui/skeleton";
import { NeoCard } from "@/components/ui/neo-card";

export default function DashboardLoading() {
    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-3/4 max-w-sm" />
                <Skeleton className="h-4 w-1/2 max-w-lg" />
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <NeoCard key={i} className="py-4 flex flex-col items-center gap-2">
                        <Skeleton className="h-8 w-12" />
                        <Skeleton className="h-3 w-24" />
                    </NeoCard>
                ))}
            </div>

            {/* Ebooks Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-9 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="neo-border bg-white overflow-hidden">
                            <Skeleton className="w-full aspect-[3/4]" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-3 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
