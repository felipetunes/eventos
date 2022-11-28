import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import './evento-card.css';

function EventoCard(){
    return(
        <div className="col-md-2 col-sm-12">
            <img src="https://via.placeholder.com/100x50" className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body p-2">
                <h5>Título do Evento</h5>
                <p className="card-text text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac ex fringilla urna ultrices faucibus. Donec sodales diam et libero vestibulum, posuere euismod purus lobortis. Duis consequat ultricies justo, quis dictum orci sagittis et. Integer lacinia id erat nec vulputate. Maecenas dui tortor, suscipit ut congue ut, iaculis id tortor. Maecenas facilisis arcu ut commodo mollis. Suspendisse porttitor, odio id mollis ullamcorper, risus turpis eleifend mauris, ut vestibulum erat dui eget lectus. Pellentesque cursus elit vitae justo dictum, sit amet sollicitudin mauris imperdiet. Sed et elit non lacus vehicula tincidunt vitae ac justo. Curabitur sit amet mi a magna suscipit ornare non non leo. Quisque malesuada facilisis turpis eget ullamcorper. Maecenas nibh sapien, imperdiet id imperdiet ut, gravida in metus. Pellentesque pretium arcu nec sem pellentesque, vitae finibus ex ornare.
                </p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to='/' className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>

                    <div className="col-6 text-right">
                        <FontAwesomeIcon icon={faEye} />
                        <span>2019</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;