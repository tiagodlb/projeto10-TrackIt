import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs"
import ptBr from "dayjs/locale/pt-br"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner'
import axios from "axios";

export default function ConteudoHoje(){
    const {infoLogin, setInfoLogin} = useContext(UserContext)
    const {percentage, setPercentage} = useContext(UserContext);
    const [habitosHoje, setHabitosHoje] = useState([])
    const [hoje, setHoje] = useState()
    const [progresso, setProgresso] = useState([])
    const [feito, setFeito] = useState([])

    if(progresso.length !== 0){
        habitosHoje.forEach((habito) => {
            if(habito.done === true && feito.includes(habito.id) === false){
                setFeito([...feito, habito.id])
            }
        })
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

    function habitoFeito(){

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