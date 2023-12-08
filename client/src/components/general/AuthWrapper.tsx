import React from 'react'
import useCheckSessionQuery from '../../hooks/useCheckSessionQuery'
import { Navigate, useNavigate } from "react-router-dom"

export type AuthWrapperProps = {
    children: React.ReactNode
}

const AuthWrapper = ({children}: AuthWrapperProps) => {

    const checkSessionQuery = useCheckSessionQuery();

    return (
        <div>
            {checkSessionQuery.isSuccess ? <> {children} </> : <Navigate to="/login" /> }
        </div>
    )
}

export default AuthWrapper
