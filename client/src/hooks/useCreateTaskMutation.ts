import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { config } from "../utils/axios";
import { type Dayjs } from "dayjs";
import { queryClient } from "../utils/queryClient";

export interface CreateTaskFormDataType {
    user_id: number,
    title: string,
    description: string,
    starred: boolean,
    created_at: Dayjs,
    status: string
}

const useCreateTaskMutation = (handleClose: () => void) => {
    return useMutation({
        mutationKey: ["create_task"],
        mutationFn: async (data: CreateTaskFormDataType) => {
            const body = JSON.stringify(data);
            const create = await axios.post(`http://localhost:9010/task/${data.user_id}/`, body, config)
            return create;
        },  
        onSuccess: () => {
            queryClient.invalidateQueries(["task", "user_id", "data"])
            handleClose();
        }
    })
}

export default useCreateTaskMutation;