import Image from "next/image";
import MenuButton from "./MenuButton";

const AboutBlock = ({ title, text1, text2, image, reverse = false, showBtn = false }: {
    title: string; text1: string; text2: string;
    image: string; reverse?: boolean; showBtn?: boolean;
}) => (
    <div className={`flex items-center gap-18 my-25 px-5 ${reverse ? "flex-row-reverse" : "pb-15"}`}>
        <div className="max-w-141 h-105 flex-1 gap-16">
            <h2 className="font-black text-black mb-10" style={{ fontSize: "36px", fontWeight: 900 }}>
                {title}
            </h2>
            <p className="text-black text-[18px] leading-[160%] mb-6">{text1}</p>
            <p className="text-black text-[18px] leading-[160%] mb-12.25">{text2}</p>
            {showBtn && <MenuButton title={"Посмотреть меню"} href="/menu" />}
        </div>
        <div className="relative w-[503.29px] h-169 rounded-4xl overflow-hidden shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
        </div>
    </div>
);

export default AboutBlock;
