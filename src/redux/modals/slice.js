// modals / slice.js;
import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/operations";

const initialState = {
  isLogOutModalOpen: false,
  isEditModalOpen: false,
  isAddModalOpen: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openLogOutModal(state) {
      state.isLogOutModalOpen = true;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
      state.isLogOutModalOpen = false;
      state.isAddModalOpen = false;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
      state.isLogOutModalOpen = false;
      state.isEditModalOpen = false;
    },
    closeModal() {
      return initialState;
    },
    addEditId: (state, { payload }) => {
      state.isEditId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      // Измените logoutThunk на logout
      return initialState;
    });
  },
});

export const {
  openLogOutModal,
  openEditModal,
  openAddModal,
  closeModal,
  addEditId,
} = modalSlice.actions;
export const modalsReducer = modalSlice.reducer;
