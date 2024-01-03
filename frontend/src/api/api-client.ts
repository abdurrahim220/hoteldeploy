
import { HotelType } from "../config/hotel-options-config";
import { SignInFormData } from "../pages/Login/Login";
import { RegisterFormData } from "../pages/Register/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// const API_BASE_URL = `http://localhost:5000/api`

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }

}


export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }
    return response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json()
}
export const fetchMyHotel = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json()
}

