import React, { ReactNode } from "react";
import { getAuth } from "@/features/auth/queries/get-auth";

interface AuthProviderProps {
  children: ReactNode;
}

// Update the type definition
type UserProp = { user: Awaited<ReturnType<typeof getAuth>>['user'] };

export async function AuthProvider({ children }: AuthProviderProps) {
  const { user } = await getAuth();

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { user } as UserProp)
          : child,
      )}
    </>
  );
}
