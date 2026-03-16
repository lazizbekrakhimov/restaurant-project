import Header from "@/modules/Header";
import Footer from "@/modules/Footer";
import Image from "next/image";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            <Image src="/images/bbgg.png" alt="" fill className="object-cover" priority />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}