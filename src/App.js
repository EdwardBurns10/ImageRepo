import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MicrosoftLogin from "react-microsoft-login";
import { EuiButton } from "@elastic/eui";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import { Home } from "./screens/Home";
import { auth } from "./api";
const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
const App = () => {
  const [userState, setUserState] = useState(null);
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  useEffect(() => {
    const listener = auth.userStateListener(setUserState);
    return () => {
      listener.unsubscribe();
    };
  }, []);
  if (!userState) {
    return null;
  }
  return (
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Redirect to={"/home"} />
          </Route>
          <Route path="/home" component={Home} />
        </Switch>
        {/* <React.Fragment>*/}
      </BrowserRouter>
    </AppContainer>
  );
};
export default App;
