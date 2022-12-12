import React, {useState} from "react";
import firebase from '../../config/firebase';
import './usuario-novo.css';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {collection, addDoc} from "firebase/firestore";
import Navbar from "../../components/navbar";
import Profile from '../../components/Profile'
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {faPen, faCamera, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {db, storage} from '../../config/firebase';

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setConfirmPassword] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [usePhoto, setUsePhoto] = useState(0);
    const [newdisplayName, setDisplayName] = useState(0);
    const [passwordType, setPasswordType] = useState("password");
    const photoURL = useSelector(state => state.photoURL);
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const displayName = useSelector(state => state.displayName);
    const { id } = useParams();
    const inputRef = React.useRef(null);

    const [emailClass, setEmailClass] = useState('form-control my-2');
    const [passwordClass, setPasswordClass] = useState('form-control my-2');

    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

    function fotografar(){
        usePhoto == 0 ? setUsePhoto(1):setUsePhoto(0);
    }

    function cadastrar(){
        
        setCarregando(1);
        setMsgTipo(null);

        setPasswordClass('form-control my-2')
        setEmailClass('form-control my-2')

        if(!email){
            setCarregando(0);
            setMsgTipo('erro');
            setMsg('Você precisa informar o e-mail!')
            setEmailClass('form-control my-2 invalidField');
            return;
        }

        if(!password){
            setCarregando(0);
            setMsgTipo('erro');
            setPasswordClass('form-control my-2 invalidField');
            setMsg('Você precisa informar a senha!')
            return;
        }

        if(password != passwordConfirm){
            setCarregando(0);
            setMsgTipo('erro');
            setPasswordClass('form-control my-2 invalidField');
            setMsg('A senha é diferente da confirmação')
            return;
        }

        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
              // Add a new document in collection "user"
              addDoc(collection(db, "user"), {
                  Email: email,
                  //Description has validation because it is not mandatory
                  Nome: newdisplayName? newdisplayName : "",
                  Tema: 0
              }).then(()=> {
                    setCarregando(0);
                    setMsgTipo('sucesso')
              }).catch(erro=> {
                  alert(erro)
                  setMsgTipo('erro');
                  setCarregando(0);
              });

          // ...
        })
        .catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            
           switch(erro.code)
           {
                case 'auth/weak-password':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    setPasswordClass('form-control my-2 invalidField');
                    break;
                case 'auth/email-already-in-use':
                    setMsg('Este email já está sendo usado por outro usuário');
                    setEmailClass('form-control my-2 invalidField');
                    break;
                case 'auth/invalid-email':
                    setMsg('O formato do seu email é inválido');
                    setEmailClass('form-control my-2 invalidField');
                    break;
                default:
                    setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!');
                    break;
           }
        });

    }

    return(
        <>
        <Navbar/>
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold"> {id? 'Minha Conta' : 'Cadastro'}</h1>
                <div onClick={() => inputRef.current.click()} className="back pen"><FontAwesomeIcon icon={faPen} className="imageEditUser"/></div>
                <input ref={inputRef} style={{visibility: 'collapse', height:0 }} onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>
                <div onClick={fotografar} className="back cam"><FontAwesomeIcon icon={faCamera} className="imageEditUser"/></div>
                
                <div className="webcam">{usePhoto == 1 ? <Profile/> : <></>}</div>
                <img src={fotoNova? fotoNova : photoURL} className="userEditPhoto"/>
                <div className="inputsLoginUser">
                <input onChange={(e) => [setDisplayName(e.target.value), setEmailClass('form-control my-2')]} type="text" id="inputName" className={emailClass} disabled = {id? "disabled":""} placeholder={displayName? displayName : "Nome"}/>
                    <input onChange={(e) => [setEmail(e.target.value), setEmailClass('form-control my-2')]} type="email" id="inputEmail" className={emailClass} disabled = {id? "disabled":""} placeholder={usuarioEmail? usuarioEmail : "Email"}/>
                    { 
                        id? "" :
                        <>
                            <input onChange={(e) => [setPassword(e.target.value), setPasswordClass('form-control my-2')]} type={passwordType} id="inputPassword" className={passwordClass} placeholder="Senha"/>
                            <span onClick={togglePassword} className="showEyeUser">{ passwordType==="password" ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/> }</span>
                            <input onChange={(e) => [setConfirmPassword(e.target.value), setPasswordClass('form-control my-2')]} type={passwordType} id="inputConfirmPassword" className={passwordClass} placeholder="Confirme a Senha"/>
                        </>
                    }
                </div>
                    {
                        carregando ? <div className="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
                                : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-3 btn-cadastro">{id? "Editar" : "Cadastrar"}</button>
                    }
                <div className="msg-login text-black text-center">
                        {msgTipo === 'sucesso' && <span style={{visibility: "visible"}}><strong>Wow! </strong>Cadastro realizado com sucesso </span>}
                        {msgTipo === 'erro' && <span style={{visibility: "visible"}}><strong>Ops! </strong>{msg}</span>}
                </div>
            </form>
        </div>
        </>
    )
}

export default NovoUsuario;
