import React from "react";
import {BrowserRouter ,Route ,Routes } from "react-router-dom";
import store from '../src/store/';
import { Provider } from "react-redux";

/*Páginas*/
import Login from './View/login'
import NovoUsuario from "./View/usuario-novo";
import Home from "./View/home";
import UsuarioRecuperarSenha from "./View/usuario-recuperar-senha"
import EventoCadastro from "./View/evento-cadastro"
import MeusEventos from "./View/meus-eventos"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/novousuario" element={<NovoUsuario/>} />
          <Route exact path="/recuperarsenha" element={<UsuarioRecuperarSenha/>} />
          <Route exact path="/eventocadastro" element={<EventoCadastro/>} />
          <Route exact path="/meuseventos" element={<MeusEventos/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
