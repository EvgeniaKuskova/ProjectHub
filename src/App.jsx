import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginPage} from './LoginPage.jsx';
import {RegistrationPage} from './RegistrationPage.jsx';
import {MainPage} from "./MainPage.jsx";
import {CreatePage} from "./PageCreateAdvertisement.jsx";
import {PersonalPage} from './PersonalPage.jsx';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Публичные маршруты */}
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Registration" element={<RegistrationPage />} />

                {/* Защищённые маршруты */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/User" element={<PersonalPage />} />
                    <Route path='/Create' element={<CreatePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
