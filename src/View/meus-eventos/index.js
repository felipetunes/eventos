import React, {useState} from "react";
import './meus-eventos.css';
import Navbar from "../../components/navbar";

function MeusEventos(){

    return(
        <>
            <Navbar/>
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="mb-3 font-weight-bold">Meus eventos</h1>
                </form>
        </>
    )
}

export default MeusEventos;