import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import axios from 'axios'

export const CreateUser = props => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [identification, setIdent] = useState("")
    const [address, setAddress] = useState("")

    const postDataHandler = () => {
        const director = {
            name: name,
            lastName: lastName,
            identification: identification,
            address: address
        }
        axios.post("http://localhost:5000/api/users", director)
        setName("")
        setLastName("")
        setIdent("")
        setAddress("")
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
                            <Form.Label>Identification</Form.Label>
                            <Form.Control type="text" placeholder="Enter nacionality" value={identification} onChange={(e) => setIdent(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter nacionality" value={address} onChange={(e) => setAddress(e.target.value)} />
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
