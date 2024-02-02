import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { config } from "../utils/axios";
// import dayjs, { type Dayjs } from "dayjs";
// import timezone from 'dayjs/plugin/timezone';
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Tokyo');

type FetchTaskByUserIDDateType = { 
    user_id: number,
    date: string
}

const useFetchTaskByUserIDDateQuery = ({user_id, date}: FetchTaskByUserIDDateType ) => {
    return useQuery({
        queryKey: ["task", "user_id", "data"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:9010/task/date/${user_id}/${date.split(" ")[0]}/`, config);
            return response.data;
        },
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            console.log("Error checking sessions", error)
        } 
    }
    )
} 

export default useFetchTaskByUserIDDateQuery;