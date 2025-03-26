import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count = 10) => createRequest(`/coins?limit=${count}&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&offset=0`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),

        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),

        getExchanges: builder.query({
            query: () => createRequest("/exchanges"),
        }),
    }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetExchangesQuery, useGetCryptoHistoryQuery } = cryptoApi;
