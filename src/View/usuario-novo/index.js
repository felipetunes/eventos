import React, {useState} from "react";
import './usuario-novo.css';
import {updateEmail,updatePassword, updateProfile, createUserWithEmailAndPassword} from "firebase/auth";
import Navbar from "../../components/navbar";
import Profile from '../../components/Profile'
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {faPen, faCamera, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {auth} from '../../config/firebase';
import {Button, Form, Alert} from 'react-bootstrap';

function NovoUsuario(){

    const [password, setPassword] = useState();
    const [passwordConfirm, setConfirmPassword] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [usePhoto, setUsePhoto] = useState(0);
    const [newDisplayName, setNewDisplayName] = useState(0);
    const [passwordType, setPasswordType] = useState("password");
    const displayName = useSelector(state => state.displayName);
    const photoURL = useSelector(state => state.photoURL);
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [email, setEmail] = useState(usuarioEmail? usuarioEmail:'');
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const inputRef = React.useRef(null);
    const [emailClass, setEmailClass] = useState('form-control my-2');
    const [passwordClass, setPasswordClass] = useState('form-control my-2');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      
        setValidated(true);
      };

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

        if(password != passwordConfirm){
            setCarregando(0);
            setMsgTipo('erro');
            setPasswordClass('form-control my-2 invalidField');
            setMsg('A senha é diferente da confirmação')
            return;
        }

    if(!id){
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            updateProfile(res.user, {'displayName': newDisplayName,
            'photoURL': '' }).then((res) => {
                setCarregando(0);
                setMsgTipo('sucesso')
                })
                .catch(erro => {
                    setCarregando(0);
                    setMsgTipo('erro')
                })
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
        else
        {
            
            if(email) updateEmail(auth.currentUser, email);
            if(password) updatePassword(auth.currentUser, password);
            if(newDisplayName){ 
                updateProfile(auth.currentUser, {'displayName': newDisplayName,
                'photoURL': '' }).then((res) => {
                setCarregando(0);
                setMsgTipo('sucesso')
                dispatch({type: 'LOG_IN', usuarioEmail: email, photoURL: '', displayName: newDisplayName});
                })
                .catch(erro => {
                    setCarregando(0);
                    setMsgTipo('erro');
                });
            }
        }
    }

    return(
        <>
        <Navbar/>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold"> {id? 'Minha Conta' : 'Cadastro'}</h1>
                <div onClick={() => inputRef.current.click()} className="back pen"><FontAwesomeIcon icon={faPen} className="imageEditUser"/></div>
                <input ref={inputRef} style={{visibility: 'collapse', height:0 }} onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>
                <div onClick={fotografar} className="back cam"><FontAwesomeIcon icon={faCamera} className="imageEditUser"/></div>
                <div className="webcam">{usePhoto == 1 ? <Profile/> : <></>}</div>
                <img src={fotoNova? fotoNova : photoURL} className="userEditPhoto"/>

                <Form.Group className="inputsLoginUser">
                    <Form.Control
                        required
                        type="text"
                        placeholder={displayName? displayName : "Nome"}
                        defaultValue={displayName && displayName}
                        onChange={(e) => [setNewDisplayName(e.target.value), setEmailClass('form-control my-2')]}
                        className={emailClass}
                    />
                    <Form.Control
                        required
                        type="email"
                        placeholder={usuarioEmail? usuarioEmail : "Email"}
                        defaultValue={usuarioEmail && usuarioEmail}
                        onChange={(e) => [setEmail(e.target.value), setEmailClass('form-control my-2')]}
                        className={emailClass}
                    />
                    <Form.Control
                        required = {id? false: true}
                        type={passwordType}
                        placeholder="Senha"
                        onChange={(e) => [setPassword(e.target.value), setPasswordClass('form-control my-2')]}
                        className={passwordClass}
                    />
                    <Form.Control
                        required = {id? false: true}
                        type={passwordType}
                        placeholder="Confirme a Senha"
                        onChange={(e) => [setConfirmPassword(e.target.value), setPasswordClass('form-control my-2')]}
                        className={passwordClass}
                    />
                    <span onClick={togglePassword} className="showEyeUser">{ passwordType==="password" ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/> }</span>
                </Form.Group>
                    {
                        carregando ? <div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>
                                : <Button onClick={cadastrar} type="submit" className="btn btn-lg btn-block mt-3 mb-3 btn-cadastro">{id? "Editar" : "Cadastrar"}</Button>
                    }
                <div className="msg-login text-black text-center">
                        {msgTipo === 'sucesso' && <Alert variant="success" style={{visibility: "visible"}}><strong>Wow! </strong>{id ? 'Edição realizada' : 'Cadastro realizado'} com sucesso </Alert>}
                        {msgTipo === 'erro' && <Alert variant="danger" style={{visibility: "visible"}}><strong>Ops! </strong>{msg}</Alert>}
                </div>
        </Form>
        </>
    )
}

export default NovoUsuario;
