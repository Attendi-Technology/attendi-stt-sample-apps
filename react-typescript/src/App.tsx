import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { RecorderPage } from "./views/RecorderPage/RecorderPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    container: {
      display: "flex",
      flex: 1,
      padding: theme.spacing(0, 8, 8, 8),
    },
    main: {
      flex: 1,
      display: "flex",
      background: theme.palette.background.paper,
      padding: theme.spacing(3, 2),
    },
  }),
);

export function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <div className={classes.container}>
          <main className={classes.main}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/recorder" />
              </Route>
              <Route exact path="/recorder">
                <RecorderPage />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
