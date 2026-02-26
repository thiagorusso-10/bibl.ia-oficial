import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="neo-border neo-shadow bg-white p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
                <SignUp
                    appearance={{
                        elements: {
                            card: "shadow-none border-0 bg-transparent",
                            formButtonPrimary:
                                "bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-none",
                            formFieldInput:
                                "border-2 border-black rounded-none focus:ring-0 focus:border-black",
                            footerActionLink: "text-black font-bold underline",
                        },
                    }}
                />
            </div>
        </div>
    );
}
