'use server'

import { cookies } from 'next/headers'
import { Base64 } from 'js-base64'
import { redirect } from 'next/navigation'

export async function handleLoginAction(sessionData: any) {
    const session = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    }
    const encryptedSessionData = Base64.encode(JSON.stringify(sessionData)) // Encrypt your session data
    cookies().set('currentUser', sessionData, session)
    cookies().set('session', encryptedSessionData, session)

    redirect('/home')
}

export async function signOut() {
    cookies().delete('currentUser')
    cookies().delete('session')
    redirect('/login')
}