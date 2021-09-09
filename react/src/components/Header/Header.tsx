import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    appbar: {
      position: "inherit",
      backgroundColor: "transparent",
      margin: "20px 0px 20px 0px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    },
  }),
);

export const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid container item xs={4} justify="center">
            <img src="/images/logo.svg" alt="Attendi" />
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};
