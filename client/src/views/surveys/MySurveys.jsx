import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loggedIn, token, userId } from '../../state/authenticationSlice';
import { useEffect, useState } from 'react';
import { BiMessageDetail } from  "react-icons/bi";
import { FaCopy } from  "react-icons/fa";
import { BsPencilFill } from  "react-icons/bs";
import { AiFillDelete } from  "react-icons/ai";
import { useDeleteSurveyMutation, useGetSurveysQuery } from '../../state/surveyApiSlice';

export function MySurveys() 
{
    var sb = document.getElementById("snackbar")

    const isUserLoggedIn = useSelector(loggedIn)
    const navigate = useNavigate()
    
    const userID = useSelector(userId)
    const userToken = useSelector(token)

    const [deleteSurveyMethod] = useDeleteSurveyMutation()
    const [surveyData, setSurveyData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        if(!isUserLoggedIn)
        {
            navigate("/login")
        }
    }, [isUserLoggedIn, navigate]);

    const { data: getDatas, refetch } = useGetSurveysQuery(userID);

    useEffect(() => {
        if(getDatas)
        {
            refetch()
            var temp = []
            for(let i = (pageNumber-1)*5; i < (pageNumber*5) && i < getDatas.data.length; i++)
            {
                temp.push(getDatas.data[i])
            }
            setSurveyData(temp)
            sb = document.getElementById("snackbar")
        }
    }, [getDatas, pageNumber]);

    function answersLink(surveyId)
    {
        navigate("/answers/" + surveyId)
    }

    function copyLink(hash)
    {
        console.log(window.location.origin + "/survey/" + hash)
        navigator.clipboard.writeText(window.location.origin + "/survey/" + hash)

        if (sb !== null)
        {
            sb.className = "show";
            setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 3000);
        }
    }

    function editSurvey(hash)
    {
        navigate("/newsurvey/", {state: {hash : hash}});
    }

    async function deleteSurvey(deleteID) {
        await deleteSurveyMethod(deleteID)
        refetch();
    }

    function prevPage()
    {
        if(pageNumber > 1)
        {
            setPageNumber(e => e-1)
        }
    }

    function nextPage()
    {
        setPageNumber(e => e+1)
    }

    return (
        <FadeIn>
            <div className="mysurveydiv">
                <h1>Surveys</h1>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th className="nameColumn">Name</th>
                            <th className="actionsColumn">Actions</th>
                        </tr>
                    {surveyData && surveyData.map((data, i) => (
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td className='buttons'>
                                <button onClick={() => answersLink(data.id)} className='mysurvey_button'><BiMessageDetail /></button>
                                <button onClick={() => copyLink(data.hash)} className='mysurvey_button'><FaCopy /></button>
                                <button onClick={() => editSurvey(data.hash)} className='mysurvey_button_edit'><BsPencilFill /></button>
                                <span id="snackbar">Successfully Copied to Clipboard</span>
                                <button onClick={() => deleteSurvey(data.id)} className='mysurvey_button_delete'><AiFillDelete /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={() => prevPage()}>{"<- Previous Page"}</button>
                    Page {pageNumber}
                    <button onClick={() => nextPage()}>{"Next Page ->"}</button>
                </div>
            </div>
        </FadeIn>
    );
    
}
