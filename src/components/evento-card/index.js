import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {db, storage} from '../../config/firebase';
import {ref, getDownloadURL} from "@firebase/storage";
import { Card, Placeholder, Col, Row } from 'react-bootstrap';


import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        getDownloadURL(ref(storage, `imagens/${img}`))
        .then(url => setUrlImagem(url))
    },[urlImagem]);

    return(
        <>
            <section className="col-md-3 col-sm-4">
                <Card className="cbody">
                    <Card.Img src={urlImagem} variant="top" className="card-img-top img-cartao"/>
                    <Card.Body>
                        <div className="texts-card">
                            <Card.Title className="tituloEvento">{titulo}</Card.Title>
                            <Card.Text className="card-text text-justify"> {detalhes} </Card.Text>
                        </div>
                        <div className="rodape-card">
                            <Link to={'/eventodetalhes/' + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                            <div className="viewers">
                                <FontAwesomeIcon icon={faEye} />
                                <span className="visu">{visualizacoes}</span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </section>
        </>
    )
}

export default EventoCard;