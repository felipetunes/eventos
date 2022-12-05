import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {db, storage} from '../../config/firebase';
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import {ref, uploadBytes} from "@firebase/storage";
import './evento-cadastro.css'

function EventoCadastro(){

const [carregando, setCarregando] = useState();
const [msgTipo, setMsgTipo] = useState();
const [titulo, setTitulo] = useState();
const [tipo, setTipo] = useState();
const [detalhes, setDetalhes] = useState();
const [data, setData] = useState();
const [hora, setHora] = useState();
const [fotoNova, setFotoNova] = useState();
const [fotoAtual, setFotoAtual] = useState();
const usuarioEmail = useSelector(state => state.usuarioEmail);
const { id } = useParams();



async function getDetails(){
    if(id){
        const docRef = doc(db, "eventos", id);

        await getDoc(docRef).then(res => {
        setTitulo(res.data().Titulo)
        setTipo(res.data().Tipo)
        setDetalhes(res.data().Detalhes)
        setData(res.data().Data)
        setHora(res.data().Hora)
        setFotoAtual(res.data().Foto)
        });
    }
}

useEffect(() => {
    getDetails();
}, []);

function atualizar(){
    const docRef = doc(db, "eventos", id);

    setMsgTipo(null);
    setCarregando(1);
    
    if(!titulo || !tipo || !hora || !data)
    {
        setMsgTipo('nullField');
        setCarregando(0);
    }

    if(fotoNova){
        const storageRef = ref(storage,`imagens/${fotoNova.name}`);
        uploadBytes(storageRef, fotoNova);
    }

    setDoc(docRef, {
        
        Titulo:titulo,
        //Description has validation because it is not mandatory
        Detalhes: detalhes? detalhes : "",
        Data: data,
        Hora: hora,
        Tipo: tipo,
        Foto: fotoNova ? fotoNova.name : fotoAtual

    }, {merge: true}).then(()=> {
        setMsgTipo('success');
        setCarregando(0);
    }).catch(erro=> {
        alert(erro)
        setMsgTipo('erro');
        setCarregando(0);
    });;
}

function cadastrar(){

    setMsgTipo(null);
    setCarregando(1);
    
    if(!fotoAtual || !titulo || !tipo || !hora || !data)
    {
        setMsgTipo('nullField');
        setCarregando(0);
    }
    
    const storageRef = ref(storage,`imagens/${fotoNova.name}`);
    uploadBytes(storageRef, fotoNova).then((snapshot) => {

        // Add a new document in collection "eventos"
        addDoc(collection(db, "eventos"), {
            Titulo: titulo,
            Tipo: tipo,
            //Description has validation because it is not mandatory
            Detalhes: detalhes? detalhes : "",
            Data: data,
            Hora: hora,
            Foto: fotoNova.name,
            Usuario: usuarioEmail,
            Visualizacoes:0,
            Publico:1,
            criacao: new Date()
        }).then(()=> {
            setMsgTipo('success');
            setCarregando(0);
        }).catch(erro=> {
            alert(erro)
            setMsgTipo('erro');
            setCarregando(0);
        });
    });
}

    return(
        <>
        <Navbar/>
        <div className="mt-5 mx-5 screen mx-auto">
            <div className="row">
                <h3 className="mx-auto font-weight-bold">{id ? "Atualizar Evento" : "Novo Evento"}</h3>
            </div>

            <form>
                <div className="form-group">
                    <label>Titulo:</label>
                    <input type="text" className="form-control" value={titulo && titulo} onChange={(e) => setTitulo(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Tipo do Evento</label>
                    <select className="form-control" onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
                        <option>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descrição do Evento:</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} value={detalhes && detalhes} className="form-control" rows="3"/>
                </div>

                <div className="form-group row">
                    <div className="col-5">
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data}/>
                    </div>
                    <div className="col-5">
                        <label>Hora:</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora}/>
                    </div>
                </div>

                <div className="form-group">
                        <label>Upload da Foto:</label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>
                    </div>

                <div className="row">
                    {
                    carregando > 0 ? <div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden">Loading...</span></div>
                     : <button type="button"  onClick={id? atualizar : cadastrar} className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"> {id ? "Atualizar Evento" : "Publicar Evento"}</button>
                    }
                </div>
            </form>
            <div className="msg-login text-center my-5">
                        {msgTipo === 'success' && <span style={{visibility: "visible"}}> Cadastro realizado! </span>}
                        {msgTipo === 'erro' && <span style={{visibility: "visible"}}> Algo deu errado... </span>}
                        {msgTipo === 'nullField' && <span style={{visibility: "visible"}}> Preencha todos os campos! </span>}
            </div>
        </div>
        </>
    )
}

export default EventoCadastro;