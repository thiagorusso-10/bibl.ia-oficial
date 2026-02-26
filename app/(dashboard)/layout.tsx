import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Navigation */}
            <Navbar />

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
}
