import React from "react";
import {BrowserRouter ,Route ,Routes } from "react-router-dom";
import { store, persistor } from '../src/store/';
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';

/*Páginas*/
import Login from './View/login'
import NovoUsuario from "./View/usuario-novo";
import Home from "./View/home";
import UsuarioRecuperarSenha from "./View/usuario-recuperar-senha"
import EventoCadastro from "./View/evento-cadastro"
import EventoDetalhes from "./View/evento-detalhes"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/eventos/:parametro" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/novousuario" element={<NovoUsuario/>} />
          <Route exact path="/novousuario/:id" element={<NovoUsuario/>} />
          <Route exact path="/recuperarsenha" element={<UsuarioRecuperarSenha/>} />
          <Route exact path="/eventocadastro" element={<EventoCadastro/>} />
          <Route exact path="/eventodetalhes/:id" element={<EventoDetalhes/>} />
          <Route exact path="/editarevento/:id" element={<EventoCadastro/>} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
