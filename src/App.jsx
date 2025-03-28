import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginPage} from './LoginPage.jsx';
import {RegistrationPage} from './RegistrationPage.jsx';
import {MainPage} from "./MainPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/Login" element={<LoginPage/>}/>
                <Route path="/Registration" element={<RegistrationPage/>}/>
                <Route path="/Main" element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
