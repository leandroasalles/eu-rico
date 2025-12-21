import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../services/firebase/firebaseconnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { type UserData } from "../../types/user";

const initialState: UserData = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const createUser = createAsyncThunk(
  "createUser/createUser",
  async (
    { email, senha }: { email: string; senha: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const userResponseData = userCredential.user;
      const user = {
        uid: userResponseData.uid,
        email: userResponseData.email,
        displayName: userResponseData.displayName,
      };
      console.log(user);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export default createUserSlice.reducer;
