import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch orders from backend
export const fetchOrders = createAsyncThunk("order/fetchOrders", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;