import { AuthResponse, Category, ContactInput, MenuItem, NewsItem, RegisterInput, ReservationInput } from "@/@types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options?.headers },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(
            error.message || "Request failed"
        );
    }

    return res.json();
}

export const getMenu = (categoryId?: number) => apiFetch<MenuItem[]>(`/menu${categoryId ? `?categoryId=${categoryId}` : ""}`);
export const getCategories = () => apiFetch<Category[]>("/categories");
export const getNews = () => apiFetch<NewsItem[]>("/news");

export const createReservation = (data: ReservationInput) => apiFetch<{ success: boolean }>("/reservations", { method: "POST", body: JSON.stringify(data) });
export const createContact = (data: ContactInput) => apiFetch<{ success: boolean }>("/contacts", { method: "POST", body: JSON.stringify(data) });

export const login = (email: string, password: string) => apiFetch<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (data: RegisterInput) => apiFetch<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const logout = () => apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });

export const getMe = () => apiFetch<AuthResponse>("/auth/me");

export const getMenuById = (id: number | string) => apiFetch<MenuItem>(`/menu/${id}`);
export const createMenuItem = (data: any) => apiFetch<MenuItem>("/menu", { method: "POST", body: JSON.stringify(data) });
export const deleteMenuItem = (id: number) => apiFetch(`/menu/${id}`, { method: "DELETE" });

export const createCategory = (data: { name: string; nameRu?: string }) => apiFetch<Category>("/categories", { method: "POST", body: JSON.stringify(data) });
export const deleteCategory = (id: number) => apiFetch(`/categories/${id}`, { method: "DELETE" });

export const createNews = (data: any) => apiFetch<NewsItem>("/news", { method: "POST", body: JSON.stringify(data) });
export const deleteNews = (id: number) => apiFetch(`/news/${id}`, { method: "DELETE" });

export const getUsers = () => apiFetch<any[]>("/users");
export const deleteUser = (id: number) => apiFetch(`/users/${id}`, { method: "DELETE" });

export const getReservations = () => apiFetch<any[]>("/reservations");
export const updateReservation = (id: number, data: { status: string }) => apiFetch(`/reservations/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const getContacts = () => apiFetch<any[]>("/contacts");
export const markContactRead = (id: number) => apiFetch(`/contacts/${id}/read`, { method: "PATCH" });

export const getGallery = () => apiFetch<any[]>('/gallery');
export const createGallery = (data: { image: string; title?: string }) => apiFetch('/gallery', { method: 'POST', body: JSON.stringify(data) });
export const deleteGallery = (id: number) => apiFetch(`/gallery/${id}`, { method: 'DELETE' });

export const uploadImage = async (file: File, folder: 'products' | 'news' | 'galleries' | 'avatars') => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/${folder}`, { method: 'POST', credentials: 'include', body: formData, });
    if (!res.ok) throw new Error('Upload failed');
    return res.json() as Promise<{ url: string }>;
};