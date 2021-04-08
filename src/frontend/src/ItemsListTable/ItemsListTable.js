import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
                    // setSuccess(true);

                    setItems(response.data);
                })
                .catch(response =>{
                    // setSuccess(false);
                    //console.log(response);
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
        return (
            <React.Fragment>
                {
                    items.map(item => (
                        <TableRow key={item.name}>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    ))
                }
            </React.Fragment>
        )
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Container>
            <Grid container justify="center" direction="column">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="Items">
                            <TableHead className={classes.table}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formatItemsList()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography align="center">
                        <Button color="primary" variant="contained" 
                        onClick={handleGetItems}>
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