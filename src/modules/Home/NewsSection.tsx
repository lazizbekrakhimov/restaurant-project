import { NewsItem } from "@/@types";
import { MenuButton, NewsCard } from "@/components";

const newsItems: NewsItem[] = [
    {
        id: 1,
        image: "/images/news1.svg",
        text: "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.",
        author: { name: "Сергей", avatar: "/images/avatar1.svg" },
    },
    {
        id: 2,
        image: "/images/news2.svg",
        text: "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.",
        author: { name: "Сергей", avatar: "/images/avatar1.svg" },
    },
    {
        id: 3,
        image: "/images/news3.svg",
        text: "Используйте гибкие структуры, чтобы предоставить надежный обзор для обзоров высокого уровня. Итеративные подходы к данным корпоративной.",
        author: { name: "Сергей", avatar: "/images/avatar1.svg" },
    },
];

const NewsSection = () => {
    return (
        <section className="py-20">
            <div className="containers">
                <h2 className="text-4xl font-black text-black text-center mb-16">
                    Новости/Галерея
                </h2>
                <div className="grid grid-cols-3 gap-30 items-start">
                    {newsItems.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex justify-end mt-15">
                    <MenuButton title="Посмотреть все" />
                </div>
            </div>
        </section>
    );
}

export default NewsSection;