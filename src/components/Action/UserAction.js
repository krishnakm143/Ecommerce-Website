// actions/userActions.js
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../Action/firebase';

// Action types
export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SET_USER = 'SET_USER';

export const fetchUserData = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_DATA_REQUEST });
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: userDoc.data() });
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
