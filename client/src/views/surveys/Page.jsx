import FadeIn from 'react-fade-in';
import { useEffect } from 'react';

const Field = ({ changeToSkip, formState, name, value, handleInput, ...attr}) => {
    return (
        <div>
            <input className="specialInput" key={name} type="text" value={value} name={name} onChange={handleInput} onInput={handleInput} placeholder='...' {...attr} />
        </div>
      );
}

export function Page({ pageNum, datas, formState, useFormState, changeToSkip, actualSkipState })
{
    var canChange = true
    let db = 0
    const handleInput = (e) => {
        useFormState({...formState, [e.target.name] : e.target.value})
    }

    function checkSkipState() 
    {
        for (let key in formState) 
        {
            let temp = formState.hasOwnProperty(key)
            if (temp && formState[key] == '') 
            {
                canChange = false
                break
            }
            if(temp)
            {
                if(key.substring(0, key.indexOf('_')) == pageNum)
                {
                    db++
                }
            }
        }
        if (!canChange || db < datas.questions.length)
        {
            changeToSkip(false)
        } else {
            changeToSkip(true)
        }
        if(canChange && db === datas.questions.length && !actualSkipState)
        {
            changeToSkip(true)
        }
        db = 0
        canChange = false
    }

    useEffect(() => {
        checkSkipState()
    }, [formState])

    return (
        <FadeIn>
            <div key="divKey">
                {datas?.questions.map((e,i) => (
                    <div key={"div_" + i}>
                        <h3 key={"title_" + i}>{e}</h3>
                        <Field changeToSkip={changeToSkip} formState={formState} key={i} name={pageNum + "_" + i} value={formState[pageNum + "_" + i] === undefined ? "" : formState[pageNum + "_" + i]} handleInput={handleInput} required/>
                    </div>
                ))}
                <br />
            </div>
        </FadeIn>
    );
    
}
