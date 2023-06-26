import { useState } from "react";
import FadeIn from 'react-fade-in';
import { useRegisterUserMutation } from "../../state/surveyApiSlice";

export function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let success = ""
    let errorMsg = ""

    const [registerUser, { isSuccess : isSuccess, error: error }] = useRegisterUserMutation()

    if(isSuccess)
    {
        success = "Congratulations, your account has been successfully created!"
    } else if (error)
    {
        errorMsg = "The account already exist!"
    }

    function onInput(where, e)
    {
        switch(where)
        {
            case 1:
                setName(e.target.value)
                console.log("name: " + e.target.value)
                break;
            case 2:
                setEmail(e.target.value)
                console.log("mail: " + e.target.value)
                break;
            case 3:
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
        registerUser({
            "fullname" : name,
            "email" : email,
            "password" : password
        })
    }

    return (
        <FadeIn>
            <div className="loginDiv">
                <h1>Create new account</h1>
                <hr />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p className="goleft">Your name: <input type="text" name="name" onInput={(e) => onInput(1,e)} /> </p>
                    <p className="goleft">Email address: <input type="email" name="name" onInput={(e) => onInput(2,e)} /> </p>
                    <p className="goleft">Password: <input type="password" name="name" onInput={(e) => onInput(3,e)} /> </p>
                    <p className="alignRight"> <input type="submit" className="goright" value="Register" /> </p>
                    <p className="success">{success}</p>
                    <p className="errorMsg">{errorMsg}</p>
                </form>
            </div>
        </FadeIn>
  );
}
