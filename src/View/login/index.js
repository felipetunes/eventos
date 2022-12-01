import React, {useState, useEffect} from "react";
import './login.css';
import {Link, Navigate} from 'react-router-dom';
import firebase from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import Navbar from "../../components/navbar";
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"

function Login(){

    const[email, setEmail] = useState();
    const[senha, setSenha] = useState();
    const[msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();
    const [passwordType, setPasswordType] = useState("password");

    const dispatch = useDispatch();

    const Sign = (e) => {
        e.preventDefault();

        setCarregando(1);
        setMsgTipo(null);

        const auth = getAuth(firebase);

        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {

          // Signed in
          setCarregando(0);
          setMsgTipo('success')
          dispatch({type: 'LOG_IN', usuarioEmail: email, photoURL: userCredential.user.photoURL});
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
                    setMsg('Não foi possivel entrar na conta.');
                    break;
           }
        });
    }


    const SignWithGoogle = (e) => {
        e.preventDefault();

        setCarregando(1);
        setMsgTipo(null);

        const auth = getAuth(firebase);
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((res) => {

            setCarregando(0);
            setMsgTipo('success')
            dispatch({type: 'LOG_IN', usuarioEmail: res.user.email, photoURL: res.user.photoURL});
          // ...
        }).catch((error) => {
            setMsg(error.message);
        });
    }

    const SignWithFacebook = (e) => {
        e.preventDefault();
        setCarregando(1);
        setMsgTipo(null);
        
        const auth = getAuth(firebase);
        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider)
        .then((res) => {

            setCarregando(0);
            setMsgTipo('success')
            dispatch({type: 'LOG_IN', usuarioEmail: res.user.email, photoURL: res.user.photoURL});

        })
        .catch((error) => {
            setMsg(error.message);
        });
    }

    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

    return(
        <>
        <Navbar/>
        <div className="background" />
            <div className="login-content d-flex align-items-center">

            
                {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null}
                
                <form className="form-signin mx-auto text-center">
                    <div className="text-center mb-4">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Login</h1>
                    </div>

                    <button className="googleBtn btn-login-social mt-3" type="button" onClick={SignWithGoogle}>
                        <FontAwesomeIcon icon={faGoogle} className="iconSocial"/><span className="textBtnSocial"></span>
                    </button>
                    <button className="facebookBtn btn-login-social mt-3" type="button" onClick={SignWithFacebook}>
                        <FontAwesomeIcon icon={faFacebookF} className="iconSocial"/><span className="textBtnSocial"></span>
                    </button>

                    <div className="inputsLogin">
                    <h6 className="font-weight-light text-black">Ou use a sua conta</h6>
                        <input onChange={(e) => setEmail(e.target.value)} autoFocus type="email" id="inputEmail" className="form-control my-2" placeholder="Email"/>
                        <input onChange={(e) => setSenha(e.target.value)} type={passwordType} id="inputPassword" className="form-control my-2" placeholder="Senha"/>
                        <span onClick={togglePassword} className="showEye">{ passwordType==="password" ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/> }</span>
                    </div>
            
                    {
                        carregando ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                            :  <button className="btn btn-lg btn-block btn-login" type="button" onClick={Sign}>Logar</button>
                    }

                    <div className="msg-login text-black text-center my-3">
                        {msgTipo === 'success' && <span style={{visibility: "visible"}}><strong>Wow! </strong>Você está conectado! </span>}
                        {msgTipo === 'erro' && <span style={{visibility: "visible", color:"red"}}><strong>Ops! </strong>{msg} </span>}
                    </div>

                    <div className="opcoes-login mt-1 text-center">
                        <Link to='/recuperarsenha' className="mx-2">Recuperar Senha</Link>
                        <span>|</span>
                        <Link to='/novousuario' className="mx-2">Quero Cadastrar</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;