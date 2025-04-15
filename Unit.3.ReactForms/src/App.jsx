import { useState } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <div className="app">
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} setUserData={setUserData} />
      {userData && (
        <div className="user-info">
          <h3>User Information</h3>
          <p>Username: {userData.username}</p>
        </div>
      )}
    </div>
  );
}