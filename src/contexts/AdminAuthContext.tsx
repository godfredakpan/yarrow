import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as api from "@/lib/api";

type AdminAuthContextValue = {
  admin: api.AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const TOKEN_KEY = "womenhealth_admin_token";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<api.AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  }, []);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    try {
      const { admin: user } = await api.getMe();
      setAdmin(user);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { admin: user, token } = await api.login(email, password);
      localStorage.setItem(TOKEN_KEY, token);
      setAdmin(user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setAdmin(null);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const value: AdminAuthContextValue = {
    admin,
    loading,
    login,
    logout,
    setToken,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
