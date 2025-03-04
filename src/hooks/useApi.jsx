import {Navigate, useNavigate} from "react-router-dom";

export default function useApi() {
    const navigate = useNavigate();

    const api = async (link, headers = {}, body = null, method = "GET", needAuthorization = true) => {
        try {
            console.log(`${import.meta.env.VITE_BASE_URL}${link}`)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${link}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(needAuthorization && {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }),
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            });
            if (!response.ok) {
                // Gérer les erreurs HTTP
                const errorData = await response.json();
                throw { status: response.status, data: errorData };
            }

            const data = await response.json();
            console.log(response.status,data);
            return data;
        } catch (error) {
            console.log(error)
             if (error.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/");
                throw new Error("Your session has expired. Please log in again.");
            }
            throw new Error(error.data?.message || "An unexpected error occurred.");
        }
    };

    return api;
}
