"use client"

import React, { useEffect, useState } from "react"
import { AccountContext } from "./AccountContext"
import { AccountType } from "@/types/types";
import axios from "axios";
import { fetchAccountsRoute } from "@/utils/routeProvider";

const AccountContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [accounts, setAccounts] = useState<AccountType[]>([]);

    async function fetchAccounts() {
        try {
            const response = await axios.get(fetchAccountsRoute);

            if (response.data.status) {
                setAccounts(response.data.accounts);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, [])

    return (
        <AccountContext.Provider value={{ accounts, setAccounts }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider