import { Fragment } from 'react';
import { AppBar, CssBaseline, Typography, Button, IconButton} from '@mui/material';
import { Box } from '@mui/system';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import useLogoutMutation from '../../hooks/useLogoutMutation';
import useCheckSessionQuery from "../../hooks/useCheckSessionQuery"
import { useNavigate } from 'react-router-dom';

// Using Box component from MUI System as a wrapper to give styling to MUI Material components

const Navbar = () => {

    const handleLightDarkModeChange = () => {
        return;
    }
    const navigate = useNavigate();

    // DO A QUERY AND GET USER NAME
    const { data: sessionData, isLoading: sessionIsLoading, isSuccess: sessionIsSuccess, isError: sessionIsError } = useCheckSessionQuery();

    const logoutMutation = useLogoutMutation({navigate});

    return (
        <Fragment>
            <CssBaseline />
                <AppBar position="static" color="inherit">
                    <Box sx={{ 'display': 'flex' }}>
                        <Box sx={{ 'padding': '15px 10px 10px 15px',  }}>
                            <ChecklistIcon />
                        </Box>
                        <Box sx={{ 'paddingTop': '10px', 'paddingLeft': '15px' }}>
                            <Typography variant="h6">TODO</Typography>
                        </Box>

                        <Box sx={{"display":"flex", "paddingTop": "10px", "marginLeft": "auto", "marginRight": "10px"}}>
                            <Box sx={{ "paddingLeft": "10px", "paddingTop": "2.5px"}}>
                                <Typography variant="h6">{sessionData.username}</Typography>
                            </Box>
                            <Box sx={{"paddingLeft": "10px"}}>
                                <Button variant="contained" color="success" onClick={() => logoutMutation.mutate({username: sessionData.username})}>Logout</Button>
                            </Box>
                            <Box sx={{"paddingLeft": "10px"}}>
                                <IconButton onClick={handleLightDarkModeChange}>
                                    <Brightness6Icon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </AppBar>

        </Fragment>
    )

}

export default Navbar;