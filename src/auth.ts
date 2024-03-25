const backendUrl = process.env.BACKEND_URL
export const signIn = async ({ username, password }: { username: string, password: string }): Promise<any> => {

    const response = await fetch(`${backendUrl}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })

    });

    
    const result = await response.json();
    return result
}