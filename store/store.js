import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./slices/authSlice";


export const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
 
    },
    devTools: true,
  });



