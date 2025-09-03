"use client";
import { useSearchParams } from "next/navigation";
import LoginPage from '@/components/pcLoginPage';
import { Suspense } from "react";

// Loading component
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading login page...</p>
      </div>
    </div>
  );
}

// Create a component that uses useSearchParams
function LoginContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  if (url) {
    return <LoginPage token={url} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Login Page</h1>
          <p className="text-gray-600 dark:text-gray-300">Please provide a valid URL parameter to login</p>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Login() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}