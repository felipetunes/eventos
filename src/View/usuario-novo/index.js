import React, {useState} from "react";
import firebase from '../../config/firebase';
import './usuario-novo.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom';
import Navbar from "../../components/navbar";

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    const [invalidEmail, setInvalidEmail] = useState();
    const [InvalidPassword, setInvalidPassword] = useState();

    function cadastrar(){
        
        setCarregando(1);
        setInvalidEmail(0);
        setMsgTipo(null);

        if(!email){
            setCarregando(0);
            setMsgTipo('erro');
            setInvalidEmail(1);
            setMsg('Você precisa informar o e-mail!')
            return;
        }

        if(!password){
            setCarregando(0);
            setMsgTipo('erro');
            setInvalidPassword(1);
            setMsg('Você precisa informar a senha!')
            return;
        }

        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // Signed in
          setCarregando(0);
          setMsgTipo('sucesso')
          // ...
        })
        .catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            
           switch(erro.code)
           {
                case 'auth/weak-password':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    setInvalidPassword(1);
                    break;
                case 'auth/email-already-in-use':
                    setMsg('Este email já está sendo usado por outro usuário');
                    setInvalidEmail(1)
                    break;
                case 'auth/invalid-email':
                    setMsg('O formato do seu email é inválido');
                    setInvalidEmail(1)
                    break;
                default:
                    setMsg('Não foi possivel cadastrar.Tente novamente mais tarde!');
                    break;
           }
        });

    }

    return(
        <>
        <Navbar/>
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                {invalidEmail > 0 ?
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2 invalidField" placeholder="Email"/>
                    : <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email"/>
                }
                {InvalidPassword > 0 ?
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control my-2 invalidField" placeholder="Senha"/>
                    :<input onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha"/>
                }
  
                {
                    carregando ? <div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
                            : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }

                <div className="msg-login text-black text-center my-5">
                        {msgTipo === 'sucesso' && <span style={{visibility: "visible"}}><strong>Wow! </strong>Cadastro realizado com sucesso </span>}
                        {msgTipo === 'erro' && <span style={{visibility: "visible"}}><strong>Ops! </strong>{msg}</span>}
                </div>
            </form>
        </div>
        </>
    )
}

export default NovoUsuario;
