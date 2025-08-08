import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const respData = await response.json();

    if(!response.ok) {
        return new Error(respData.message || "Something went wrong!");
    }
    return respData
}

export default function useHttp(url, config, initialData) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setLoading(true);
            try {
                const response = await sendHttpRequest(url, {...config, body: data});
                setError(null);
                setData(response)
            } catch (error) {
                setError(error.message || "Something went wrong!");
            }

            setLoading(false);
        }, [url, config])

    useEffect(() => {
        if(config && (config.method === "GET" || !config.method || !config)) {
            sendRequest();
        }
    }, [sendRequest])

    console.log(data);

    return {
        error,
        loading,
        data,
        sendRequest,
    }
}