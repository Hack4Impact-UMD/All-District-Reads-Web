import React, {useState} from 'react';
import { registerUser } from '../../backend/firebaseCalls';

export function FirebaseAuthRegisterPrototype(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    registerUser(email, password)
  };

  return (
    <>
      <div>Register Here</div>
      <>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input
          type='text'
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button title="Submit" onClick={handleRegister} />
      </>
    </>
  );
}

export default FirebaseAuthRegisterPrototype;