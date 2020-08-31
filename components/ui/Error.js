import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',alignContent:"center center",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const Error=({msg})=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="error">
        {msg}
      </Alert>
    </div>
  );
}
export default Error;