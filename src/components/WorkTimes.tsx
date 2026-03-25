import Image from "next/image"

const WorkTimes = () => {
    const workingHours = [
        { id: 1, day: "Понедельник", hours: "10:00–23:00" },
        { id: 2, day: "Вторник", hours: "10:00–23:00" },
        { id: 3, day: "Среда", hours: "10:00–23:00" },
        { id: 4, day: "Четверг", hours: "10:00–23:00" },
        { id: 5, day: "Пятница", hours: "10:00–23:00" },
        { id: 6, day: "Суббота", hours: "10:00–23:00" },
        { id: 7, day: "Воскресенье", hours: "11:00–22:00" },
    ]
    return (
        <div className="flex items-center justify-between px-16.25">
            <div className="w-138.75">
                <h2 className="font-bold text-[32px] leading-[150%] mb-9">Часы работы</h2>
                {workingHours.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b-2 border-x-none pb-1.5 mb-6">
                        <p className="text-[20px] leading-[150%]">{item.day}</p>
                        <p className={"text-[20px] leading-[150%]"}>{item.hours}</p>
                    </div>
                ))}
            </div>
            <Image src="/images/mask.svg" alt="Mask Image" width={500} height={677} />
        </div>
    )
}

export default WorkTimes
