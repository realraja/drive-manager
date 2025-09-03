"use client";
import { GetLocalStorage, PCURL, SaveLocalStorage } from "@/utils/localstorage";
import axios from "axios";
import React, {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
} from "react";

// 1. Define types
interface AuthContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    isPcDrive: boolean;
    setIsPcDrive: Dispatch<SetStateAction<boolean>>;
    totalDrives: string[];
    setTotalDrives: Dispatch<SetStateAction<string[]>>;
    pcUrl: any;
    setPcUrl: Dispatch<SetStateAction<any>>;
}

// 2. Create context with default value as undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider component
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isPcDrive, setIsPcDrive] = useState(false);
    const [totalDrives, setTotalDrives] = useState<string[]>([]); // ✅ FIXED
    const [pcUrl, setPcUrl] = useState('')


    useEffect(() => {
        const url: any = GetLocalStorage(PCURL);
        setPcUrl(url);


        const checkIsWorking = async () => {
            try {
                const { data } = await axios.get(url);
                console.log(data)
                if (data?.working) {
                    const { data } = await axios.get(`${url}auth/pc-check-user`, { withCredentials: true });
                    console.log(data)
                    setIsAuthenticated(data?.isUser);
                    setIsPcDrive(true);
                    setTotalDrives(data?.drives);
                } else {
                    SaveLocalStorage(PCURL, '');
                    setIsAuthenticated(false);
                    setIsPcDrive(false);
                    setTotalDrives([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        checkIsWorking()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                setIsLoading,
                isAuthenticated,
                setIsAuthenticated,
                isPcDrive,
                setIsPcDrive,
                totalDrives,
                setTotalDrives,
                pcUrl,
                setPcUrl,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// 4. Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
