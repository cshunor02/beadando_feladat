import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { loggedIn, token } from '../../state/authenticationSlice';
import { useEffect } from 'react';
import { useGetResultsQuery } from '../../state/surveyApiSlice';
import { useState } from 'react';
import { Fragment } from 'react';

export function Answers()
{
    var sb = document.getElementById("snackbar")
    const { whichSurvey } = useParams();

    const isUserLoggedIn = useSelector(loggedIn)
    const navigate = useNavigate()

    const [questions, getQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        if(!isUserLoggedIn)
        {
            navigate("/login")
        }
        sb = document.getElementById("snackbar")
    }, [isUserLoggedIn]);

    const { data: getDatas, refetch } = useGetResultsQuery(whichSurvey);

    useEffect(() => {
        if(getDatas && getDatas.data.length !== 0)
        {
            refetch()
            var obj = JSON.parse(getDatas.data[0].survey?.content)
            var temp = []
            var pagesKey = Object.keys(obj)
            for(let i = 0; i < pagesKey.length; i++)
            {
                temp = temp.concat(obj[pagesKey[i]].questions)
            }
            getQuestions(temp)

            var temp2 = []
            var final = []
            for(let i = 0; i < temp.length; i++)
            {   
                temp2.push([])
                final.push([])
            }
            for(let k = 0; k < getDatas.data.length; k++)
            {
                obj = JSON.parse(getDatas.data[k].content)
                pagesKey = Object.keys(obj)
                for(let i = 0; i < pagesKey.length; i++)
                {
                    temp2[i].push((obj[pagesKey[i]]))
                }
            }
            for(let o = 0; o < temp2.length; o++)
            {
                let p
                let z = (pageNumber-1)*4
                for(p = (pageNumber-1)*4; p < (pageNumber*4) && p < temp2[o].length; p++)
                {
                    final[o].push(temp2[o][p])
                }
                if (p !== z)
                {
                    final[o].push('-> More answers on the next page...')
                }
            }
            setAnswers(final)
        }
        if (sb !== null)
        {
            sb.className = "show";
            setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 3000);
        }
    }, [getDatas, pageNumber]);

    if(getDatas === undefined || getDatas?.data.length < 1)
    {
        return(
            <FadeIn>
                <h1>There is currently no answers recorded for this survey</h1>
            </FadeIn>
        )
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
            <span id="snackbar">Answers are Up To Date</span>
            <div className="mysurveydiv">
                <h1>{getDatas.data[0].survey.name}</h1>
                <table>
                    <tbody>
                        {questions.map((e,i) => (
                            <Fragment key={"tableKey_"+i}>
                                <tr key={"questiontr_"+i}>
                                    <td key={"questiontd_"+i}><h4>{e}</h4></td>
                                </tr>
                                <tr key={"trK_"+i}>
                                    <td key={"tdK_"+i}>
                                        <table className="innerTable">
                                            <tbody>
                                                {answers[i].map((ans,j) => (
                                                    <tr key={"tr_"+j}>
                                                        <td key={"td_"+j}>{ans}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </Fragment>
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
