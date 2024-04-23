import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  kids: null,
  endDate: "",
  members: null,
  endTime: "",
  offer: "",
  booking_cost: null,
  filteredOffers: [],

  searchedOffers: [],
  sortedOffers: [],

  bigImage: false,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    sendFormValues(state, action) {
      state.kids = action.payload.kids;
      state.endTime = action.payload.endTime;
      state.members = action.payload.members;
      state.endDate = action.payload.endDate;
      state.offer = action.payload.offer;
      state.booking_cost = action.payload.booking_cost;
    },
    saveFilteredOffer(state, action) {
      state.filteredOffers = action.payload.data;
    },
    fetchSearchedOffers(state, action) {
      state.searchedOffers = action.payload.data;
    },
    isBigImage(state, action) {
      state.bigImage = action.payload;
    },
    sortedOffers(state, action) {
      state.sortedOffers = action.payload;
    },
  },
});
export const {
  sendFormValues,
  saveFilteredOffer,
  fetchSearchedOffers,
  originalOffers,
  isBigImage,
  sortedOffers,
} = offerSlice.actions;

export default offerSlice.reducer;
