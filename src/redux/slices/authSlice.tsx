import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../services/firebase/firebaseconnection";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Thunk para login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, senha }: { email: string; senha: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;
      // Extrai apenas dados serializáveis
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        return rejectWithValue("Email ou senha inválidos");
      }
      return rejectWithValue(error.code);
    }
  }
);

// Thunk para logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao fazer logout");
    }
  }
);

// Thunk para verificar estado de autenticação
export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, { rejectWithValue }) => {
    return new Promise<UserData | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          if (user) {
            // Extrai apenas dados serializáveis
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            });
          } else {
            resolve(null);
          }
        },
        (error) => {
          unsubscribe();
          reject(rejectWithValue(error.message));
        }
      );
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Check Auth State
    builder
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
