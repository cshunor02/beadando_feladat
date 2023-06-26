import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from './views/main/MainPage';
import Layout from './views/layout/Layout';
import { Login } from './views/logsignin/Login';
import { Signup } from './views/logsignin/Signup';
import FadeIn from 'react-fade-in';
import { NewSurvey } from './views/surveys/NewSurvey';
import { MySurveys } from './views/surveys/Mysurveys';
import { NotFound } from './views/errorPages/NotFound';
import { Profile } from './views/profile/Profile';
import { OneSurvey } from './views/surveys/OneSurvey';
import { Answers } from './views/answers/Answers';

function App() {
    return(
        <FadeIn>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="newsurvey" element={<NewSurvey />} />
                    <Route path="surveys" element={<MySurveys />} />
                    <Route path="survey/:hash" element={<OneSurvey />} />
                    <Route path="answers/:whichSurvey" element={<Answers />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="404" element={<NotFound />} />
                    <Route path="403" element={<Login />} />
                    <Route path="*" element={<Navigate to="404" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </FadeIn>
    )
}

export default App
