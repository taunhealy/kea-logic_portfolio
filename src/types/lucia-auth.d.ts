declare module "lucia-auth/react" {
  import { ReactNode } from "react";

  interface LuciaProviderProps {
    value: any;
    children: ReactNode;
  }

  export const LuciaProvider: React.FC<LuciaProviderProps>;
}
