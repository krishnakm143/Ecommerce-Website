// actions/userActions.js
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../Action/firebase';
import { searchUsersInFirestore } from './searchUtils'; // Import your search utility

// Action types
export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SET_USER = 'SET_USER';
export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

// Fetch user data by ID
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

// Set user action
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Search users action creator
export const searchUsers = (queryStr) => async (dispatch) => {
  dispatch({ type: SEARCH_USERS_REQUEST });
  try {
    const users = await searchUsersInFirestore(queryStr); // Use the search utility
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    dispatch({ type: SEARCH_USERS_FAILURE, payload: error.message });
  }
};
