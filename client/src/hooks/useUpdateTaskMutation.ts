import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { config } from "../utils/axios";
import dayjs, { type Dayjs } from "dayjs";
import dayjsPluginUTC from 'dayjs-plugin-utc'
import { queryClient } from "../utils/queryClient";
dayjs.extend(dayjsPluginUTC);

type UpdateTaskQuery = { 
    user_id: number,
    title: string,
    description: string,
    starred: boolean,
    CreatedAt: Dayjs,
    status: string,
    CompletedAt: Dayjs,
    UpdatedAt: Dayjs,
    ID: number
}

const useUpdateTaskMutation = () => {
    return useMutation({
        mutationKey: ["update_task"],
        mutationFn: async (data: UpdateTaskQuery) => {
            console.log("Print data", data);
            const dat: any = {
                userId: data.user_id,
                title: data.title,
                description: data.description,
                starred: data.starred,
                created_at: data.CreatedAt,
                status: data.status,
                completed_at: data.CompletedAt,
                // updated_at: data.UpdatedAt
            }
            if (dat.status === "incomplete"){
                delete dat.completedAt;
                console.log("Incomplete so deleted the date")
                }
            const body = JSON.stringify(dat);
            console.log("Print request body", body)
            const create = await axios.put(`http://localhost:9010/task/update/${data.ID}/`, body, config)
            return create;
        },  
        onSuccess: () => {
            queryClient.removeQueries(["task", "user_id", "data"])
        }
    })
}

export default useUpdateTaskMutation;
