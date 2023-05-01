import React, { useState} from 'react'

import useEth from '../contexts/EthContext/useEth';
import Util from './util';

const Register = () => {

  const { state } = useEth();
  
  const [userName, setUserName] = useState("");

    const registerUser = async () => {
        if (!userName) {
          window.alert("Please fill all the fields");
          return;
        };
      state.contract.methods.registerUser(userName.trim()).send({ from: state.account })
        .then(data => {
          console.log("registration successful :", data)
           window.location.reload(false);
        })
        .catch(error => {
          // handle the error here
            let msg = Util.metamaskErrorParser(error);
            console.log(msg)
        });
     
      }
    
  return (
    <div className="register" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    }}>
      <h1
        style={{
          color: "white",
          background: "#253053",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          padding: "1rem",
        }}
      >
        Welcome to Blockify
      </h1>
      <h2
        style={{
          color: "#253053",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          padding: "1rem",
        }}
      >
        Register
      </h2>
      <p
        style={{
          color: "darkGrey",
          fontSize: "1rem",
          fontWeight: "bold",
          textDecoration: 'italic',
        }}
      >
        User Name can't be changed
      </p>
      <input
        type="text"
        placeholder="Enter User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        style={{
          padding: "1rem",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      />
      <button
      onClick={registerUser}
      style={{
          padding: "1rem",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "white",
          background: "#253053",
          border: "none",
          borderRadius: "10px",
        }}
      >
        Register
      </button>
      </div>
  )
}

export default Register