import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore, UserStore } from "@/store";
import { useGetUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { publicRoutes } from "@/lib/constants";

export const useAuthCheck = () => {
    const { setAuth, isAuthenticated } = useAuthStore();
    const { setUser } = UserStore();
    const getUserMutation = useGetUser();
    const router = useRouter();
    const pathname = usePathname();
    const [initialized, setInitialized] = useState(false);

    const redirectToLogin = useCallback(() => {
        if (!publicRoutes.includes(pathname)) {
            // router.push('/login');
            router.push('/stock');
        }
    }, [pathname, router]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const { data } = await getUserMutation.refetch();
                if (data.success) {
                    setUser(data.data);
                    setAuth({ isAuthenticated: true });
                } else {
                    setAuth({ isAuthenticated: false });
                    redirectToLogin();
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setAuth({ isAuthenticated: false });
                toast.error("Failed to verify session. Please log in again.");
                redirectToLogin();
            } finally {
                setInitialized(true);
            }
        };

        if (!initialized && !isAuthenticated) {
            checkAuthentication();
        }
    }, [initialized, isAuthenticated, getUserMutation, redirectToLogin]);

    return { initialized, isAuthenticated };
};