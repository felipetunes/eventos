import React from "react";
import './navbar.css';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

function Navbar(){

  const dispatch = useDispatch();

    return(
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Eventos</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
         
              {
                useSelector(state => state.usuarioLogado) > 0 ?
                      <>
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="eventocadastro">Publicar Evento</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="">Meus Eventos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/' onClick={()=>dispatch({type: 'LOG_OUT'})}>Sair</Link></li>
                      </>
                      :
                      <>
                        <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>
                        <li className="nav-item"><Link to='/novousuario' className="nav-link">Cadastrar</Link></li>
                      </>      
              }
          
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;