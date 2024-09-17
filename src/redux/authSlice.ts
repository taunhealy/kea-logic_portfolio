import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null; // Replace 'any' with a more specific type if possible
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload; // Update user state
      state.loading = false; // Set loading to false
      state.error = null; // Clear any previous errors
    },
    clearUser(state) {
      state.user = null; // Clear user state
    },
    setLoading(state) {
      state.loading = true; // Set loading state
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload; // Set error message
      state.loading = false; // Set loading to false
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
