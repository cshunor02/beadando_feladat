import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loggedIn, token, userId, userMail, userName } from '../../state/authenticationSlice';
import { useEffect } from 'react';
import { useGetSurveysQuery } from '../../state/surveyApiSlice';

export function Profile() 
{
    const isUserLoggedIn = useSelector(loggedIn)
    const userID = useSelector(userId)

    const navigate = useNavigate()

    const userFullname = useSelector(userName)
    const emailAddress = useSelector(userMail)
    const { data: surveyData } = useGetSurveysQuery(userID);

    useEffect(() => {
        if(!isUserLoggedIn)
        {
            navigate("/login")
        }
    }, [isUserLoggedIn]);

    return (
        <FadeIn>
            <div className="myprofilediv">
                <h1>My Profile</h1>
                <hr />
                <h3>Name: {userFullname}</h3>
                <h3>Email: {emailAddress}</h3>
                <h3>Number of surveys: {surveyData?.total}</h3>
            </div>
        </FadeIn>
    );
    
}
