import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import axios from 'axios'

const CreateCategory = (props) => {
    const [name, setName] = useState("")

    let years = [];
    for (let year = 1800; year <= moment().format("YYYY"); year++) {
        years[year] = year
    }

    const postDataHandler = () => {
        const category = {
            name: name,
        };
        axios.post("http://localhost:5000/api/categories", category)
        setName("")
    }

    return (
        < div >
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Crate new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
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

export default CreateCategory
