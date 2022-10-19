import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect, Route, Switch } from "react-router-dom";

import GlobalScreen from "./pages/GlobalScreen";
import Home from "./pages/Home";
import LocalScreen from "./pages/LocalScreen";
import NewSession from "./pages/NewSession";
import React from "react";
import Remote from "./pages/Remote";

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/remote/:songIds" component={Remote} />
				<Route path="/global-screen" component={GlobalScreen} />
				<Route path="/local-screen" component={LocalScreen} />

				{/* <Redirect from="*" to="/" /> */}
			</Switch>
		</React.Fragment>
	);
}

export default App;
