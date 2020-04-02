import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import axios from 'axios'

const CreateMovie = (props) => {
    const [name, setName] = useState("")
    const [mYear, setYear] = useState()
    const [directorId, setDirector] = useState()
    const [categoryId, setCategory] = useState()

    const [directors, setDirectors] = useState([])
    const [categories, setCategories] = useState([])

    let years = [];
    for (let year = 1800; year <= moment().format("YYYY"); year++) {
        years[year] = year
    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/directors")
            .then(response => {
                setDirectors(response.data)
            })
        axios.get("http://localhost:5000/api/categories")
            .then(response => {
                setCategories(response.data)
            })
    }, [])

    const postDataHandler = () => {
        const data = {
            name: name,
            year: mYear,
            directorId: directorId,
            categoryId: categoryId
        };
        axios.post("http://localhost:5000/api/movies", data)
            .then(response => {
                console.log(response.data);
            })

        setName("")
        setYear("")
        setDirector("")
        setCategory("")
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Crate new movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Year</Form.Label>
                                <Form.Control as="select" value={mYear} onChange={(e) => setYear(e.target.value)}>
                                    <option>Choose...</option>
                                    {years.map(year => (
                                        <option key={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Director</Form.Label>
                                <Form.Control as="select" value={directorId} onChange={(e) => setDirector(e.target.value)}>
                                    <option>Choose...</option>
                                    {directors.map(director => (
                                        <option value={director.dId} key={director.dId}>{director.name + " " + director.lastName}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" value={categoryId} onChange={(e) => setCategory(e.target.value)}>
                                    <option>Choose...</option>
                                    {categories.map(category => (
                                        <option value={category.categoryId} key={category.categoryId}>{category.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
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
        </div >
    )
}

export default CreateMovie
