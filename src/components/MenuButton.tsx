import Link from "next/link";

interface MenuButtonProps {
    title: string;
    href?: string;
}

const MenuButton = ({ title, href = "#" }: MenuButtonProps) => {
    return (
        <Link href={href} className=" relative inline-flex items-center gap-4 bg-black text-white px-8 py-5 rounded-t-2xl rounded-bl-2xl font-bold text-lg overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/30 active:scale-95 group " >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            {title}
            <span className="transition-transform duration-300 group-hover:translate-x-2 text-xl">→</span>
        </Link>
    );
};

export default MenuButton;