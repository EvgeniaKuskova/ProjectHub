import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginPage} from './LoginPage.jsx';
import {RegistrationPage} from './RegistrationPage.jsx';
import {MainPage} from "./MainPage.jsx";
import {CreatePage} from "./PageCreateAdvertisement.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/Login" element={<LoginPage/>}/>
                <Route path="/Registration" element={<RegistrationPage/>}/>
                <Route path="/Create" element={<CreatePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
