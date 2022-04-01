import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import GlobalStyle from "../globalstyles";
export default function App(){
    const [infoLogin, setInfoLogin] = useState(null)
    return(
       <StrictMode>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login finalizarLogin={
                        (infoLogin) => setInfoLogin(infoLogin)}/>}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                    <Route path="/habitos" element={<Habitos infoLogin={infoLogin}/>} />
                </Routes>
            </BrowserRouter>
       </StrictMode> 
    )
}