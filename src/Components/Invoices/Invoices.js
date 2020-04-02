import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
import { CreateInvoice } from './CreateInvoice';
import moment from 'moment';

const Invoices = () => {

    const [show, setShow] = useState(false)
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/invoices")
            .then(response => {
                setInvoices(response.data)
            })
    }, [])

    const CustomDate = (cell) => {
        const formatDate = moment(cell).format("DD/MM/YYYY hh:mm a")
        return (
            formatDate
        );
    }

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
            text: 'All', value: invoices.length
        }],
        sizePerPage: 5,
        defaultSortName: 'id_user',
        defaultSortOrder: 'asc'
    }

    return (
        <div style={{ marginLeft: 65 }}>
            <div className="border-bottom">
                <h1>
                    <i
                        className="fa fa-shopping-bag"
                        style={{ fontSize: "1em" }}
                    />
                    Invoices
          </h1>
            </div>
            <div style={{ marginTop: 10 }}>
                <BootstrapTable data={invoices} insertRow options={options} version='4' search pagination={true}>
                    <TableHeaderColumn width="180" dataField='id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='id_user'>User</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='id_movie'>Movie</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataFormat={CustomDate} dataField='created_At'>created At</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <CreateInvoice show={show} close={() => setShow(false)} />
        </div>
    )
}

export default Invoices 
