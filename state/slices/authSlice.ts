// File: state/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false, // Initial state is not authenticated
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true; // Set authentication to true on login success
    },
    logout: (state) => {
      state.isAuthenticated = false; // Set authentication to false on logout
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload; // Set authentication based on payload
    },
  },
});

export const { loginSuccess, logout, setAuthentication } = authSlice.actions;

export default authSlice.reducer;
