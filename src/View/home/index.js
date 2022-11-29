import React, {useEffect, useState} from "react";
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";
import {db} from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Home(){

    const [eventos, setEventos] = useState([]);
    let listaeventos = [];


async function getAllDocs(){
    const docsSnap = await getDocs(collection(db,"eventos"));

    docsSnap.forEach((doc)=>{
        listaeventos.push({
            id: doc.id,
            ...doc.data()
        })
    })

    setEventos(listaeventos);
}

    useEffect(()=>{
        getAllDocs();
    })

    return(
        <>
            <Navbar/>
            
            <div className="row mt-3 mx-1">
                {eventos.map(item=><EventoCard key={item.id} titulo={item.Titulo} detalhes={item.Detalhes} visualizacoes={item.Visualizacoes}/>)}
            </div>
        </>
    )
}

export default Home;