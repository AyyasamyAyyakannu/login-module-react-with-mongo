import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectRouter = ({component,...rest}) => {
    var RenderComponents = component;
    var hasToken = localStorage.getItem('auth')
    return(
        <Route 
        { ...rest }
        render = {
            props => {
                return (hasToken) ? 
                (
                    <RenderComponents components { ...props } />
                )
                :
                (
                    <Redirect to={{ pathname:'/login' }} />
                )
            }
        }
        />
    )
}

export default ProtectRouter