import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type TransactionData } from "../../types/transaction";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconnection";

interface TransactionsState {
  transactions: TransactionData[];
}

const initialState: TransactionsState = {
  transactions: [],
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (userUid: string, { rejectWithValue }) => {
    try {
      if (!userUid) {
        return rejectWithValue("Usuário não autenticado");
      }

      const transactionsCollection = collection(db, "transactions");
      const q = query(
        transactionsCollection,
        where("userId", "==", userUid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);

      const transactions = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
        } as TransactionData;
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
