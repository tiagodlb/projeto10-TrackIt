import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from  'react-loader-spinner'
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function Login(){
    const {setInfoLogin} = useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [desabilitar, setDesabilitar] = useState(false)
    const [cor, setCor] = useState("#FFFFFF")
    const [corInput, setCorInput] = useState("#DBDBDB")
    const [loading, setLoading] = useState("Entrar")
    const [opacity, setOpacity] = useState("1")

    async function submitarInfo(event){
        event.preventDefault();
        setDesabilitar(true)
        setCor("#AFAFAF")
        setCorInput("#D4D4D4")
        setOpacity(0.7)
        setLoading(<ThreeDots color="#ffffff" height={13} width={51} />)
        await axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",{
            email,
            password: `${senha}`
        }).then((response) => {
            const {data} = response
            setInfoLogin({
                id: data.id,
                name: data.name,
                image: data.image,
                email: data.email,
                senha: data.password,
                token: data.token
            })
            navigate("/hoje")
        }).catch(tratarErro)
    }

    function tratarErro(erro) {
        alert("Poxa amigo, deu xabu :(\nInsere os dados de novo ai")
        setDesabilitar(false)
        setCor("#FFFFFF")
        setCorInput("#DBDBDB")
        setOpacity(1)
        setLoading("Entrar")
        console.log(erro)
    }

    return(
        <>
            <Main>
                <Img src="assets/logo.png" alt="logo" />
                <div>
                    <Form onSubmit={submitarInfo}>
                        <Input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        disabled={desabilitar}
                        cor = {cor}
                        corInput = {corInput}/>
                        <Input
                        type="password"
                        id="senha"
                        value={senha}
                        placeholder="senha"
                        onChange={(e) => setSenha(e.target.value)}
                        required={true}
                        disabled={desabilitar}
                        cor = {cor}
                        corInput = {corInput}/>
                        <Button type="submit" opacity={opacity}>{loading}</Button>
                    </Form>
                </div>
                <Link to={"/cadastro"}>
                    <P>Não tem uma conta? Cadastre-se!</P>
                </Link>
            </Main>
        </>
    )
}

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`
const Img = styled.img`
    width: calc(180px * 1.1);
    height: calc(178.38px * 1.1);
    margin-bottom: 26px;    
`
const Form = styled.form`
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    display:flex;
    background: ${(props) => props.cor};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom:6px;
    /* Texto */

    ::placeholder{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: ${(props) => props.corInput};
        padding: 11px;
    }

`

const Button = styled.button`
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: 0px;
    display:flex;
    align-items:center;
    justify-content: center;
    opacity: ${(props) => props.opacity};

    /* Texto */

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
`

const P = styled.p`
    margin-top: 25px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`