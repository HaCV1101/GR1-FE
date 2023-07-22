import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProfile } from "../api";
import { getItem, removeItem, storeItem } from "../utils";
export interface CVType {
  applyPosition: string;
  goals: string;
  contacts: {
    birthday: string;
    gender: string;
    address: string;
    phone: string;
    mail: string;
    github: string;
  };
  avatar: string;
  hobbies: string[];
  skills: {
    title: string;
    details: string[];
  }[];
  education: [
    {
      university: string;
      specialized: string;
      graduationType: string;
      period: string;
    }
  ];
  experiences: [
    {
      position: string;
      company: string;
      period: string;
    }
  ];
}
export type User = {
  role: "candidate";
  _id: string;
  email: string;
  password: string;
  fullname: string;
  phone: string;
  address?: string;
  avatar?: string;
  tags: string[];
  cv?: string;
};
export type Company = {
  role: "company";
  _id: string;
  name: string;
  introCompany: string;
  email: string;
  phone: string;
  jobs: string[];
  contacts: {
    address: string;
    phone: string;
    email: string;
    homepage: string;
  };
  cover: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
type Role = "candidate" | "company";
type ContextPayloadType = {
  login: boolean;
  isLoading: boolean;
  action: { login: (user: User | Company) => void; logout: () => void };
  user?: User | Company;
  role: Role;
};
const AuthContext = createContext<ContextPayloadType>({
  login: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  action: { login: () => {}, logout: () => {} },
  role: "candidate",
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<User | Company>();
  const [role, setRole] = useState<"candidate" | "company">("candidate");
  const [isLoading, setIsLoading] = useState(true);
  const action = useMemo(
    () => ({
      login: (user: User | Company) => {
        storeItem("user", user);
        setLogin(true);
        setUser(user);
        setRole(user.role);
      },

      logout: () => {
        removeItem("user");
        removeItem("token");
        setLogin(false);
        setUser(undefined);
      },
    }),
    []
  );
  useEffect(() => {
    const role = getItem("role") as "candidate" | "company" | null;
    if (!role) {
      action.logout();
      setIsLoading(false);
      return;
    }
    getProfile(role)
      .then((data) => {
        action.login(data);
      })
      .catch((e) => {
        console.log(e);

        action.logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ login, action, user, isLoading, role }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuth = () => useContext(AuthContext);
export const isCompany = (role: Role, _: Company | User): _ is Company =>
  role === "company";
export default AuthProvider;
