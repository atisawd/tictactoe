import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

ReactDOM.render(
	<Provider store={store}>
	
			<App />
		
	</Provider>,
	document.getElementById("app")
);