import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import GlobalStyle from "../globalstyles";
export default function App(){
    return(
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/cadastro" element={<Cadastro />}/>
            </Routes>
        </BrowserRouter>
    )
}