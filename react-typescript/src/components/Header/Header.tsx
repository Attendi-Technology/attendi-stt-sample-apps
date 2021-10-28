import { AppBar, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      position: "inherit",
      backgroundColor: "transparent",
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(3, 2),
    },
  }),
);

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <img src="/images/logo.svg" alt="Attendi" />
      </Toolbar>
    </AppBar>
  );
};
