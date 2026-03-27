import Link from "next/link";

interface WherePathProps {
    pageName: string;
    pageHref: string;
    title?: string;
}

const WherePath = ({ pageName, pageHref, title }: WherePathProps) => {
    return (
        <div className="pb-10">
            <p className="text-[16px] text-black/50 font-medium mb-10 tracking-wide">
                <Link href="/" className="hover:text-red-600 transition-colors duration-200">
                    Главная
                </Link>
                <span className="mx-2 text-black/40">›</span>
                <Link href={pageHref} className="text-black/80 hover:text-black transition-colors duration-200">
                    {pageName}
                </Link>
            </p>
            {title && (
                <h1 className="text-center font-black text-black mb-10" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {title}
                </h1>
            )}
        </div>
    );
};

export default WherePath;