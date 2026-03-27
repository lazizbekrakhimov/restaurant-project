import { NewsItem } from "@/@types";
import { MenuButton, NewsCard } from "@/components";
import { getNews } from "@/service";

const NewsSection = async () => {
    let newsItems: NewsItem[] = [];
    try {
        const data = await getNews();
        newsItems = data.slice(0, 3).map((item: any) => ({
            id: item.id,
            image: item.image,
            text: item.text,
            author: { name: item.authorName, avatar: item.authorAvatar },
        }));
    } catch {
        newsItems = [];
    }

    return (
        <section className="py-10">
            <div className="containers">
                <h2 className="text-4xl font-black text-black text-center mb-18" style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                    Новости/Галерея
                </h2>
                <div className="grid grid-cols-3 gap-30 items-start">
                    {newsItems.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex justify-end mt-15">
                    <MenuButton href="/news" title="Посмотреть все" />
                </div>
            </div>
        </section>
    );
};

export default NewsSection;