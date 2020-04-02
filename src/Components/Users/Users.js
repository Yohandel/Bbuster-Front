import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
import { CreateUser } from './CreateUser';

export const Users = () => {

    const [show, setShow] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const CustomButton = () => {
        return (
            <div>
                <InsertButton
                    btnContextual='btn'
                    className="btn-inst"
                    btnText="Add new"
                    btnGlyphicon='fa fa-pencil'
                    onClick={() => { setShow(true) }}
                />
            </div>
        )
    }

    const options = {
        insertBtn: CustomButton,
        noDataText: "There's not data to show",
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: users.length
        }],
        sizePerPage: 5,
        defaultSortName: 'name',
        defaultSortOrder: 'asc'
    }
    return (
        <div style={{ marginLeft: 65 }}>
            <div className="border-bottom">
                <h1>
                    <i
                        className="fa fa-users"
                        style={{ fontSize: "1em" }}
                    />
                    Users
          </h1>
            </div>
            <div style={{ marginTop: 10 }}>
                <BootstrapTable data={users} insertRow options={options} version='4' search pagination={true}>
                    <TableHeaderColumn width="180" dataField='uId' isKey >ID</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='lastName'>Last name</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='identification'>Identification</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='address'>Address</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <CreateUser show={show} close={() => setShow(false)} />
        </div>

    )
}
