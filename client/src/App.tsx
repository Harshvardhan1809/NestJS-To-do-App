import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer";
import Home from "./containers/HomeContainer";
import { CssBaseline } from '@mui/material';
import AuthWrapper from "./components/general/AuthWrapper";

const App: React.FC = React.memo(() => {

    return (
            <div className="app">
                <CssBaseline/>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginContainer />} />
                        <Route path="/signup" element={<SignupContainer />} />
                        <Route path="" element={
                            <AuthWrapper children={<Home/>} />
                        }/>
                    </Routes>
                </Router>
            </div>
    )
})

export default App;
//<AuthWrapper>                            </AuthWrapper>


// Navbar, hero area (with a background design and the todo section) 
