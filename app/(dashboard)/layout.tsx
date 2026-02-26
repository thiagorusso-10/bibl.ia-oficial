import { Navbar } from "@/components/ui/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Navigation */}
            <Navbar />

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
}
