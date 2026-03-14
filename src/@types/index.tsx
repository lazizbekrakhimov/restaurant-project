export interface Meal {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface NewsItem {
    id: number;
    image: string;
    text: string;
    author: {
        name: string;
        avatar: string;
    };
}