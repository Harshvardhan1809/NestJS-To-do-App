import React, {Dispatch, Fragment, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {Card, CardContent, CardHeader, Typography, Box, Button, Tooltip} from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ButtonBase from '@mui/material/ButtonBase';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useFetchTaskByUserIDDateQuery from "../../hooks/useFetchTaskByUserQuery";
import useCheckSessionQuery from "../../hooks/useCheckSessionQuery";
import useUpdateTaskMutation from "../../hooks/useUpdateTaskMutation";
import useDeleteTaskMutation from "../../hooks/useDeleteTaskMutation";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { queryClient } from "../../utils/queryClient";

import dayjs, {type Dayjs} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
// dayjs.tz(dayjs().format("YYYY-MM-DD HH:mm:ss"), "Asia/Tokyo")

const TodoList = (props: { modalOpen : () => void, date: string, setDate: Dispatch<React.SetStateAction<string>>
}) => {
    
    const {modalOpen, date, setDate} = props;

    useEffect(() => {
        queryClient.removeQueries(["task","user_id","data"]) // if invalidate, refetches immediately lol
    }, [date])

    const checkSessionQuery = useCheckSessionQuery();
    const fetchTaskByUserQuery = useFetchTaskByUserIDDateQuery({user_id: checkSessionQuery.data.id, date: date});
    const updateTaskMutation = useUpdateTaskMutation();
    const deleteTaskMutation = useDeleteTaskMutation();

    return (
        <Fragment>
            <Card sx={{ width: 800, margin: "auto", marginTop: "15px", paddingTop: "30px" }}>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CardHeader title="Tasks for " sx={{ textAlign: "center" }}/>
                    <DesktopDatePicker
                        value={dayjs(date)}
                        selectedSections={"all"}
                        showDaysOutsideCurrentMonth={false}
                        onChange={(e: any) =>{ 
                            const date: Dayjs = dayjs().year(e.$y).month(e.$M).date(e.$D)
                            setDate(date.format("YYYY-MM-DD HH:mm:ss"))
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex"}}>
                    <Typography sx={{ margin: "2.5px 10px 0px 75px", color: "red" }} variant="h6">INCOMPLETE</Typography>
                    <Tooltip title="Add new task">
                        <Button onClick={modalOpen}>
                            <AddCircleIcon sx={{ margin: "0px 0px 0px 0px" }} />
                        </Button>
                    </Tooltip>
                </Box>
                <CardContent>

                    { fetchTaskByUserQuery.data && (fetchTaskByUserQuery.data as Array<any>)?.map((task: any, idx: number) => {
                        // .format("YYYY-MM-DD HH:mm:ss")
                        if (task.status === "incomplete") {
                            const color: string = (task.starred === true) ? "gold" : "gray";
                            return (
                                <Box key={idx} sx={{ margin: "0px 50px 10px 50px", display: "flex", border: "solid", borderRadius: "5px", borderWidth: "1px", borderColor: "gray", padding: "7.5px 10px 7.5px 20px" }}>
                                    <Tooltip title="Done">
                                        <RadioButtonUncheckedIcon sx={{ margin: "5px 20px auto 0px" }}/>
                                    </Tooltip>
                                    <Box>
                                        <Typography variant="h6" sx={{ margin: "auto 0 auto 0" }}>{task.title}</Typography>
                                        <Typography>{task.description}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", marginLeft: "auto" }}>
                                        <Tooltip title="Star as important">
                                            <StarIcon sx={{ margin: "auto 15px auto 0px", color: `${color}`}} onClick={() => updateTaskMutation.mutate({...task, status: "incomplete", starred: !task.starred, UpdatedAt: dayjs(), ID: task.id})}/>
                                        </Tooltip> 
                                        <Button variant="contained" onClick={() => updateTaskMutation.mutate({...task, status: "completed", CompletedAt: dayjs(), UpdatedAt: dayjs(), ID: task.id}) }>DONE</Button>
                                        <Button variant="contained" color="error" sx={{ margin: "0px 0px 0px 10px" }} onClick={() => deleteTaskMutation.mutate({task_id: task.id})}>DELETE</Button>
                                    </Box>
                                </Box>
                            )
                        }
                    }) }    

                </CardContent>
                
                <Typography sx={{ margin: "0px 50px 0px 75px", color: "green" }} variant="h6">COMPLETED</Typography>
                <CardContent>

                    { 
                        fetchTaskByUserQuery.data && (fetchTaskByUserQuery.data as Array<any>)?.map((task: any, idx: number) => {
                            const color: string = (task.starred === true) ? "gold" : "gray";
                            if (task.status === "completed") {
                                const color: string = (task.starred === true) ? "gold" : "gray";
                                return (
                                    <Box key={idx} sx={{ margin: "0px 50px 10px 50px", display: "flex", border: "solid", borderRadius: "5px", borderWidth: "1px", borderColor: "gray", padding: "7.5px 10px 7.5px 20px" }}>
                                        <Tooltip title="Undo">
                                            <CheckCircleIcon sx={{ margin: "5px 20px auto 0px" }}/>
                                        </Tooltip>
                                        <Box>
                                            <Typography variant="h6" sx={{ margin: "auto 0 auto 0" }}>{task.title}</Typography>
                                            <Typography>{task.description}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", marginLeft: "auto"}}>
                                            <StarIcon sx={{ margin: "auto 15px auto 0px", color: `${color}` }}/>
                                        </Box>
                                    </Box>
                                )
                            }
                        }) 
                    }

                </CardContent>

                <Typography sx={{ margin: "0px 50px 0px 75px", color: "gray" }} variant="h6">PREVIOUS INCOMPLETE TASKS</Typography>
                <CardContent>

                    {/* <Box sx={{ margin: "0px 50px 10px 50px", display: "flex", border: "solid", borderRadius: "5px", borderWidth: "1px", borderColor: "gray", padding: "7.5px 10px 7.5px 20px"}}>
                        <Tooltip title="Done">
                            <RadioButtonUncheckedIcon sx={{ margin: "5px 20px auto 0px"}}/>
                        </Tooltip>
                        <Box>
                            <Typography variant="h6" sx={{ margin: "auto 0 auto 0" }}>Pay the water bill for April and May</Typography>
                            <Typography>2 months unpaid lol</Typography>
                            <Typography>22nd April 2023</Typography>
                        </Box>
                        <Box sx={{display: "flex", marginLeft: "auto"}}>
                            <Tooltip title="Star as important">
                                <StarIcon sx={{ margin: "auto 15px auto 0px" }}/>
                            </Tooltip>
                            <Button variant="contained">DONE</Button>
                            <Button variant="contained" color="error" sx={{ margin: "0px 0px 0px 10px" }}>DELETE</Button>                 
                        </Box>
                    </Box> */}

                </CardContent>

            </Card>
        </Fragment>
    )
}

export default TodoList;

{/* <Typography sx={{ color: "black" }}>view more (fetches 5 more incomplete tasks, currently seeing tasks from yesterday and the day before yesterday)</Typography> */}

{/* <Typography sx={{ color: "black" }}>displays completed tasks from today, can't clear but automatically disappears in 24 hours</Typography> */}