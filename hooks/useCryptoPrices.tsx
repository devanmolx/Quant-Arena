import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCryptoPriceRoute } from "@/utils/routeProvider";
import { CryptoPrice } from "@/types/types";

const CACHE_KEY = "crypto-prices"

export function useCryptoPrices() {
    const [prices, setPrices] = useState<CryptoPrice[]>([]);

    useEffect(() => {
        const cache = localStorage.getItem(CACHE_KEY);

        if (cache) {
            setPrices(JSON.parse(cache));
        }

        fetchCryptoPrice();
    }, []);

    async function fetchCryptoPrice() {
        try {
            const response = await axios.get(fetchCryptoPriceRoute);
            if (response.data.status) {
                setPrices(response.data.prices);
                localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.prices));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { prices, refetch: fetchCryptoPrice };
}
