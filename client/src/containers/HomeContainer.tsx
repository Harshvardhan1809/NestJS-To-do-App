import React, { Fragment, useState } from "react";
import TodoList from "../components/Home/Todolist"
import ModalForm from "../components/Home/ModalForm"
import { Container, Typography } from "@mui/material";
import Navbar from "../components/general/Navbar"; 
import { Box } from "@mui/system";
import GridPatternRepeatImage from "./../assets/gridRepeat.jpg"
import GridInvertedPatternRepeatImage from "./../assets/gridRepeatInvertedPatten.jpg" // b/w image
import useCheckSessionQuery from "../hooks/useCheckSessionQuery";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, {type Dayjs} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const Home = () => {

    const [modalOpen, setModalOpen] =  useState(false);
    const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const handleOpen = () => setModalOpen(true);
    const handleClose = () =>  setModalOpen(false);

    return (
        <main style={{height: "100vh", maxHeight: "fit-content"}}>
            <Box sx={{ backgroundImage: `url(${GridPatternRepeatImage})`, backgroundPosition: "center", backgroundSize: "20%", backgroundRepeat: "repeat", height: "100vh", maxHeight: "fit-content" }}>
                <Navbar/>
                <Container maxWidth="sm" sx={{"textAlign": "center", "marginTop": "25px"}}>
                    <Typography variant="h4" gutterBottom>TODO App</Typography>
                    <Typography variant="h6" gutterBottom>A todo app to list down and manage your daily tasks!</Typography>
                </Container>
                <Container>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                        <TodoList modalOpen={handleOpen} date={date} setDate={setDate}/>
                        <ModalForm open={modalOpen} handleClose={handleClose}/>
                    </LocalizationProvider>
                </Container>
            </Box>
        </main>
    )
}

export default Home
