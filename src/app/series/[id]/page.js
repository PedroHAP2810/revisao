'use client'

import apiSeries from '@/app/apis/apiSeries'
import Pagina from '@/app/components/Pagina'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CardImg, Col, Row } from 'react-bootstrap'

export default function page(props) {

    const id = props.params.id
    const [serie, setSerie] = useState({})
    const [atores, setAtores] = useState([])


    useEffect(() => {
        buscarSerie()
    }, [])

    async function buscarSerie() {
        const resultado = await apiSeries.get('/tv/' + id + '?language=pt-BR')
        console.log(resultado.data)
        setSerie(resultado.data)
    }

    return (
        <Pagina titulo={serie.original_name}>

            {serie.id && (
                <>

                    <Row className='mt-2'>
                        <Col md={3}>
                            <CardImg src={'https://image.tmdb.org/t/p/w500/' + serie.poster_path} />
                        </Col>
                        <Col m={6}>
                            <p><b>Data de Lançamento:</b> {serie.first_air_date}</p>
                            <p><b>Duração:</b> {serie.episode_run_time} min</p>
                            <p><b>Nota:</b> {serie.vote_average} ⭐</p>
                            <p><b>Número de episódios:</b> {serie.number_of_episodes}</p>

                            <p><b>Generos:</b></p>
                            <ul>
                                {serie.genres.map(item => {
                                    return <li>{item.name}</li>
                                })}

                            </ul>

                            <p><b>Sinopse:</b> {serie.overview}</p>
                        </Col>

                
                        <Col md={3}>
                            <CardImg src={'https://image.tmdb.org/t/p/w500/' + serie.backdrop_path} />
                        </Col>
                    </Row>

            
                    <h2 className='text-center'>Elenco</h2>
                    <hr />
                    <Row md={6}>
                        {atores.map(ator => {
                                return (
                                    <Col className='py-2'>
                                        <Link href={"/atores/" + ator.id}>
                                            <CardImg src={"https://image.tmdb.org/t/p/w500/" + ator.profile_path} />
                                        </Link>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                </>
            )}

        </Pagina>
    )

}