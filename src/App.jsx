import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginPage} from './LoginPage.jsx';
import {RegistrationPage} from './RegistrationPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"/>
                <Route path="/Login" element={<LoginPage/>}/>
                <Route path="/Registration" element={<RegistrationPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
