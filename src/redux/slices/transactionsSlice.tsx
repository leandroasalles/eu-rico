import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type TransactionData } from "../../types/transaction";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconnection";

interface TransactionsState {
  transactions: TransactionData[];
  filteredTransactions: TransactionData[];
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (
    { userUid, month, year }: { userUid: string; month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      if (!userUid) {
        return rejectWithValue("Usuário não autenticado");
      }

      const transactionsCollection = collection(db, "transactions");
      let q = null;

      if (month !== 0 && year !== 0) {
        q = query(
          transactionsCollection,
          where("userId", "==", userUid),
          where("month", "==", month),
          where("year", "==", year),
          orderBy("date", "desc")
        );
      } else {
        q = query(
          transactionsCollection,
          where("userId", "==", userUid),
          orderBy("date", "desc")
        );
      }

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
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
      state.filteredTransactions = [];
    },
    filterTransactions: (state, action) => {
      state.filteredTransactions = state.transactions.filter(
        (transaction: TransactionData) =>
          transaction.month === action.payload.month &&
          transaction.year === action.payload.year
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.transactions = [];
        state.filteredTransactions = [];
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.filteredTransactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state) => {
        state.transactions = [];
        state.filteredTransactions = [];
      });
  },
});

export const { resetTransactions, filterTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
