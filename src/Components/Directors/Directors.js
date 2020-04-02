import React, { useState, useEffect } from 'react';
import CreateDirector from './CreateDirector'
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table'
import axios from 'axios'

const Directors = () => {
    const [show, setShow] = useState(false)
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/directors")
            .then(response => {
                setDirectors(response.data)
            }, [])
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
            text: 'All', value: directors.length
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
                        className="fa fa-bullhorn"
                        style={{ fontSize: "1 em" }}
                    />
                    Directors
  </h1>
            </div>
            <div style={{ marginTop: 10 }}>
                <BootstrapTable data={directors} insertRow pagination={true} options={options} >
                    <TableHeaderColumn width="180" dataSort dataField='dId' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='lastName'>Last name</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='nacionality'>Nacionality</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <CreateDirector show={show} close={() => setShow(false)} />
        </div>
    )
}

export default Directors;
