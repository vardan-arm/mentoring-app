import Header from "./Header";
import {BrowserRouter, Route} from "react-router-dom";
import Registration from "./registration";
import Profile from "./Profile";
import {makeStyles} from "@material-ui/core/styles";
import Landing from "./Landing";
import ProfileEdit from "./ProfileEdit";

import i18n from '../i18n';
import {useEffect} from "react";
import {doLogin} from "../store/actions/doLogin";
import {getTranslations} from "../store/actions/getTranslations";
import {useDispatch} from "react-redux";
import {getI18nTranslations} from "../store/selectors/general";
import TranslationsProvider from "../Translations";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 32px",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /*useEffect(() => {
    // await i18n();
    dispatch(getTranslations());

    const translations = getI18nTranslations();
    console.log({translations});
  }, [])*/

  // const translations = getI18nTranslations();
  // console.log({translations});
  return (
    <div className={"container"}>
      <BrowserRouter>
        <div>
          {/*<TranslationsProvider>*/}
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
          {/*</TranslationsProvider>*/}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
