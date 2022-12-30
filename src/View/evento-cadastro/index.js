import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {db, storage} from '../../config/firebase';
import {useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import {collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import {ref, uploadBytes} from "@firebase/storage";
import './evento-cadastro.css'
import {Button, Form, Alert} from 'react-bootstrap';

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
const [validated, setValidated] = useState(false);

const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  setValidated(true);
};

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

function update(){
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

function register(){

    setMsgTipo(null);
    setCarregando(1);
    
    if(!titulo || !tipo || !hora || !data)
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
            Favorite:false,
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

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label>Titulo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Titulo"
                        defaultValue={titulo && titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor escolha um título.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Tipo do Evento</Form.Label>
                    <Form.Select aria-label="Default select example" required onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
                        <option value={''}>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Por favor escolha um tipo.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrição do Evento:</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setDetalhes(e.target.value)} value={detalhes && detalhes}/>
                </Form.Group>
                <div className="row">
                <Form.Group className="col-6">
                    <Form.Label>Data:</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Data"
                            defaultValue={data && data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    <Form.Control.Feedback type="invalid">
                        Por favor escolha uma data.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-6">
                    <Form.Label>Hora:</Form.Label>
                        <Form.Control
                            required
                            type="time"
                            placeholder="Hora"
                            defaultValue={hora && hora}
                            onChange={(e) => setHora(e.target.value)}
                        />
                    <Form.Control.Feedback type="invalid">
                        Por favor escolha uma hora.
                    </Form.Control.Feedback>
                </Form.Group>
                </div>

                <Form.Group className="mb-2">
                    <Form.Label>Upload da imagem:</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            placeholder="Imagem"
                            onChange={(e) => setFotoNova(e.target.files[0])}
                        />
                    <Form.Control.Feedback type="invalid">
                        Por favor escolha uma imagem.
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="row">
                    {
                    carregando > 0 ? <div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden">Loading...</span></div>
                     : <Button type="submit"  onClick={id? update : register} className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"> {id ? "Atualizar Evento" : "Publicar Evento"}</Button>
                    }
                </div>
            </Form>
            <div className="msg-login text-center my-1">
                        {msgTipo === 'success' && <Alert variant="success" style={{visibility: "visible"}}> Cadastro realizado! </Alert>}
                        {msgTipo === 'erro' && <Alert variant="danger" style={{visibility: "visible"}}> Algo deu errado... </Alert>}
                        {msgTipo === 'nullField' && <Alert variant="danger" style={{visibility: "visible"}}> Preencha todos os campos! </Alert>}

            </div>
        </div>
        </>
    )
}

export default EventoCadastro;