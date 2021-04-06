import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 5,
    fontSizeAdjust: 0.7
  },
}));

export default function ItemsListTable() {
    const url = "api/items";

    const classes = useStyles();

    const [items, setItems] = useState([]);

    const [success, setSuccess] = useState(undefined);

    function handleGetItems(e) {
        e.preventDefault();

        getItems();
    }

    function getItems() {
        axios({
            method: "get",
            url: url,
            })
                .then(response => {
                    //console.log(response);
                    setSuccess(true);
                    const array = response.data;
                    array.forEach(listItems);
    
                    function listItems(item) {
                        alert(`${item.name}: ${item.price}`);
                    }
    
                    setItems(array);
                })
                .catch(response =>{
                    setSuccess(false);
                    //console.log(response);
                    alert('pito');
                });
    }

    function Alerting() {
        if (success === true) {
            return <Alert severity="success">Todo correcto</Alert>;
        } else if (success === false) {
            return <Alert severity="error">Oopsa. An error just occured!</Alert>;
        } else {
            return null;
        }
    }

    function formatItemsList() {
        getItems();

        return (
            <>
                {
                    items.map(item => (
                        <tr>
                            <td> {item.name} </td>
                            <td> {item.description} </td>
                            <td> {item.price} </td>
                        </tr>
                    ))
                }
            </>
        )
    }

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formatItemsList}
                    </tbody>
                </table>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography align="center">
                        <Button color="primary" variant="contained" onClick={handleGetItems}>
                            Get items
                        </Button>
                        <div style={{ marginTop: 10 }}>
                            <Alerting></Alerting>
                        </div>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}