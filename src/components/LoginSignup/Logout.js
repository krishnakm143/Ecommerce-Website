import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Action/authAction';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(logout())}>
      Logout
    </button>
  );
};

export default Logout;
