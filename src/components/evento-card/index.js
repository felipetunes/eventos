import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import {db, storage} from '../../config/firebase';
import {ref, getDownloadURL} from "@firebase/storage";
import { Card } from 'react-bootstrap';
import {doc, setDoc } from "firebase/firestore";

import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes, favorite}){

const [urlImagem, setUrlImagem] = useState();
const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        setFavorited(favorite);
        getDownloadURL(ref(storage, `imagens/${img}`))
        .then(url => setUrlImagem(url))
    },[urlImagem]);

    function favoritar(){
        
        setFavorited(!favorited);

        const docRef = doc(db, "eventos", id);

        setDoc(docRef, {
            Favorite:favorited === true? false:true
    
        }, {merge: true}).then(()=> {
          
        }).catch(erro=> {
            alert(erro)
          
        });;
    }

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
                            <div className="rodape-items">
                                <div className="viewers">
                                    <FontAwesomeIcon icon={faEye} />
                                    <span className="visu">{visualizacoes ? visualizacoes:0}</span>
                                </div>
                                <div className="viewers" onClick={favoritar}>
                                    <FontAwesomeIcon icon={faStar} className={favorited? "starOn":""}/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </section>
        </>
    )
}

export default EventoCard;