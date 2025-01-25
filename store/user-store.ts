import { UserDto } from "@/lib/types";
import { create } from "zustand";

interface store {
    user: UserDto,
    setUser: (data: UserDto) => void
}

export const UserStore = create<store>((set) => ({
    user: {
        id: '',
        fullName: '',
        userName: '',
        email: '',
        emailVerified: true,
        role: '',
        status: 'ENABLED',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    setUser: (data: UserDto) => {
        set({ user: data })
    },
}))