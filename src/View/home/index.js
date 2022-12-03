import React, {useEffect, useState} from "react";
import './home.css';
import {Link, useParams} from 'react-router-dom';
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";
import {db} from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

function Home(){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const { parametro } = useParams();
    const usuarioEmail = useSelector(state => state.usuarioEmail)
    let listaeventos = [];


    async function getAllDocs(){

        if(parametro)
        {
            const q = query(collection(db, "eventos"), where("Usuario", "==", usuarioEmail));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                
                if(doc.data().Titulo.indexOf(pesquisa) >= 0)
                {
                    listaeventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
        }
        else
        {
            const docsSnap = await getDocs(collection(db,"eventos"));
            docsSnap.forEach((doc)=>{

                if(doc.data().Titulo.indexOf(pesquisa) >= 0)
                {
                    listaeventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
        }

        setEventos(listaeventos);
    }

    useEffect(()=>{
        getAllDocs();
    })

    return(
        <>
            <Navbar/>

            <div className="row p-5 text-center">
                <h3 className="mx-auto pb-2">Eventos</h3>
                <input onChange={(e)=> setPesquisa(e.target.value)} type="text" className="form-control" placeholder="Pesquisar evento pelo título..."/>
            </div>
            <div className="row mt-3 mx-1">
                {eventos.map(item=><EventoCard key={item.id} id={item.id} img={item.Foto} titulo={item.Titulo} detalhes={item.Detalhes} visualizacoes={item.Visualizacoes}/>)}
            </div>
        </>
    )
}

export default Home;