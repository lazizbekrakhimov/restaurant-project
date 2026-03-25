import { CallIcon, EmailIcon, MapIcon } from "@/icons"

const contactTypes = [
    { id: 1, icon: EmailIcon, title: "Напишите нам", firstLink: "info@bmgsoft.com", secondLink: "t.me/bmgsoft.com" },
    { id: 2, icon: CallIcon, title: "Позвоните нам", firstLink: "+9998908767888", secondLink: "+9989865332322" },
    { id: 3, icon: MapIcon, title: "Посетите нас", firstLink: "Узбекистан, Ташкент", secondLink: "Улица, 24" },
]

const Contact = ({ title, extraClass }: { title?: string, extraClass?: string }) => {
    return (
        <div className={`containers ${extraClass}`}>
            <h1 className="text-[48px] leading-[150%] font-bold text-center mb-16" style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {title}
            </h1>
            <div className="flex items-center justify-center gap-38.75">
                {contactTypes.map(({ id, icon: Icon, title, firstLink, secondLink }) => (
                    <div key={id} className="flex flex-col items-center gap-6 text-center">
                        <Icon />
                        <div>
                            <h2 className="text-[22px] font-bold leading-[150%] pb-2">{title}</h2>
                            <div className="flex flex-col gap-1">
                                <a href="#" className="text-[14px] leading-[160%] text-gray-900 hover:text-red-600 duration-200 transform transition-colors">{firstLink}</a>
                                <a href="#" className="text-[14px] leading-[160%] text-gray-900 hover:text-red-600 duration-200 transform transition-colors">{secondLink}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contact