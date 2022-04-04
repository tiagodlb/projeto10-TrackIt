import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs"
import ptBr from "dayjs/locale/pt-br"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner'
import axios from "axios";

export default function ConteudoHoje(){
    const {infoLogin} = useContext(UserContext)
    const {percentage, setPercentage} = useContext(UserContext);
    const [habitosHoje, setHabitosHoje] = useState([])
    const [hoje, setHoje] = useState()
    const [progresso, setProgresso] = useState([])
    const [feito, setFeito] = useState([])

    if(habitosHoje.length !== 0){
        habitosHoje.forEach((habito) => {
            if(habito.done === true && feito.includes(habito.id) === false){
                setFeito([...feito, habito.id])
            }
        })
        setPercentage((feito.length*100) / progresso.length)
    }

    useEffect(() => {
        dayjs.locale(ptBr)
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        let hojeindex = dayjs().day();
        setHoje(`${diasSemana[hojeindex]}, ${dayjs().format('DD/MM')}`)
    }, []
    )

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(URL,config).then(
            (response) => {
                setHabitosHoje(response.data)
            }
        ).catch(tratarErro)

    },[])

    function tratarErro(erro) {
        alert("Deu ruim! Por favor, insira os dados novamente");
        console.log(erro)
    }

    function habitoFeito(e){
        const item = e.target.id
        if(feito.includes(Number(item))){
            const config = {
                headers: {
                    Authorization: `Bearer ${infoLogin.token}`
                }
            }
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${item}/uncheck`,{},config).then(
                () => {
                    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config).then(
                        () => (
                            (response) => {
                                setHabitosHoje(response.data)
                                setFeito([])
                            }
                        )
                    )
                }
            )
        }
        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${item}/check`,{},config).then(
            () => {
                axios.get(
                    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config
                ).then(
                    (response) => {setHabitosHoje(response.data)}
                )
            }
        )
    }

    function colocarConteudo(){
        if(habitosHoje.length === 0) return("")
        else{
            return(
                (habitosHoje.map(
                    (habito, index) => (
                        <Habito key={index}>
                            <P>{habito.name}</P>
                            <div>
                                <Label verde={habito.currentSequence !== 0}>
                                    <P2>Sequência atual: <span>{habito.currentSequence} {habito.currentSequence === 1 ? ('dia') : ('dias')}</span></P2>
                                </Label>
                                <Label verde={habito.currentSequence === habito.highestSequence && habito.highestSequence > 0}>
                                    <P2>Seu recorde: <span>{habito.highestSequence} {habito.highestSequence === 1 ? ('dia') : ('dias')}</span></P2>
                                </Label>
                            </div>
                            <Confirmar id={habito.id} onClick={(e) => habitoFeito(e)} Feito={habito.done}>
                                <ion-icon name="checkmark-outline" id={habito.id}></ion-icon>
                            </Confirmar>
                        </Habito>
                    )
                )
            ))
        }
    }
    return(
        <>
            <Container>
                <H1>{hoje}</H1>
                <Progresso>
                    {percentage !== 0 ?
                        (`${percentage.toFixed()}% dos hábitos concluídos`)
                        :
                        ("Nenhum hábito concluído ainda")
                    }
                </Progresso>
            </Container>
            <Container2>
                {colocarConteudo()}
            </Container2>
        </>
    )
}

const H1 = styled.h1`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`
const Container = styled.div`

`

const Progresso = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
`

const Habito = styled.div`
    position: absolute;
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
`

const P = styled.p`
    margin-top: 10px;
    margin-left: 10px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
`

const P2 = styled.p`
    margin-top: 7px;
    margin-left: 10px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
`

const Confirmar = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    width: 70px;
    height: 70px;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: ${props => props.Feito === true ? ("#8FC549") : ("#EBEBEB")};
    ion-icon{
        font-size: 70px;
        color: white;
    }
    margin-left: 250px;
    margin-top: -69px;
    `

const Container2 = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    background-color:red;
    margin-bottom: 300px;
`

const Label = styled.label`
    font-style: normal;
    font-weight: normal;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666 ;
    span{
        color:${props => props.verde ? ('#8FC549') : ('#666666')}
    }
`