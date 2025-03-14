import {Navigate, useNavigate} from "react-router-dom";
import {useToast} from "./useToast.jsx";

export default function useApi() {
    const navigate = useNavigate();
const toast = useToast();

    const api = async (link, headers = {}, body = null, method = "GET", needAuthorization = true) => {
        try {
            console.log(`${import.meta.env.VITE_BASE_URL}${link} with method ${method}`);
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
            console.log(response)
            if (response.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/");
                return
            }
            if (!response.ok) {
                return null
            }

            const data = await response.json();
            console.log(response.status, data);
            return data;
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/");
                throw new Error("Your session has expired. Please log in again.");
                return
            }
            try {
                const responseBody = await error.json();
                toast.error(responseBody?.message || "An unexpected error occurred.");
                throw new Error(responseBody?.message || "An unexpected error occurred.");
            } catch (parseError) {
                toast.error("An unexpected error occurred, and the response could not be parsed.")
                throw new Error("An unexpected error occurred, and the response could not be parsed.");
            }
            return null
        }
    };

    return api;
}
