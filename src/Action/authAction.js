import { auth } from '../Action/firebase'; // Adjust the path if necessary

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: 'LOGIN_SUCCESS', payload: userCredential.user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: 'LOGOUT' });
};

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    dispatch({ type: 'LOGIN_SUCCESS', payload: userCredential.user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.message });
  }
};
