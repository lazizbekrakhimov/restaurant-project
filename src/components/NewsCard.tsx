import { NewsItem } from "@/@types";
import Image from "next/image";

export default function NewsCard({ item }: { item: NewsItem }) {
    return ( 
        <div className="relative flex flex-col transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-57.75 h-39.25 ml-4 rounded-[2.5rem] overflow-hidden z-10 -mb-16">
                <Image src={item.image} alt={item.author.name} fill className="object-cover" />
            </div>
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl px-6 pb-6 pt-20 shadow-md">
                <p className="text-sm text-black leading-relaxed mb-5">
                    {item.text}
                </p>
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                        <Image src={item.author.avatar} alt={item.author.name} fill className="object-cover" />
                    </div>
                    <span className="font-semibold text-black text-sm">
                        {item.author.name}
                    </span>
                </div>
            </div>
        </div>
    );
}