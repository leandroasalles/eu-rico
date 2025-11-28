import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../services/firebase/firebaseconnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface FormUserData {
  email: string;
  nome: string;
  senha: string;
}

interface CreateUserState {
  user: FormUserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: CreateUserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const createUser = createAsyncThunk(
  "createUser/createUser",
  async (userData: FormUserData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.senha
      );
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
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
