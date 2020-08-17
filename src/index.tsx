import React from "react";
import ReactDOM from "react-dom";
import {GitHubUserReposSearch} from "./components/index";

const App: React.FC = () => <GitHubUserReposSearch />;
ReactDOM.render(<App />, document.getElementById("root"));
