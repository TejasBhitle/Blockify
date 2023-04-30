import React, { useState} from 'react'

import useEth from '../contexts/EthContext/useEth';

const Register = () => {

    const { state } = useEth();
  

  const [userName, setUserName] = useState("");

    const registerUser = async () => {
        if (!userName) {
          window.alert("Please fill all the fields");
          return;
        };
        const tx = await state.contract.methods.registerUser(userName).send({ from: state.account });
        console.log(tx);
      }
    
  return (
    <div className="register">
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          onClick={registerUser}
        >
          Register
        </button>
      </div>
  )
}

export default Register