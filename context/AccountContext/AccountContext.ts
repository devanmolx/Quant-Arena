import { AccountContextType } from "@/types/types";
import { createContext } from "react";

const defaultAccountContextValue: AccountContextType = {
    accounts: [],
    setAccounts: () => { }
}

export const AccountContext = createContext<AccountContextType>(defaultAccountContextValue);