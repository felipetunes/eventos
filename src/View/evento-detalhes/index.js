import React, {useState, useEffect} from "react";
import './evento-detalhes.css';
import {Link, useParams} from 'react-router-dom';
import { faPenSquare, faCalendar, faClock, faTicket } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {db, storage} from '../../config/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import {ref, getDownloadURL} from "@firebase/storage";
import { useSelector } from "react-redux";

function EventoDetalhes(){

const [evento, setEvento] = useState({});
const [urlImg, setUrlImg] = useState({});
const [carregando, setCarregando] = useState(1);
const usuarioLogado = useSelector(state => state.usuarioEmail);
const { id } = useParams();

const docRef = doc(db, "eventos", id);

   async function getDetails(){
        await getDoc(docRef).then(details => {
            setEvento(details.data());
            getDownloadURL(ref(storage, `imagens/${details.data().Foto}`)).then(url => setUrlImg(url), setCarregando(0));
            setDoc(docRef, {Visualizacoes: details.data().Visualizacoes + 1}, {merge: true});
        });
    }

    useEffect(() => {
        getDetails();
    }, []);

    return(
        <>
            <Navbar/>
            
            <div className="container-fluid">
                {
                carregando ? <div class="spinner-border text-danger mt-5" role="status"><span class="visually-hidden"></span></div>
                :
                <div>
                    <div className="row">
                        <img src={urlImg} className="img-banner" alt="Banner" />
                    </div>

                    <div className="row mt-5 d-flex justifify-content-around">
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <h5><strong>Tipo</strong></h5>
                            <FontAwesomeIcon icon={faTicket}/>
                            <span className="mt-3"> {evento.Tipo} </span>
                        </div>
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <h5><strong>Data</strong></h5>
                            <FontAwesomeIcon icon={faCalendar}/>
                            <span className="mt-3"> {evento.Data} </span>
                        </div>
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <h5><strong>Hora</strong></h5>
                            <FontAwesomeIcon icon={faClock}/>
                            <span className="mt-3"> {evento.Hora} </span>
                        </div>
                    </div>

                    <div className="row box-detalhes mt-5">
                        <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
                        <p className="text-justify p-3"> {evento.Detalhes} </p>
                    </div>

                    {
                        usuarioLogado === evento.Usuario ?
                                    <Link to={`/editarevento/${id}`} className="btn-editar"><FontAwesomeIcon icon={faPenSquare} className="imageEditBtn"/></Link>
                                    :''
                    }

                </div>
                }
            </div>
        </>
    )
}

export default EventoDetalhes;