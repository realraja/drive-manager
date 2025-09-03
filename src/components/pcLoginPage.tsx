// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FiLock, FiEye, FiEyeOff, FiLogIn, FiShield } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PCURL, SaveLocalStorage } from '@/utils/localstorage';
import { useAuth } from '@/context/AuthContext';
import { getDecodedToken } from '@/utils/decodeToken';
import { checkApi } from '@/utils/checkApi';
import { data } from 'framer-motion/m';





export default function LoginPage({ token }: { token: any }) {

  const { setIsAuthenticated, setTotalDrives, setIsPcDrive, setPcUrl } = useAuth();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [decodedToken, setdecodedToken] = useState<any>({});
  const router = useRouter();


  // console.log(decodedToken);



  useEffect(() => {




    const checkIsWorking = async () => {
      try {
        const decoded: any = getDecodedToken(token);
        if (!decoded) return router.push('/');
        setdecodedToken(decoded);
        await navigator.clipboard.writeText(decoded.url);
        const res = await checkApi(decoded.url);
        console.log('getting by fetch==>', res);
        if (!res?.working) return router.push('/');
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        return router.push('/');
      }

    }

    checkIsWorking()
  }, [token])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    setIsLoading(true);
    setError('');

    // Simulate authentication
    try {
      // Replace with actual authentication logic
      console.log(decodedToken.url)
      const { data } = await axios.post(`${decodedToken.url}auth/pc-file-login`, { password, token }, { withCredentials: true });
      SaveLocalStorage(PCURL, decodedToken.url);
      setPcUrl(decodedToken.url);
      setIsAuthenticated(true);
      setIsPcDrive(true);
      setTotalDrives(data.drives);
      // router.push('/');
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <title>Secure Login | Access Your Account</title>
        <meta name="description" content="Secure password login page" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiShield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400">Enter your password to access your PC Files.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg flex items-center gap-2">
                  <FiShield className="flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FiLogIn className="mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Secure Access. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}