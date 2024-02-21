import React, {useState} from 'react';
import { authenticateUser } from '../../backend/firebaseCalls';

export function FirebaseAuthLoginPrototype(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    authenticateUser(email, password)

  };

  return (
    <>
      <div>Login Here</div>
      <>
        <input placeholder="Email" type='text' onChange={e => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type='text'
          onChange={e => setPassword(e.target.value)}
        />
        <button title="Submit" onClick={handleLogin} />
      </>
    </>
  );
}

export default FirebaseAuthLoginPrototype;