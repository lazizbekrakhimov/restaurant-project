import { Contact, CustomBooking, HeroHeader, Leaf, WherePath, WorkTimes } from '@/components'

const BookingHero = () => {
    return (
        <div className="relative z-10 flex flex-col pt-5">
            <Leaf style={{ top: "220px", right: "20px", width: "230px", height: "230px", transform: "rotate(185deg)" }} />
            <Leaf style={{ top: "33%", left: "-20px", width: "230px", height: "230px", transform: "rotate(10deg)" }} />
            <Leaf style={{ bottom: "120px", right: "20px", width: "200px", height: "200px", transform: "rotate(-170deg)" }} />
            <Leaf style={{ bottom: "80px", left: "-20px", width: "220px", height: "220px", transform: "rotate(10deg)" }} />
            <div className="containers relative w-full">
                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }} >
                    <HeroHeader />
                    <div className="px-12 pt-6 pb-24">
                        <WherePath pageName="Бронирование" pageHref="/booking" title="Бронирование" />
                    </div>
                    <WorkTimes />
                    <CustomBooking title='Хотите забронировать стол?' exTitleClass='text-center' exBtnClass='ml-[85%]' />
                    <Contact title='Связаться с нами' extraClass="!py-16"/>
                </div>
            </div>
        </div>
    )
}

export default BookingHero
