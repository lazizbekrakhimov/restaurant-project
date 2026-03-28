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

export interface GalleryItem {
    id: number;
    image: string;
}

export type User = {
    id: number;
    email: string;
    role: "SUPERADMIN" | "USER";
    name?: string;
    phone?: string;
};

export type AuthResponse = {
    role: string;
    user: User;
};

export type MenuItem = {
    id: number;
    title: string;
    description?: string;
    price: number;
    image?: string;
    categoryId: number;
};

export type Category = {
    id: number;
    name: string;
};

export type ReservationInput = {
    email: string;
    guests: number;
    date: string;
    time: string;
    location: string;
};

export type ContactInput = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
    phone?: string;
};

