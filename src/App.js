import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NewSession from "./pages/NewSession";
import React from "react";
import Remote from "./pages/Remote";
import Screen from "./pages/Screen";

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/remote/:songIds" component={Remote} />
				<Route path="/screen" component={Screen} />

				{/* <Redirect from="*" to="/" /> */}
			</Switch>
		</React.Fragment>
	);
}

export default App;
