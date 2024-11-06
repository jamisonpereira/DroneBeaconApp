import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  mgrs?: string | null;
  status: 'Standby' | 'OnMission' | 'ReturnToBase';
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  altitude: null,
  mgrs: null,
  status: 'Standby',
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
        altitude: number;
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
