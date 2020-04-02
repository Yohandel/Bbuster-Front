import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
// import Auxiliar from '../../Auxiliar';
import CreateMovie from './CreateMovie';

const Movies = props => {

    const [show, setShow] = useState(false)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/movies")
            .then(response => {
                // console.log("Respuesta", response)
                setMovies(response.data)
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
            text: 'All', value: movies.length
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
                        className="fa fa-film"
                        style={{ fontSize: "1em" }}
                    />
                    Movies
          </h1>
            </div>
            <div style={{ marginTop: 10 }}>
                <BootstrapTable data={movies.map(item => {
                    return {
                        categoryName: item.category.name,
                        directorName: item.director.name + " " + item.director.lastName,
                        ...item
                    }
                })} insertRow options={options} version='4' search pagination={true}>
                    <TableHeaderColumn width="180" dataField='movieId' isKey hidden>Movie ID</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='name'>Movie</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='categoryName'>Category</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='directorName'>Director</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='year'>Year</TableHeaderColumn>
                    <TableHeaderColumn width="180" dataSort dataField='amount'>In stock</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <CreateMovie show={show} close={() => setShow(false)} />
        </div>
    )
}

export default Movies;
