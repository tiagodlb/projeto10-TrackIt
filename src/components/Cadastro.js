import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from  'react-loader-spinner'

export default function Cadastro(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [urlFoto, setUrlFoto] = useState("")
    const [desabilitar, setDesabilitar] = useState(false)
    const [cor, setCor] = useState("#FFFFFF")
    const [corInput, setCorInput] = useState("#DBDBDB")
    const [loading, setLoading] = useState("Cadastrar")
    const [opacity, setOpacity] = useState("1")

    async function submitarInfo(event){
        event.preventDefault();
        setDesabilitar(true)
        setCor("#AFAFAF")
        setCorInput("#D4D4D4")
        setOpacity(0.7)
        setLoading(<ThreeDots color="#ffffff" height={13} width={51} />)
        const promise = await axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",{
                email: `${email}`,
                name: `${nome}`,
                image: `${urlFoto}`,
                password: `${senha}`
            }).then((response) => {
            navigate("/")
            console.log(promise)
         }).catch(tratarErro)
    }

    function tratarErro(erro) {
        console.log("Status code: " + erro.status); // Ex: 404
        console.log("Mensagem de erro: " + erro.data); // Ex: Not Found
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
                            required={true}
                            disabled={desabilitar}
                            onChange={(e) => setSenha(e.target.value)}
                            cor = {cor}
                            corInput = {corInput}/>
                            <Input
                            type="text"
                            id="nome"
                            value={nome}
                            required={true}
                            placeholder="nome" 
                            onChange={(e) => setNome(e.target.value)}
                            disabled={desabilitar}
                            cor = {cor}
                            corInput = {corInput}/>
                            <Input
                            type="url"
                            id="foto"
                            value={urlFoto}
                            required={true}
                            placeholder="url" 
                            onChange={(e) => setUrlFoto(e.target.value)}
                            disabled={desabilitar}
                            cor = {cor}
                            corInput = {corInput}/>

                            <Button type="submit" opacity={opacity}>{loading}</Button>
                        </Form>
                    </div>
                    <Link to={"/"}>
                        <P>Já tem uma conta? Faça login!</P>
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