"use client";

import { useEffect, useState } from "react";
import { GalleryCard, HeroHeader, Leaf, NewsCard, Pagination, WherePath } from "@/components";
import { GalleryItem, NewsItem } from "@/@types";
import { getGallery, getNews } from "@/service";

const NEWS_PER_PAGE = 6;
const GALLERY_PER_PAGE = 8;

const NewsPage = () => {
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [allGallery, setAllGallery] = useState<GalleryItem[]>([]);
    const [newsPage, setNewsPage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(1);

    useEffect(() => {
        getNews()
            .then((data) => {
                setAllNews(data.map((item: any) => ({
                    id: item.id,
                    image: item.image || '/images/news1.svg',
                    text: item.text,
                    author: {
                        name: item.authorName,
                        avatar: item.authorAvatar || '/images/avatar1.svg',
                    },
                })));
            })
            .catch(() => setAllNews([]));

        getGallery()
            .then((data) => {
                setAllGallery(data.map((item: any) => ({
                    id: item.id,
                    image: item.image || '/images/news1.svg',
                })));
            })
            .catch(() => setAllGallery([]));
    }, []);

    const totalNewsPages = Math.max(1, Math.ceil(allNews.length / NEWS_PER_PAGE));
    const totalGalleryPages = Math.max(1, Math.ceil(allGallery.length / GALLERY_PER_PAGE));
    const currentNews = allNews.slice((newsPage - 1) * NEWS_PER_PAGE, newsPage * NEWS_PER_PAGE);
    const currentGallery = allGallery.slice((galleryPage - 1) * GALLERY_PER_PAGE, galleryPage * GALLERY_PER_PAGE);

    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <Leaf style={{ top: "220px", right: "-100px", width: "230px", height: "230px", transform: "rotate(185deg)" }} />
                <Leaf style={{ top: "33%", left: "-180px", width: "230px", height: "230px", transform: "rotate(10deg)" }} />
                <Leaf style={{ bottom: "120px", right: "-110px", width: "200px", height: "200px", transform: "rotate(-170deg)" }} />
                <Leaf style={{ bottom: "80px", left: "-150px", width: "220px", height: "220px", transform: "rotate(10deg)" }} />

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="px-12 pt-6 pb-24">
                        <WherePath pageName="Новости" pageHref="/news" title="Новости" />

                        <div className="grid grid-cols-3 gap-x-8 gap-y-24 mt-16">
                            {currentNews.map((item) => (<NewsCard key={item.id} item={item} />))}
                        </div>

                        {allNews.length > NEWS_PER_PAGE && (
                            <Pagination current={newsPage} total={totalNewsPages} onChange={setNewsPage} />
                        )}

                        <h2 className="text-center font-black text-black my-24" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                            Галерея
                        </h2>

                        {currentGallery.length > 0 ? (
                            <div className="grid grid-cols-4 gap-7 gap-y-12">
                                {currentGallery.map((item) => (<GalleryCard key={item.id} item={item} />))}
                            </div>
                        ) : (
                            <p className="text-center text-black/30 py-16">Галерея пуста</p>
                        )}

                        {allGallery.length > GALLERY_PER_PAGE && (
                            <Pagination current={galleryPage} total={totalGalleryPages} onChange={setGalleryPage} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;