import Link from "next/link";
import { ReactNode } from "react";

interface SubmitButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
    href?: string;
}

const SubmitButton = ({ children, className = "", onClick, type = "submit", href }: SubmitButtonProps) => {
    const baseClass = `relative bg-black text-white px-3! py-4 rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 active:scale-95 group cursor-pointer ${className}`;
    const inner = (
        <>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">{children}</span>
        </>
    );
    if (href) {
        return <Link href={href} className={baseClass}>{inner}</Link>;
    }
    return (
        <button type={type} onClick={onClick} className={baseClass}>
            {inner}
        </button>
    );
};

export default SubmitButton;