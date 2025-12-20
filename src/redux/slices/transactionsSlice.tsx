import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type TransactionData } from "../../types/transaction";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconnection";
import type { RootState } from "../store";

interface TransactionsState {
  transactions: (TransactionData & { id?: string })[];
}

const initialState: TransactionsState = {
  transactions: [],
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Acessa o estado do Redux para obter o usuário logado
      const state = getState() as RootState;
      const user = state.auth.user;

      if (!user) {
        return rejectWithValue("Usuário não autenticado");
      }

      const transactionsCollection = collection(db, "transactions");
      const q = query(
        transactionsCollection,
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);

      const transactions = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as TransactionData & { id: string };
      });
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro ao buscar transações");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state) => {
        state.transactions = [];
      });
  },
});

export default transactionsSlice.reducer;
