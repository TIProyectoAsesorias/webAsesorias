import React from "react";
import styled from "@emotion/styled";
import firebase from '../../firebase'
import { css } from "@emotion/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Cartita = ({ key, maestro,msgBtt,fn }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
console.log(maestro);
  return (
    <Card className={classes.root} variant="outlined" key={key}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Tecnologias de la informacion
        </Typography>
        <Typography variant="h5" component="h2">
          {maestro.nombre}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {}
        </Typography>
        <Typography variant="body2" component="p">
        </Typography>
      </CardContent>
      <CardActions>
  <Button size="small">Ver Mas</Button>
     
  <Button size="small"  css={css`
            background-color:#b50202;
            color:white;
          `} onClick={fn}>{msgBtt}</Button>
      </CardActions>
    </Card>
  );
};
export default Cartita;
