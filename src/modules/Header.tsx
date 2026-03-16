import { LanguageSelect } from '@/components'
import { MailIcon, PhoneIcon, SignIcon } from '@/icons'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="mt-3 px-32 flex items-center justify-between text-sm text-black">
            <div className="flex items-center gap-6">
                <a href="tel:+998907583838" className="flex hover:text-red-600 items-center gap-2 duration-200 transition-colors">
                    <PhoneIcon />
                    +998(90)758383833
                </a>
                <a href="mailto:info@bmgsoft.com" className="flex hover:text-red-600 items-center gap-2 duration-200 transition-colors">
                    <MailIcon />
                    info@bmgsoft.com
                </a>
            </div>
            <div className="flex items-center gap-7">
                <LanguageSelect />
                <Link href={"/login"} className="group relative bg-black text-white px-5 flex items-center gap-2 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ease-out overflow-hidden hover:scale-105 hover:shadow-lg active:scale-95">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    <SignIcon />
                    Вход в аккаунт
                </Link>
            </div>
        </div>
    )
}

export default Header