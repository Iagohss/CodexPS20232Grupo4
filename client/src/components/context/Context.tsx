import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
  email: string;
  senha: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        senha,
        setSenha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
