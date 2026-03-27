import Image from "next/image";

const TeamCard = ({ name, position, image }: { name: string; position: string; image: string }) => (
    <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative w-58.25 h-58.25 rounded-full overflow-hidden shadow-lg group transition-transform duration-300 ease-in-out hover:scale-105">
            <Image 
                src={image} 
                alt={name} 
                fill 
                className="object-cover" 
            />
        </div>
        <div>
            <p className="font-bold text-black text-[20px] leading-[150%]">{name}</p>
            <p className="text-[#464646] font-bold mt-0.5 text-[16px] leading-[150%]">{position}</p>
        </div>
    </div>
);

export default TeamCard;
