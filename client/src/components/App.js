import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
// import Registration from "./Registration";
import Registration from "./registration";
import Profile from "./Profile";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Landing from "./Landing";

const useStyles = makeStyles((theme) => ({
  container: {
    // width: '1200px'
    // width: '100%'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={"container"}>
      <BrowserRouter>
        <div>
          <div className={classes.container}>
            <Header />
            <Route exact path={"/"} component={Landing} />
            <Route exact path={"/registration"} component={Registration} />
            <Route exact path={"/profile/:userId"} component={Profile} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
