import SubmitButton from "./SubminButton";

const inputClass = "w-full backdrop-blur-sm outline-none px-5 py-4 text-[18px] text-black placeholder:text-black/40 placeholder:text-[18px] outline-none focus:border-black/40 transition-colors";

const WriteToUs = ({ title = "Написать нам" }: { title?: string }) => {
    return (
        <div>
            <h2 className="text-center font-black text-black p-12" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {title}
            </h2>

            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Ваше имя" className={inputClass} />
                <input type="email" placeholder="Ваш E-mail" className={inputClass} />
                <input type="tel" placeholder="Ваш номер телефона" className={inputClass} />
                <textarea placeholder="Ваше сообщение" rows={4} className={`${inputClass} resize-none`} />
                <div className="flex justify-end mt-2">
                    <SubmitButton extraClass="!px-10 !py-4 item-end!">Отправить</SubmitButton>
                </div>
            </div>
        </div>
    );
};

export default WriteToUs;