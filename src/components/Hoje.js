import styled from "styled-components"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ConteudoHoje from "./ConteudoHoje";
import dayjs from "dayjs"
import ptBr from "dayjs/locale/pt-br"

export default function Hoje(){
    const navigate = useNavigate();
    const {infoLogin, setInfoLogin} = useContext(UserContext)
    const {percentage, setPercentage} = useContext(UserContext)
    return(
        <>
            <Header>
                <H1>TrackIt</H1>
                <FotoUsuario src={infoLogin.image}></FotoUsuario>
            </Header>
            <Main>
                <ContainerCriar>
                            <ConteudoHoje />
                </ContainerCriar>
            </Main>
            <Footer>
                <Link to={"/habitos"}>
                    <P>Hábitos</P>
                </Link>
                <Link to={"/hoje"}>
                    <Circle>
                        <CircularProgressbar
                        value={percentage}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })} />
                    </Circle>
                </Link>
                <Link to={"/historico"}>
                    <P>Histórico</P>
                </Link>
            </Footer>
        </>
    )
}

const Header = styled.header`
    position: fixed;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`
const H1 = styled.h1`
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    margin-left: 18px;
    /* identical to box height */

    color: #FFFFFF;
`

const FotoUsuario = styled.img`
    width: 51px;
    height: 51px;
    left: 306px;
    top: 9px;
    margin-right: 18px;
    background: url(image.png);
    border-radius: 98.5px;
`

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
`

const Footer = styled.footer`
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: #FFFFFF;
`

const P = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;

    color: #52B6FF;
`

const Circle = styled.div`
    width: 85px;
    height: 83px;
    margin-bottom: 20px;
`

const ContainerCriar = styled.div`
    width: calc(100% - 36px);
    height: 425px;
    position: absolute;
    display:flex;
    flex-wrap: wrap;
    top: calc(67px + 28px);
    left: 18px;
    overflow: scroll;
    ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    ::-webkit-scrollbar {
        display: none;
      }

`