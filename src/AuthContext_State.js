import React,{useState} from "react";
import AuthContext from './AuthContext';

const AuthContext_State=(props)=>{
    const s1={
        "id":"",
        "auth_token":"",
        "role":"",
        "email":""
    }
    const [state,setState]=useState(s1);
    const update=(session_data)=>{
        setState(session_data)
    }

    return(
        <AuthContext.Provider value={{state,update}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext_State;