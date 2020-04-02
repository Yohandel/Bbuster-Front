import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import axios from 'axios'

const CreateDirector = (props) => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nacionality, setNacionality] = useState("")

    const postDataHandler = () => {
        const director = {
            name: name,
            lastName: lastName,
            nacionality: nacionality
        }
        axios.post("http://localhost:5000/api/directors", director)
        setName("")
        setLastName("")
        setNacionality("")
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Crate new director</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Nacionality</Form.Label>
                            <Form.Control type="text" placeholder="Enter nacionality" value={nacionality} onChange={(e) => setNacionality(e.target.value)} />
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

export default CreateDirector
