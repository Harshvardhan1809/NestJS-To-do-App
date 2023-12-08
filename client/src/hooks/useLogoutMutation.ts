import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../utils/axios";
import { NavigateFunction } from "react-router-dom";
import { queryClient } from "../utils/queryClient";

export interface LogoutFormDataType {
    username: string,
}

interface Options {
    navigate: NavigateFunction;
}

const useLogoutMutation = ({navigate}: Options) => {

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async (data: LogoutFormDataType)  => { 
            const { username } = data;
            const body = JSON.stringify({ username });
            const logout = await axios.post("http://localhost:9010/auth/logout", body, config)
            return logout;
        },  
        onSuccess: () => {
            console.log("In logout onSuccess")
            queryClient.invalidateQueries(["auth","session"])
            navigate("/login");
        }, 
        onError: () => {
            console.log("Getting error for login mutation")
            navigate("");
        }
      })
      
}

export default useLogoutMutation;