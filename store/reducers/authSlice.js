import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      const { token, user } = response?.data?.data;
      const { messages } = response?.data;

      return { token, user, messages };
    } catch (error) {
      const messages = error.response?.data;
      return rejectWithValue(messages);
    }
  }
);

const initialState = {
  token: null,
  status: "idle",
  error: null,
  messages: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.messages = action.payload.messages;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.messages = action.payload.messages;
      });
  },
});

export const { logout, updatePhoto } = authSlice.actions;

export default authSlice.reducer;