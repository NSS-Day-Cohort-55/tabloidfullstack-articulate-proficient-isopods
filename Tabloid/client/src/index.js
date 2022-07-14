import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { getUserByFirebaseId } from "./modules/userManager";

const getLoggedInUser = () =>{
  
  const firebaseUserId = getUserByFirebaseId(firebase.auth().currentUser.uid.toString())
  return firebaseUserId
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App getLoggedInUser={getLoggedInUser}/>
  </React.StrictMode>
);

reportWebVitals();
