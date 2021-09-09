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
    logo: {},
    button: {
      height: "80px",
      width: "80px",
      color: "#5D728A",
      fontSize: 12,
      textTransform: "none",
      background: "linear-gradient(140.09deg, #FFFFFF 0%, #EEF6FA 100%)",
      boxShadow: "0 10px 64px 0 #DDE9F7",
      borderRadius: "10px",
      marginLeft: "auto",
    },
    buttonLabel: {
      // Aligns the content of the button vertically.
      flexDirection: "column",
    },
    buttonIcon: {
      margin: "0",
      paddingBottom: "10px",
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
