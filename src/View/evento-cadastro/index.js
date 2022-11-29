import React, {useState, useEffect} from "react";
import {Link, Navigate} from 'react-router-dom';
import {db, storage} from '../../config/firebase';
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import {ref, uploadBytes} from "@firebase/storage";

function EventoCadastro(){

const [carregando, setCarregando] = useState();
const [msgTipo, setMsgTipo] = useState();
const [titulo, setTitulo] = useState();
const [tipo, setTipo] = useState();
const [detalhes, setDetalhes] = useState();
const [data, setData] = useState();
const [hora, setHora] = useState();
const [foto, setFoto] = useState();
const usuarioEmail = useSelector(state => state.usuarioEmail);


function cadastrar(){
    setMsgTipo(null);
    setCarregando(1);

    if(!foto || !titulo || !tipo || !hora || !data)
    {
        setMsgTipo('nullField');
        setCarregando(0);
    }
    
    const storageRef = ref(storage,`imagens/${foto.name}`);
    uploadBytes(storageRef, foto).then((snapshot) => {


        // Add a new document in collection "eventos"
        setDoc(doc(db, "eventos", "cadastro"), {
            Titulo: titulo,
            Tipo: tipo,
            //Description has validation because it is not mandatory
            Detalhes: detalhes? detalhes : "",
            Data: data,
            Hora: hora,
            Foto: foto.name,
            Usuario: usuarioEmail,
            Visualizacoes:0,
            Publico:1,
            criacao: new Date()
        }).then(()=> {
            setMsgTipo('success');
            setCarregando(0);
        }).catch(erro=> {
            setMsgTipo('erro');
            setCarregando(0);
        });
    });
}

    return(
        <>
        <Navbar/>
        <div className="mt-5 mx-5">
            <div className="row">
                <h3 className="mx-auto font-weight-bold">Novo Evento</h3>
            </div>

            <form>
                <div className="form-group">
                    <label>Titulo:</label>
                    <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Tipo do Evento</label>
                    <select className="form-control" onChange={(e) => setTipo(e.target.value)}>
                        <option>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descrição do Evento:</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3"/>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control"/>
                    </div>
                    <div className="col-6">
                        <label>Hora:</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control"/>
                    </div>
                </div>

                <div className="form-group">
                        <label>Upload da Foto:</label>
                        <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control"/>
                    </div>

                <div className="row">
                    {
                    carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="visually-hidden">Loading...</span></div>
                     : <button type="button" onClick={cadastrar} className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Publicar Evento</button>
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