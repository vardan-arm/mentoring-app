import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Profile from "./Profile";
import { makeStyles } from "@material-ui/core/styles";
import Landing from "./Landing";
import ProfileEdit from "./ProfileEdit";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 32px",
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
            <Route
              exact
              path={"/profile/:userId/manage"}
              component={ProfileEdit}
            />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
