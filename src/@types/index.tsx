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

export interface RegisterForm {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreed: boolean;
}