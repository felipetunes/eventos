import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import './evento-card.css';

function EventoCard({ titulo, detalhes, visualizacoes}){
    return(
        <div className="col-md-3 col-sm-6">
            <img src="https://via.placeholder.com/100x50" className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body p-2">
                <h5>{titulo}</h5>
                <p className="card-text text-justify">
                {detalhes}
                </p>

                <div className="column rodape-card d-flex align-items-center">
                    <div className="">
                        <Link to='/' className="btn btn-sm btn-detalhes">+ detalhes</Link>
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