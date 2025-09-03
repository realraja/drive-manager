"use client"; // if using Next.js 13+ app directory

import { useSearchParams } from "next/navigation";
import LoginPage from '@/components/pcLoginPage'

export default function Login() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url"); // get the ?url=value

  if(url){
    return LoginPage(url);
  }

  return (
    <div className="text-white text-wrap w-screen">
      Login Page
    </div>
  );
}
