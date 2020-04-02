import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import axios from 'axios'

export const CreateInvoice = props => {
    const [user, setUser] = useState()
    const [movie, setMovie] = useState()

    const [usersList, setUsers] = useState([])
    const [moviesList, setMovies] = useState([])


    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(response => {
                setUsers(response.data)
            })
        axios.get("http://localhost:5000/api/movies")
            .then(response => {
                setMovies(response.data)
            })
    }, [])

    const postDataHandler = () => {
        const invoice = {
            id_user: user,
            id_movie: movie
        }
        axios.post("http://localhost:5000/api/invoices", invoice)
        setUser("")
        setMovie("")
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Crate new director</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control as="select" onChange={(e) => setUser(e.target.value)}>
                                <option>Choose...</option>
                                {usersList.map(usr => (
                                    <option value={usr.uId} key={usr.uId}>{usr.name + " " + usr.lastName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control as="select" onChange={(e) => setMovie(e.target.value)}>
                                <option>Choose...</option>
                                {moviesList.map(mv => (
                                    <option value={mv.movieId} key={mv.movieId}>{mv.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
          </Button>
                    <Button variant="btn" className="btn-custom" onClick={postDataHandler}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
