import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  mgrs?: string | null;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  mgrs: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        mgrs: string;
      }>
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.mgrs = action.payload.mgrs;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
