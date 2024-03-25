import { cookies } from 'next/headers'
import { Base64 } from "js-base64";

export async function getSessionData(req: any) {
  const encryptedSessionData = cookies().get('session')?.value
  return encryptedSessionData ? JSON.parse(Base64.decode(encryptedSessionData)) : null
}

export default function Home() {
  // const accessDenied = true
  // if (accessDenied) {
  //   redirect('/login')
  // }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
