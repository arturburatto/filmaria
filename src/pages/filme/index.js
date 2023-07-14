import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import {toast} from 'react-toastify'


function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({}) 
    const [loading, setLoading] = useState(true)
   

    useEffect(() =>{
        async function loadFilme(){
          await api.get(`/movie/${id}`, {
            params:{  
                api_key: '849e653cbddf47a8304cd89cb23fdc87',
                language: 'pt-BR',
            }          
        })
        .then((response) => {
            setFilme(response.data)
            setLoading(false)
        }).catch(() => {
            console.log('filme nao encontrado')
            navigate('/')
        })
    }
    loadFilme();

    return () => {
        console.log('componente foi desmontado')
    }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => 
            filmesSalvo.id === filme.id 
        )

        if(hasFilme) {
            toast.warn("Este filme já foi salvo")
            return;
        }
        toast.success("Filme salvo com sucesso :)")
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
         
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando Filme...</h1>
            </div>
        )
    }


    return(
        <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {Math.round(filme.vote_average * 10) / 10} /10</strong>

        <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
            <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=trailer+${filme.title}`}>Trailer</a>
        </button>
        </div>
        </div>
    )
}

export default Filme;