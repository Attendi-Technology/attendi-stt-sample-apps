import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { RecorderPage } from "./views/RecorderPage/RecorderPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      minHeight: "100vh",
    },
    navigation: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "20px",
      boxShadow: "0 10px 64px 0 rgba(221, 233, 247, 0.3)",
      padding: "30px 15px 30px 30px",
      marginBottom: "5vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);

export function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Grid container>
        <Grid item xs={1}>
          <Grid item xs={12} />
        </Grid>

        <Grid item xs={10}>
          <Grid
            container
            direction="column"
            className={classes.contentContainer}
          >
            <Grid item>
              <Header />
            </Grid>

            <Grid item xs className={classes.navigation}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/recorder" />
                </Route>
                <Route exact path="/recorder">
                  <RecorderPage />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid item xs={12} />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
