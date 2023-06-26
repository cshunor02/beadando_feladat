import { useEffect, useState } from "react";
import FadeIn from 'react-fade-in';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { loggedIn } from "../../state/authenticationSlice";
import { useCreateSurveyMutation, useGetOneSurveyQuery, useModifySurveyMutation } from "../../state/surveyApiSlice";

export function NewSurvey() 
{
    const isUserLoggedIn = useSelector(loggedIn)
    const navigate = useNavigate()
    const [errors, addError] = useState([])
    const [createSurvey, responseData] = useCreateSurveyMutation()
    const [modifySurvey, responses] = useModifySurveyMutation()

    useEffect(() => {
        if(!isUserLoggedIn)
        {
            navigate("/login")
        }
    }, [isUserLoggedIn]);

    const [textareaText, setTextareaText] = useState("")

    function onInput(e)
    {
        setTextareaText(e.target.value)
    }

    async function checkAndSubmit()
    {
        const text = textareaText.split("\n")
        var errorMsgs = [];

        let errorMsg = 'Survey cannot be empty!'
        if (textareaText.length === 0)
        {
            errorMsgs.push(errorMsg)
        }
        errorMsg = 'Survey must have a Title!'
        if (text[0] === '')
        {
            errorMsgs.push(errorMsg)
        }
        errorMsg = 'Syntax error: Between every Pages, there must be an empty line!'
        if(text[1] !== '')
        {
            errorMsgs.push(errorMsg)
        }
        errorMsg = 'Survey must contain at least one Page!'
        if(text.length < 3)
        {
            errorMsgs.push(errorMsg);
        }

        let pages = []
        let db = 0
        errorMsg = 'There must be at least one Question on every Page!'
        for(let i = 2; i < text.length; i++)
        {
            var questionaire = {}
            questionaire.pageNumber = db+1;
            if(text[i] === '')
            {
                errorMsgs.push('Page must have a Title!')
                break
            }
            questionaire.pageTitle = text[i];
            questionaire.questions = [];
            let j = i+1
            while(text[j] !== '' && j < text.length)
            {
                questionaire.questions.push(text[j])
                j++
            }
            if (j === i+1) //There was no question on the page
            {
                errorMsgs.push(errorMsg)
                break
            }
            pages[db] = questionaire
            db++
            i = j
        }

        addError(errorMsgs)
 
        if(errorMsgs.length !== 0) return

        let send = pages.reduce((e, page) => {
            e[page.pageNumber] = {
              pageTitle: page.pageTitle,
              questions: page.questions,
            };
            return e;
        }, {});

        if (title === "Add new")
        {
            createSurvey({
                name : text[0],
                content : JSON.stringify(send)
            })
        } else {
            modifySurvey([newId, {
                name : text[0],
                content : JSON.stringify(send)
            }])
        }

        setTextareaText("")
        navigate("/surveys")
    }

    const { state } = useLocation();

    var title = "Add new"
    var buttonTitle = "ADD"
    var temp = ""
    var newId = -1
    var fatalError = false

    if(state !== null)
    {
        const { hash } = state
        const editData = useGetOneSurveyQuery(hash)

        if(editData.data)
        {
            const { id, content : input, name } = editData.data.data[0];
            title = input === undefined ? "Add new" : "Edit"
            buttonTitle = input === undefined ? "ADD" : "EDIT"
            newId = id
            if (title === "Edit")
            {
                temp = name + "\n\n"
                try {
                    var obj = JSON.parse(input)
                    var keys = Object.keys(obj)
                    for(let i = 0; i < keys.length; i++)
                    {
                        var innerKeys = Object.keys(obj[keys[i]])
                        temp += obj[keys[i]][innerKeys[0]] + "\n"

                        var questionsFromObj = obj[keys[i]][innerKeys[1]]
                        for(let j = 0; j < questionsFromObj.length; j++)
                        {
                            temp += questionsFromObj[j] + "\n"
                        }
                        temp += "\n"
                    }
                } catch (e) {
                    fatalError = true
                }
            }
            temp = temp.replace(/\n+$/, "")
        }
    }

    useEffect(() => {
        setTextareaText(temp)
    }, [temp]);

    if(fatalError)
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
            <div className="newsurveydiv">
                <h1>{title} Survey</h1>
                <hr />
                <textarea placeholder="Survey

Page 1
Question 1
Question 2

Page 2
Question 3
Question 4

Page 3
Question 5
Question 6" onInput={(e) => onInput(e)} value={textareaText}>
                </textarea>
                <button onClick={() => checkAndSubmit()}>{buttonTitle}</button>
                <ul>
                    {errors.length !== 0 && errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            </div>
        </FadeIn>
    );
}
