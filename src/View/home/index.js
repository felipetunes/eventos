import React, {useEffect, useState} from "react";
import './home.css';
import {Link, useParams} from 'react-router-dom';
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";
import {db, requestForToken} from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

function Home(){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [eventSelected, setEventSelected] = useState('Todos');
    const { parametro } = useParams();
    const usuarioEmail = useSelector(state => state.usuarioEmail)
    let listaeventos = [];

    useEffect(() => {
        getAllDocs();
    }, [pesquisa]);

    async function getAllDocs(){

        if(parametro)
        {
            const q = query(collection(db, "eventos"), where("Usuario", "==", usuarioEmail));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                
                if(doc.data().Titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0)
                {
                    if(doc.data().Tipo == eventSelected || eventSelected == 'Todos')
                    {
                        listaeventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                }
            })
        }
        else
        {
            const docsSnap = await getDocs(collection(db,"eventos"));
            docsSnap.forEach((doc)=>{

                if(doc.data().Titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0)
                {
                    if(doc.data().Tipo == eventSelected || eventSelected == 'Todos')
                    {
                        listaeventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                }
            })
        }

        setEventos(listaeventos);
    }

    useEffect(()=>{
        getAllDocs();
    })

    return(
        <div className="colorBack">
            <Navbar/>
                <div className="container">
                    <div className="row p-3">
                        <h3 className=" pb-1 titlePage">{parametro ? 'Meus eventos':'Todos os eventos'}</h3>
                        <input onChange={(e)=> setPesquisa(e.target.value)} type="text" className="form-control pesquisaEvento" placeholder="Pesquisar evento pelo título..."/>
                        <div className="filterCategory">
                        <button onClick={() => setEventSelected('Todos')} className="btn btnTypeEvent" type="button">Todos</button>
                            <button onClick={() => setEventSelected('Show')} className="btn btnTypeEvent" type="button">Show</button>
                            <button onClick={() => setEventSelected('Festa')} className="btn btnTypeEvent" type="button">Festa</button>
                            <button onClick={() => setEventSelected('Teatro')} className="btn btnTypeEvent" type="button">Teatro</button>
                            <button onClick={() => setEventSelected('Evento')} className="btn btnTypeEvent" type="button">Evento</button>
                        </div>
                    </div>
                    <div className="row mx-1">
                        {eventos.map(item=><EventoCard key={item.id} id={item.id} img={item.Foto} titulo={item.Titulo} detalhes={item.Detalhes} visualizacoes={item.Visualizacoes}/>)}
                    </div>
                </div>
        </div>
    )
}

export default Home;