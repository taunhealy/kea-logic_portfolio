import React, { createContext, useContext, useEffect, useState } from "react";
import { validateRequest } from "@/lib/lucia"; // Import the validateRequest function

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // other fields...
}

interface AuthContextType {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Explicitly define the state type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      const authData = await validateRequest();
      if (authData.user) {
        const user: User = authData.user as User; // Explicitly type authData.user
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
