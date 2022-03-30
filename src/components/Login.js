import styled from "styled-components"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function submitarInfo(){

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
                        onChange={(e) => setEmail(e.target.value)}/>
                        <Input
                        type="password"
                        id="senha"
                        value={senha}
                        placeholder="senha"
                        onChange={(e) => setSenha(e.target.value)}/>
                        <Button type="submit" > Entrar </Button>
                    </Form>
                </div>
                <P>Não tem uma conta? Cadastre-se!</P>
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
    background: #FFFFFF;
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
        color: #DBDBDB;
        padding: 11px;
    }

`

const Button = styled.button`
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;

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