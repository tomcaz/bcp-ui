'use server'

import { signIn } from '@/auth'

export async function authenticate(formData: { username: string, password: string }) {
    try {
        return await signIn(formData)
    } catch (error) {
        throw error
    }
}