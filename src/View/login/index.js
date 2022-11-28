import React, {useState, useEffect} from "react";
import './login.css';
import {Link, Navigate} from 'react-router-dom';
import firebase from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../../components/navbar";
import {useSelector, useDispatch} from 'react-redux';

function Login(){

    const[email, setEmail] = useState();
    const[senha, setSenha] = useState();
    const[msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    const dispatch = useDispatch();

    function logar(){

        setCarregando(1);
        setMsgTipo(null);

        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          // Signed in
          setCarregando(0);
          setMsgTipo('success')
          dispatch({type: 'LOG_IN', usuarioEmail: email});
          // ...
        })
        .catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')

           switch(erro.code)
           {
                case 'auth/wrong-password':
                    setMsg('A senha usada está incorreta!');
                    break;
                case 'auth/invalid-email':
                        setMsg('O formato do seu email é inválido');
                        break;
                default:
                    setMsg('Não foi possivel entrar na conta. Tente novamente mais tarde!');
                    break;
           }
        });
    }

    return(
        <>
        <Navbar/>
            <div className="login-content d-flex align-items-center">

                {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null}
                
                <form className="form-signin mx-auto text-center">
                    <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                    </div>
                
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email"/>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha"/>
                
                    {
                        carregando ? <div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
                            :  <button className="btn btn-lg btn-block btn-login" type="button" onClick={logar}>Logar</button>
                    }

                    <div className="msg-login text-white text-center my-5">
                        {msgTipo === 'success' && <span style={{visibility: "visible"}}><strong>Wow! </strong>Você está conectado! </span>}
                        {msgTipo === 'erro' && <span style={{visibility: "visible"}}><strong>Ops! </strong>{msg} </span>}
                    </div>

                    <div className="opcoes-login mt-5 text-center">
                        <Link to='recuperarsenha' className="mx-2">Recuperar Senha</Link>
                        <span>&#9733;</span>
                        <Link to='novousuario' className="mx-2">Quero Cadastrar</Link>
                    </div>
                </form>
            </div>
            </>
    )
}

export default Login;