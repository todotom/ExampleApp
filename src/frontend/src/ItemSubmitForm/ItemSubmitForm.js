import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Text from "@material-ui/core/FormLabel"

import axios from "axios";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 5,
    fontSizeAdjust: 0.7
  },
}));

export default function ItemSubmitForm() {
    const url = "api/items";
    const classes = useStyles();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [identity, setIdentity] = useState({ firstName: "", lastName: "" });
    const [job, setJob] = useState("");
    const [success, setSuccess] = useState(undefined);

    function handleInputFirstName(e) {
        setIdentity({ ...identity, firstName: e.target.value });
    }

    function handleInputLastName(e) {
        setIdentity({ ...identity, lastName: e.target.value });
    }

    function handleInputJob(e) {
        setJob(e.target.value);
    }

    function handleInputName(e) {
        setName(e.target.value);
    }

    function handleInputDescription(e) {
        setDescription(e.target.value);
    }

    function handleInputPrice(e) {
        setPrice(e.target.value);
    }

    function formatPrice(price) {
        return `${price} €`
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.set("name", name);
        data.set("description", description);
        data.set("price", price);

        axios({
        method: "post",
        url: url,
        data: data,
        })
            .then(function (response) {
                console.log(response);
                setSuccess(true);
            })
            .catch(function (response) {
                setSuccess(false);
                console.log(response);
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

    return (
        <Container>
        <form onSubmit={handleSubmit}>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h3>New item</h3>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.input}>
                    <TextField
                        required
                        name="name"
                        id="name"
                        label="Item name"
                        fullWidth={true}
                        value={name}
                        onChange={handleInputName}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.input}>
                    <TextField
                        required
                        name="description"
                        id="description"
                        label="Item description"
                        fullWidth={true}
                        value={description}
                        onChange={handleInputDescription}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.input}>
                    
                    <TextField
                        required
                        name="price"
                        id="price"
                        label="Item price"
                        //fullWidth={true}
                        value={price}
                        onChange={handleInputPrice}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography align="center">
                        <Button type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                        <div style={{ marginTop: 10 }}>
                            <Alerting></Alerting>
                        </div>
                    </Typography>
                </Grid>
            </Grid>
        </form>
        </Container>
    );
}