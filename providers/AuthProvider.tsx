"use client";
import LottieIframe from "@/components/common/LottieIframe";
import { useAuthCheck } from "@/hooks/useAuthCheck";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { initialized } = useAuthCheck();

    if (!initialized) {
        return (
            <div className="h-[100vh] flex flex-col items-center justify-center text-center">
                <LottieIframe/>
                <p className="tex-white">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
};