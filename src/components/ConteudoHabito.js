import UserContext from "../contexts/UserContext";
import axios from "axios"
import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner'

export default function ConteudoHabito(){
    const {infoLogin, setInfoLogin} = useContext(UserContext);
    const {percentage, setPercentage} = useContext(UserContext);
    const [titulo, setTitulo] = useState("");
    const [habitos,setHabitos] = useState([]);
    const [diasEscolhidos, setDiasEscolhidos] = useState([])
    const dias = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const {carregar, setCarregar} = useContext(UserContext)
    const {habitoNovo, setHabitoNovo} = useContext(UserContext)
    /* Desabilitar e visual */
    const [desabilitar, setDesabilitar] = useState(false)
    const [cor, setCor] = useState("#FFFFFF")
    const [corInput, setCorInput] = useState("#DBDBDB")
    const [loading, setLoading] = useState("Salvar")
    const [opacity, setOpacity] = useState("1")
    const [corDia, setCorDia] = useState("#FFFFFF")
    const [corDiaInput, setCorDiaInput] = useState("#DBDBDB")
    useEffect(
            () => {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${infoLogin.token}`
                        }
                    }

                    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
                    const promise = axios.get(URL, config);
                    promise.then(
                        (response) => {
                        setHabitos(response.data)
                    }).catch(tratarErro)
                },[]
        )

    function tratarErro(erro) {
        alert("Deu ruim! Por favor, insira os dados novamente");
        console.log(erro)
    }

    function escolherDias(event){
        event.preventDefault();
        const dia = event.target.id

        if (diasEscolhidos.includes(parseInt(dia))){
            setDiasEscolhidos(diasEscolhidos.filter((index) => ( index !== parseInt(dia))))
            return;
        }
        setDiasEscolhidos([...diasEscolhidos,parseInt(diasEscolhidos)])
        setCorDia("#CFCFCF")
        setCorDiaInput("#FFFFFF")
    }

    function submitarInfo2(event){
        event.preventDefault();
        setDesabilitar(true)
        setCor("#AFAFAF")
        setCorInput("#D4D4D4")
        setOpacity(0.7)
        setLoading(<ThreeDots color="#ffffff" height={13} width={51} />)
        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        setTimeout(() => ( axios.post(URL,{
            name: titulo, days: [1,3,5]
        }, config).then(
            (response) => {
                setTitulo("")
                setDiasEscolhidos([])
                setHabitos([...habitos, response.data])
                setHabitoNovo(false)
                setDesabilitar(false)
                setCor("#FFFFFF")
                setCorInput("#DBDBDB")
                setOpacity(1)
                setLoading("Salvar")
            }
        ).catch(tratarErro)
        ))
    }

    function deletarHabito(IdHabito,index,event){
        event.preventDefault()
        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${IdHabito}`

        if(window.confirm("Você quer realmente deletar esse hábito?") === true){
            const promise = axios.delete(URL,config)
            habitos.splice(index,1)
            promise.then(()=> setHabitos([...habitos]))
            setPercentage(0)
        }
    }


    if(habitos.length === 0){
        return(
            <P2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</P2>
        )
    }
    if(carregar && habitoNovo){
        return(
            <div>
                <form onSubmit={submitarInfo2}>
                        <Container2>
                            <Div>
                            <Input
                                type="text"
                                id="nome"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                                desabilitar={desabilitar}
                                cor={cor}
                                corInput={corInput}
                                placeholder="nome" 
                                disabled={false}
                                />
                            </Div>
                            <Container3>
                                {dias.map(
                                    (dia, index) =>(
                                        <Span2 corDia={corDia} corDiaInput={corDiaInput} onClick={(event) => escolherDias(event)} id={index} key={index}>
                                            {dia}
                                        </Span2>
                                    )
                                )}
                            </Container3>
                            <Container4>
                                <P onClick={() => setHabitoNovo(false)}>Cancelar</P>
                                <Botao2 type="submit" opacity={opacity}>{loading}</Botao2>
                            </Container4>
                        </Container2>
                    </form>
                </div>
            )
        }
        else{
            return(
                (habitos.map(
                    (habito, index) => (
                        <Container2 key={habito.id}>
                            <Div>
                                <P3>{habito.name}</P3>
                                <ion-icon name="trash-outline" onClick={(e) => deletarHabito(habitos.id, index,e)}></ion-icon>
                            </Div>
                            <Container3>
                                {dias.map(
                                    (dia, index) =>(
                                        <Span2 corDia={corDia} corDiaInput={corDiaInput} onClick={(event) => escolherDias(event)} id={index} key={index}>
                                            {dia}
                                        </Span2>
                                    )
                                )}
                            </Container3>
                        </Container2>
                    )
                ))
            )
        }
    }



const P = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    color: #52B6FF;
`

const ContainerCriar = styled.div`
    width: calc(100% - 36px);
    position: absolute;
    display:flex;
    flex-wrap: wrap;
    top: calc(67px + 38px + 28px + 25px);
    left: 18px;
`

const Container = styled.div`
    width: calc(100% - 18*2px);
    heigth: 100%;
    position: absolute;
    top: calc(67px + 28px);
    display: flex;
    justify-content: space-between;
    margin-left: 18px;
`
const Span = styled.span`
    margin-bottom: 5px;
`
const Container2 = styled.div`
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`

const P3 = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin-left: 14px;
    margin-top: 9px;
`
const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content:space-between;
    margin-left-14px;

    ion-icon {
        font-size: 17px;
        margin-top: 11px;
        margin-right: 10px;
    }
`

const Container3 = styled.div`
    width: calc(34px * 7);
    backgroud-color: green;
    display:flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 14px;
`

const Span2 = styled.button`
    width: 30px;
    height: 30px;
    display:flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.corDia};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-right: 4px;
    margin-bottom: 15px;
    color: ${(props) => props.corDiaInput}
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    background: ${(props) => props.cor};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 18px;
    
    ::placeholder{
        font-size: 19.976px;
        color: ${(props) => props.corInput};
        padding: 11px;
    }
`

const Botao2 = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: 0px;
    font-size: 15.976px;
    text-align: center;
    color: #FFFFFF;
    opacity: ${(props) => props.opacity};

`

const Container4 = styled.div`
    width: 100%;
    margin-top: 27px;
    display:flex;
    justify-content: flex-end;

    p{
        margin-right: 23px;
        margin-top: 7.25px;
    }

    button{
        margin-bottom: 14px;
        margin-right: 16px;
    }
`

const P2 = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    top: calc(67px + 38px + 28px + 25px);
    left: 18px;
`