import { FacebookIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
    services: {
        title: "Наши услуги",
        links: [
            { label: "Цены", href: "#" },
            { label: "Отслеживание", href: "#" },
            { label: "Сообщить об ошибке", href: "#" },
            { label: "Условия услуг", href: "#" },
        ],
    },
    company: {
        title: "Наша компания",
        links: [
            { label: "Отчетность", href: "#" },
            { label: "Свяжитесь с нами", href: "#" },
            { label: "Управление", href: "#" },
        ],
    },
};

const Footer = () => {
    return (
        <footer className="relative py-10 overflow-hidden">
            <Image src="/images/footer-bg.png" alt="" fill className="object-cover select-none" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-mb" />
            <div className="relative z-10 containers grid grid-cols-4 gap-12">
                <div className="flex flex-col gap-2">
                    <div className="text-[3rem] font-black text-black tracking-tight">LOGO</div>
                    <div className="flex items-center gap-3">
                        <Link href="#" className="text-black hover:scale-110 transition-transform">
                            <TelegramIcon />
                        </Link>
                        <Link href="#" className="text-black hover:scale-110 transition-transform">
                            <WhatsappIcon />
                        </Link>
                        <Link href="#" className="text-black hover:scale-110 transition-transform">
                            <FacebookIcon />
                        </Link>
                        <Link href="#" className="text-black hover:scale-110 transition-transform">
                            <InstagramIcon />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-black text-2xl">{footerLinks.services.title}</h4>
                    <ul className="flex flex-col gap-3">
                        {footerLinks.services.links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-sm font-bold text-black/70 hover:text-black transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-black text-2xl">{footerLinks.company.title}</h4>
                    <ul className="flex flex-col gap-3">
                        {footerLinks.company.links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-sm font-bold text-black/70 hover:text-black transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-black text-2xl">Адрес</h4>
                    <div className="flex flex-col gap-3 text-sm font-bold text-black/70">
                        <p>Узбекистан, Ташкент<br />Улица, 24</p>
                        <a href="tel:+99894848844848" className="hover:text-black transition-colors">
                            +99894848844848
                        </a>
                        <a href="mailto:info@bmgsoft.com" className="hover:text-black transition-colors">
                            info@bmgsoft.com
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer