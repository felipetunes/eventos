import React, {useState} from "react";
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";

function Home(){
    return(
        <>
            <Navbar/>
            
            <div className="row">
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            <EventoCard/>
            </div>
        </>
    )
}

export default Home;