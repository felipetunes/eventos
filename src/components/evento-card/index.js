import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {db, storage} from '../../config/firebase';
import {ref, getDownloadURL} from "@firebase/storage";

import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        getDownloadURL(ref(storage, `imagens/${img}`))
        .then(url => setUrlImagem(url))
    },[urlImagem]);

    return(
        <div className="col-md-3 col-sm-6">
            <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body p-2">
                <h5 className="tituloEvento">{titulo}</h5>
                <p className="card-text text-justify">{detalhes}</p>

                <div className="rodape-card">
                    <div className="">
                        <Link to={'/eventodetalhes/' + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>
                    <div className="viewers">
                        <FontAwesomeIcon icon={faEye} />
                        <span>{visualizacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;