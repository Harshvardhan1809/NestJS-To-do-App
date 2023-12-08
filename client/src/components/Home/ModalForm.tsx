import React, { type BaseSyntheticEvent, Fragment, useState, useMemo } from "react";
import { Dialog, TextField, styled, Button, Typography, Box } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import StarIcon from '@mui/icons-material/Star';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from 'dayjs';
import useCreateTaskMutation from "../../hooks/useCreateTaskMutation";
import useCheckSessionQuery from "../../hooks/useCheckSessionQuery";

// attempt to reduce the inline CSS
// can't use makeStyles since it is depreacted (@mui/styles)
// hence styled components

const StyledTextField = styled(TextField)(({}) => ({
    margin: "1rem",
    width: "350px",
}))

const StyledForm = styled('form')(({}) => ({
    display: "flex",
    flexDirection : "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    margin: "25 px 0px 20px 0px"
}))

const StyledButtonDiv = styled('div')(({}) => ({
    width: "100%", 
    display: "flex",
    flexDirection:"row", 
    justifyContent: "space-evenly",
    margin: "10px auto 20px auto",
}))

const StyledImportantField = styled(Typography)(({}) => ({
    margin : "22.5px 15px 22.5px 15px", 
    color : "gray", 
    fontSize : "1rem"

}))

interface FormDataType {
    title: string,
    description: string,
    starred: boolean,
    created_at: Dayjs,
    status: string
}

const ModalForm = (props: {open: boolean, handleClose: () => void}) => {

    const [formData, setFormData] = useState<FormDataType>({title: "", description: "", starred: false, created_at: dayjs(), status:"incomplete"});

    const isOpen = props.open;
    const handleClose = props.handleClose;
    const value = dayjs();

    const checkSessionQuery = useCheckSessionQuery();
    const createTaskMutation = useCreateTaskMutation(handleClose);

    const starColor: string = useMemo(() => {
        if (formData.starred == true) return "gold"
        return "gray"
    }, [formData]);

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose}>
                <Box sx={{"width": "450px"}}>
                    <StyledForm action="">

                        <Box sx={{"display": "flex", margin: "20px auto 5px auto"}}>
                            <CreateIcon sx={{"margin": "10px 10px 0px 0px"}}/>
                            <Typography variant="h4">
                                Create a new task
                            </Typography>
                        </Box>

                        <StyledTextField label="Title" onChange={(e: BaseSyntheticEvent) => { setFormData({...formData, title: e.target.value})}}/>

                        <StyledTextField label="Description" onChange={(e: BaseSyntheticEvent) => { setFormData({...formData, description: e.target.value})}}/>

                        <Box sx={{"display": "flex", "width": "100%", marginLeft: "75px" }} >
                            <StyledImportantField> Important :</StyledImportantField>
                            <Button disableRipple onClick={ () => setFormData({...formData, starred: !formData.starred}) }>
                                <StarIcon sx={{margin: "14px 0px 18px 0px", color: `${starColor}` }}/>
                            </Button>
                        </Box>

                        <Box sx={{"display": "flex", "width": "100%", marginLeft: "75px"}}>
                            <StyledImportantField> Date :</StyledImportantField>
                            <DatePicker value={formData.created_at} onChange={(e: any) =>{ setFormData({...formData, created_at: e.format('YYYY-MM-DD HH:mm:ss')}) }} />
                        </Box>
                        
                        <StyledButtonDiv>
                            <Button variant="outlined" onClick={() => { createTaskMutation.mutate({...formData, user_id: checkSessionQuery.data.ID}) }}>Create task</Button>
                            <Button variant="outlined" onClick={() =>  setFormData({title: "", description: "", starred: false, created_at: dayjs(), status:"incomplete"}) }>Clear</Button>
                        </StyledButtonDiv>

                    </StyledForm>
                </Box>
            </Dialog>
        </Fragment>
    )
}

export default ModalForm;