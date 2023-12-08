import {createTheme } from "@mui/material/styles";
import { useState, useMemo, createContext } from "react";

// if want to extends the theme interface, can do it here
// declare module '@mui/material/styles' {
//     interface Theme {
//       status: {
//         danger: string;
//       };
//     }
// }

export const theme = createTheme({
    palette: {
    },
});

// through the context we pass the function to toggle the color
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// })

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");

//   const colorMode = useMemo(
//     () => 
//   )
// }