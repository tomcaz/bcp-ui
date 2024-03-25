'use server'
import { ColorType, LaneType, OrderStatus, OrderType, PaintType, UserType } from "@/app/common";

const backendUrl = process.env.BACKEND_URL

export const updateUser = async ({ username, role }: { username: string, role: string }): Promise<any> => {
    // call backend to create an order
    const response = await fetch(`${backendUrl}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role })

    });
    const result = await response.json();
    return result
}

export const addUserBackend = async ({ username, password, role }: { username: string, password: string, role: string }): Promise<void> => {
    // call backend to create an order
    const response = await fetch(`${backendUrl}/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role, password })

    });
    await response.json();
}

export const updateStatusBackend = async (username: string): Promise<void> => {
    // call backend to create an order
    const response = await fetch(`${backendUrl}/user/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })

    });
    await response.json();
}

export const getUsers = async (): Promise<UserType[]> => {
    // call backend to create an order
    const response = await fetch(`${backendUrl}/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }

    });
    const result = await response.json();
    return result
}
