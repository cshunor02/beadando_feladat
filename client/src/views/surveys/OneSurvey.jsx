import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { loggedIn} from '../../state/authenticationSlice';
import { useEffect, useState } from 'react';
import { Page } from './Page';
import { useGetOneSurveyQuery, useSendAnswerMutation } from '../../state/surveyApiSlice';
import { VscArrowLeft, VscArrowRight } from  "react-icons/vsc";

const defaultState = {}

export function OneSurvey()
{
    const { hash } = useParams();
    const isUserLoggedIn = useSelector(loggedIn)

    const [questions, fillQuestions] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [canGoToNextPage, changeCanGo] = useState(false)

    const [surveyID, setSurveyId] = useState(-1)
    const [sendAnswer, datas] = useSendAnswerMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if(!isUserLoggedIn)
        {
            navigate("/login")
        }
    }, [isUserLoggedIn, navigate]);

    const getData = useGetOneSurveyQuery(hash)

    useEffect(() => {
        if (getData.data)
        {
            console.log(getData)
            fillQuestions(getData.data.data[0])
            setSurveyId(getData.data.data[0].id)
        }
    }, [getData.data])

    var pages = null
    var pagesKey = null
    var cantDisplay = false
    
    if(questions?.content !== undefined)
    {
        try {
            pages = JSON.parse(questions?.content)
            pagesKey = Object.keys(pages)
        } catch (e) {
            cantDisplay = true
        }
    }
    
    const [classes, changeClasses] = useState(Array.from(Array(5).keys()));

    const updateNthElement = (nth, value) => {
        changeClasses((prevClasses) => {
            const updatedClasses = [...prevClasses]
            updatedClasses[nth] = value
            return updatedClasses;
        });
    };

    useEffect(() => {
        updateNthElement(1, 'active')
    }, [])
    
    function jumpToPageButtonClick(pageNum)
    {
        if (parseInt(pageNum) == pagesKey[pagesKey.length-1])
        {
            var db = 0
            for (let key in formState) 
            {
                let temp = formState.hasOwnProperty(key)
                if(temp && key.substring(0, key.indexOf('_')) == parseInt(currentPage) && formState[key] !== '')
                {
                    db++
                }
            }
            if (db < pages[parseInt(currentPage)].questions.length)
            {
                updateNthElement(currentPage, 'active')
                return
            } else {
                changeCanGo(true)
            }
        }
        if(pageNum < currentPage)
        {
            setCurrentPage(parseInt(pageNum))
            if (pageNum == pagesKey[pagesKey.length-1])
            {
                setNextText("Send Answers")
            } else {
                setNextText("Next")
            }
            changeCanGo(true)

        } else if(pageNum >= currentPage && canGoToNextPage && (classes[pageNum] === 'active' || classes[pageNum] === 'fulfilled'))
        {
            setCurrentPage(parseInt(pageNum))
            updateNthElement(currentPage, 'fulfilled')
            if (pageNum == pagesKey[pagesKey.length-1])
            {
                setNextText("Send Answers")
            } else {
                setNextText("Next")
            }
        }
    }
    
    function prevButtonClick()
    {
        if(currentPage > 1)
        {
            setCurrentPage(e => e-1)
            changeCanGo(true)
            setNextText("Next")
        }
    }
    
    const [nextText, setNextText] = useState("Next")
    const [end, setEnd] = useState(false)

    function nextButtonClick()
    {
        var db = 0

        for (let key in formState) 
        {
            if(key.substring(0, key.indexOf('_')) == parseInt(currentPage) && formState[key] !== '')
            {
                db++
            }
        }

        if (db < pages[parseInt(currentPage)].questions.length)
        {
            updateNthElement(parseInt(currentPage), 'active')
            return
        } else {
            changeCanGo(true)
        }

        if(currentPage < pagesKey[pagesKey.length-1] && canGoToNextPage)
        {
            updateNthElement(currentPage, 'fulfilled')
            if(classes[parseInt(currentPage)+1] !== 'active' && classes[parseInt(currentPage)+1] !== 'fulfilled')
            {
                updateNthElement(parseInt(currentPage)+1, 'active')
            }
            if (parseInt(currentPage)+1 == pagesKey[pagesKey.length-1])
            {
                setNextText("Send Answers")
            } else {
                setNextText("Next")
            }

            var db = 0;
            var canChange = true

            for (let key in formState) {
                let temp = formState.hasOwnProperty(key)
                if (temp && formState[key] == '') {
                    canChange = false
                    break
                }
                if(temp)
                {
                    if(key.substring(0, key.indexOf('_')) == parseInt(currentPage)+1)
                    {
                        db++
                    }
                }
            }
            if (!canChange || db < pages[parseInt(currentPage)+1].questions.length)
            {
                changeCanGo(false)
            } else {
                changeCanGo(true)
            }
            setCurrentPage(e => e+1)
        }
        if (currentPage == pagesKey[pagesKey.length-1] && canGoToNextPage)
        {
            sendAnswer({
                surveyId : surveyID,
                content : JSON.stringify(formState)
            })
            console.log('siker')
            setEnd(true)
        }
    }

    useEffect(()=>{}, [nextText])

    const [formState, useFormState] = useState(defaultState)

    if(end)
    {
        return(
            <FadeIn>
                <h1>Thank you for filling out this Survey!</h1>
            </FadeIn>
        )
    }

    if(cantDisplay)
    {
        return (
            <FadeIn>
                <h1>Invalid Format!</h1>
                <p>Please try another survey</p>
            </FadeIn>
        )
    }

    return (
        <FadeIn>
            <div className="mysurveydiv">
                {pagesKey === null && <h1>Loading...</h1>}
                {pagesKey !== null && 
                    <>
                    <h1>{questions.name}</h1>
                    <hr className="innerHR" />
                        <div className="verticalAlign">
                            {pagesKey.map((e,i) => (
                                <button key={i} className={`changePage ${classes[e]}`}  onClick={() => jumpToPageButtonClick(e)}>
                                    {pages[e].pageTitle}
                                </button>
                            ))}
                        </div>
                        <hr />
                        <Page 
                            pageNum={currentPage}
                            datas={pages[currentPage]} 
                            formState={formState}
                            useFormState={useFormState}
                            changeToSkip={changeCanGo}
                            actualSkipState={canGoToNextPage}
                        />
                        <button onClick={() => prevButtonClick()}><VscArrowLeft /> Prev</button>
                        <button onClick={() => nextButtonClick()}>{nextText} <VscArrowRight /></button>
                    </>
                }
            </div>
        </FadeIn>
    );
    
}
