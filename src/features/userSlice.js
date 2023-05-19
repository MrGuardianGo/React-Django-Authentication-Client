import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = process.env.REACT_APP_API_URL;

export const getUser = createAsyncThunk("get-user/", async (data) => {
  try {
    const response = await axios.get(serverURL + "get-user/", {withCredentials: true});
    return response.data;
  } catch (err) {
    return null;
  }
});

export const registerUser = createAsyncThunk("register/", async (data) => {
  try {
    const response = await axios.post(serverURL + "register/", data);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const loginUser = createAsyncThunk("login/", async (data) => {
  try {
    const response = await axios.post(serverURL + "login/", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        return { ...state, error: null, loading: true };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        try {
          return {
            ...state,
            error: action.payload.response.data.detail,
            loading: false,
          };
        } catch (error) {
          // window.location.href = '/'
          return {
            ...state,
            data: action.payload,
            error: null,
            loading: false,
          };
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        return { ...state, error: "Invalid credentials", loading: false };
      })
      // Register
      .addCase(registerUser.pending, (state, action) => {
        return { ...state, error: null, loading: true };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        try {
          let data = action.payload.response.data;
          let message = data[Object.keys(data)[0]][0];
          return {
            ...state,
            error: message.charAt(0).toUpperCase() + message.slice(1),
            loading: false,
          };
        } catch (error) {
          // window.location.href = '/login'
          return {
            ...state,
            error: null,
            loading: false,
          };
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        return {
          ...state,
          error: "An error occured! Please try again later...",
          loading: false,
        };
      })
      // Get user
      .addCase(getUser.pending, (state, action) => {
        return { ...state, error: null, loading: true };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          error: null,
          loading: false,
        };
      })
      .addCase(getUser.rejected, (state, action) => {
        return {
          ...state,
          data: null,
          error: "An error occured! Please try again later...",
          loading: false,
        };
      });
  },
});

export const { login, register } = userSlice.actions;

export default userSlice.reducer;
