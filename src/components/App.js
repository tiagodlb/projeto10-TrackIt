import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import Habitos from "./Habitos.js"
import Historico from "./Historico"
import GlobalStyle from "../globalstyles";
import UserContext from "../contexts/UserContext";

export default function App(){
    const [infoLogin, setInfoLogin] = useState(null)
    const [percentage, setPercentage] = useState(0)
    const [carregar, setCarregar] = useState(false)
    const [habitoNovo, setHabitoNovo] = useState(false)
    return(
            <UserContext.Provider value={{ infoLogin, setInfoLogin, percentage, setPercentage, carregar, setCarregar, habitoNovo,setHabitoNovo }}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/cadastro" element={<Cadastro />}/>
                        <Route path="/hoje" element={<Hoje />} />
                        <Route path="/habitos" element={<Habitos />} />
                        <Route path="/historico" element={<Historico />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
    )
}