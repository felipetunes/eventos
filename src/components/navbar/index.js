import React, {useState} from "react";
import './navbar.css';
import {Link, useParams} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

function Navbar(){

  const dispatch = useDispatch();
  const photoURL = useSelector(state => state.photoURL);
  const displayName = useSelector(state => state.displayName);
  const [cardLogin, setCardLogin] = useState("cardLoginInvisible");
  const [statusMenu, setStatusOpenMenu] = useState(false);
  const { id } = useParams();
  
  const changeStyleOn = () => {
    if(statusMenu == false)
    setCardLogin("cardLoginVisible");
  };

  const changeStyleOff = () => {
    setCardLogin("cardLoginInvisible");
  };

  const statusOpenMenu = () => {
    setStatusOpenMenu(statusMenu == false ? true : false);
  };

    return(
      <>
        <nav className="navbar  bg-light">
          <div className="container-fluid">
          {useSelector(state => state.usuarioLogado) > 0 ?
                      <>
          <button className="navbar-toggler" onClick={statusOpenMenu} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
        </button>
        </>:<></>
}
            <a className="navbar-brand"><Link className="nav-link" to="/">Eventos</Link></a>
            {
            <>
              <div className="accountUser">
                  <h6 className="nameUser">{displayName}</h6>
                  <img src={photoURL} referrerpolicy="no-referrer" onMouseEnter={changeStyleOn} onMouseOut={changeStyleOff} className="userPhoto"/>
              </div>
            </>
            }
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            {
                useSelector(state => state.usuarioLogado) > 0 ?
                      <>
                        <li className="nav-item"><Link className="nav-link" to="/">Todos os Eventos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/eventos/meus">Meus Eventos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/eventocadastro">Publicar Evento</Link></li>
                      </>:<></> 
              }
            </ul>
          </div>
 
        </div>
      </nav>
      <nav className="bg-light" >
          <div className={cardLogin} onMouseEnter={changeStyleOn} onMouseOut={changeStyleOff}>
              <ul className="navbar-nav">
              {
                useSelector(state => state.usuarioLogado) > 0 ?
                <>
                    <li className="nav-item"><Link to={'/novousuario/' + id} className="nav-link">Minha Conta</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/' onClick={()=>dispatch({type: 'LOG_OUT'})}>Sair</Link></li>
                </>
                :
                <>
                    <li className="nav-item"><Link to='/login' className="nav-link">Entrar</Link></li>
                </>
              }
            </ul>
        </div>
      </nav>
      </>
    )
}

export default Navbar;