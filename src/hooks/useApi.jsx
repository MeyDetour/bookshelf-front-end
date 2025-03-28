import {Navigate, useNavigate} from "react-router-dom";
import {useToast} from "./useToast.jsx";
import Login from "../pages/auth/Login.jsx";

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
            if (response.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/");
                return null
            }
            if (!response.ok) {
                console.log(response);
                const errorResponse = await response.json().catch(() => null);
                throw { message: errorResponse?.message || `HTTP error! Status: ${response.status}`, status: response.status };
            }

            const data = await response.json();
            console.log(response.status, data);
            return data;
        } catch (error) {
            console.error("API error:", error);

            if (error.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/");
                toast("error","Your session has expired. Please log in again.");
                return {error:"Your session has expired. Please log in again."};

            }
            toast("error",error.message  );
            return {error:error.message};
        }
    };

    return api;
}
