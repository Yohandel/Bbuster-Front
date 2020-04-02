import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
import CreateCategory from './CreateCategory'

const Categories = () => {
    const [show, setShow] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/categories")
            .then(response => {
                console.log("JELOU")
                setCategories(response.data)
            });
    }, [])
    const CustomButton = () => {
        return (
            <div>
                <InsertButton
                    btnContextual='btn'
                    className="btn-inst"
                    btnText="Add new"
                    btnGlyphicon='fa fa-pencil'
                    onClick={() => { setShow(true) }} />
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
            text: 'All', value: categories.length
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
                        className="fa fa-th"
                        style={{ fontSize: "1em" }}
                    />
                    Categories
          </h1>
            </div>
            <div style={{ marginTop: 10 }}>
                <BootstrapTable data={categories} insertRow pagination={true} options={options}>
                    <TableHeaderColumn width="180" dataSort dataField='categoryId' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='name'>Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <CreateCategory show={show} close={() => setShow(false)} />
        </div>
    )
}
export default Categories;

