'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import apiSeries from '@/app/apis/apiSeries'
import Pagina from '@/app/components/Pagina'
import Series from '@/app/series/page'

export default function page() {

    const [melhores, setMelhores] = useState([])

    useEffect(() => {
        buscarMelhores()
    }, [])

    async function buscarMelhores() {
        const resultado = await apiSeries.get('/tv/top_rated?language=pt-BR')
        console.log(resultado.data.results)
        setMelhores(resultado.data.results)
    }


    return (
        <Pagina titulo="Series Melhor Avaliadas">

            <Row md={4}>

                {melhores.map(melhor => {
                    return (
                        <Col className='py-2'>
                            <Card style={{ height: "100%" }}>
                                <Card.Img src={"https://image.tmdb.org/t/p/w500/" + melhor.poster_path} />
                                <Card.Body>
                                    <Card.Title>{melhor.name}</Card.Title>
                                    <p><b>Nome:: {melhor.original_name}</b></p>
                                    <p><b>Lançamento: {melhor.first_air_date}</b></p>
                                    <p><b>Nota: {melhor.vote_average} ⭐</b></p>
                                </Card.Body>
                                <Card.Footer className='text-end'>
                                    <Button href={"/melhor/" + melhor.id} >Detalhes</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })
                }


            </Row>

        </Pagina>

    )
}