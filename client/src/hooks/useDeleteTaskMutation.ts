import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { config } from "../utils/axios";
import { type Dayjs } from "dayjs";
import { queryClient } from "../utils/queryClient";

export interface DeleteTaskFormDataType {
    task_id: number,
}

const useDeleteTaskMutation = () => {
    return useMutation({
        mutationKey: ["create_task"],
        mutationFn: async (data: DeleteTaskFormDataType) => {
            const options = {
                // headers: {
                //     "Content-Type": "application/json"
                // },
                withCredentials : true, 
                data: data.task_id
            }
            const del = await axios.delete(`http://localhost:9010/task/delete/${data.task_id}/`, options)
            return del;
        },  
        onSuccess: () => {
            queryClient.invalidateQueries(["task", "user_id", "data"])
        }
    })
}

export default useDeleteTaskMutation;