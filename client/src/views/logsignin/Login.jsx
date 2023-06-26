import { useEffect, useState } from "react";
import FadeIn from 'react-fade-in';
import { useLoginUserMutation } from "../../state/surveyApiSlice";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../state/authenticationSlice";
import { useNavigate } from "react-router";
import { delay } from "../../state/globalFunctions";

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let errorMessage = ""
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginUser, { data: userData, error: loginError }] = useLoginUserMutation()

    useEffect(() => {
        if (userData) {
            dispatch(LOGIN(userData));
            delay(200).then(() => {
                if (window.history.state && window.history.state.idx > 1) {
                    navigate(-2);
                } else if (window.history.state && window.history.state.idx > 0) {
                    navigate(-1);
                } else {
                    navigate('/');
                }
            })
        }
      }, [userData, dispatch, navigate]);

    if (loginError)
    {
        errorMessage = "Invalid username and/or password!"
    }

    function onInput(where, e)
    {
        switch(where)
        {
            case 1:
                setEmail(e.target.value)
                console.log("name: " + e.target.value)
                break;
            case 2:
                setPassword(e.target.value)
                console.log("pswd: " + e.target.value)
                break;
            default:
                console.log("Runtime error")
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault()
        loginUser({
            "email": email,
            "password": password,
            "strategy": "local"
        })
    }

    return (
        <FadeIn>
            <div className="loginDiv">
                <h1>Login page</h1>
                <hr />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p className="goleft">Email:  <input type="email" name="name" onInput={(e) => onInput(1,e)} /> </p>
                    <p className="goleft">Password:  <input type="password" name="name" onInput={(e) => onInput(2,e)} /> </p>
                    <p className="alignRight"> <input type="submit" className="goright" value="Login" /> </p>
                    <p className="errorMsg">{errorMessage}</p>
                </form>
            </div>
        </FadeIn>
    );
}
