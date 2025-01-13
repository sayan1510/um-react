/* eslint-disable no-case-declarations */
import { composeWithDevTools } from "@redux-devtools/extension";
import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

const ADD_USER = "user/add";
const EDIT_USER = "user/edit";
const DELETE_USER = "user/delete";
const FETCH_USERS = "user/fetch";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case EDIT_USER:
      const editedUserIndex = state.users.findIndex(
        (currUser) => currUser.id === action.payload.id
      );
      state.users[editedUserIndex] = action.payload;
      return { ...state };
    case DELETE_USER:
      const deleteUpdate = state.users.filter(
        (currUser) => currUser.id !== action.payload.id
      );
      return { ...state, users: deleteUpdate };
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return { ...state };
  }
};

export const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const addUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        data
      );
      dispatch({ type: ADD_USER, payload: response.data });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
};

export const editUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${data.id}`,
        data
      );
      dispatch({ type: EDIT_USER, payload: response.data });
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
};

export const deleteUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:3001/users/${data.id}`
      );
      dispatch({ type: DELETE_USER, payload: data });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};

export const fetchUsers = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      dispatch({ type: FETCH_USERS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
