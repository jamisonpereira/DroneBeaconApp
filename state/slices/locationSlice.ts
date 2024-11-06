import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  droneLatitude: number | null;
  droneLongitude: number | null;
  droneAltitude: number | null;
  droneMgrs?: string | null;
  myLatitude: number | null;
  myLongitude: number | null;
  myAltitude: number | null;
  myMgrs?: string | null;
  baseLatitude: number | null;
  baseLongitude: number | null;
  baseAltitude: number | null;
  baseMgrs?: string | null;
  missionStatus: 'Standby' | 'OnMission' | 'ReturnToBase';
  distanceMeToDrone?: number | null;
}

const initialState: LocationState = {
  droneLatitude: null,
  droneLongitude: null,
  droneAltitude: null,
  droneMgrs: null,
  myLatitude: null,
  myLongitude: null,
  myAltitude: null,
  myMgrs: null,
  baseLatitude: null,
  baseLongitude: null,
  baseAltitude: null,
  baseMgrs: null,
  missionStatus: 'ReturnToBase',
  distanceMeToDrone: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setDroneLocation: (
      state,
      action: PayloadAction<{
        droneLatitude: number;
        droneLongitude: number;
        droneAltitude: number;
        droneMgrs?: string;
      }>
    ) => {
      state.droneLatitude = action.payload.droneLatitude;
      state.droneLongitude = action.payload.droneLongitude;
      state.droneMgrs = action.payload.droneMgrs
        ? action.payload.droneMgrs
        : null;
    },
    setMyLocation: (
      state,
      action: PayloadAction<{
        myLatitude: number;
        myLongitude: number;
        myAltitude: number;
        myMgrs?: string;
      }>
    ) => {
      state.myLatitude = action.payload.myLatitude;
      state.myLongitude = action.payload.myLongitude;
      state.myAltitude = action.payload.myAltitude;
      state.myMgrs = action.payload.myMgrs ? action.payload.myMgrs : null;
    },
    setBaseLocation: (
      state,
      action: PayloadAction<{
        baseLatitude: number;
        baseLongitude: number;
        baseAltitude: number;
        baseMgrs?: string;
      }>
    ) => {
      state.baseLatitude = action.payload.baseLatitude;
      state.baseLongitude = action.payload.baseLongitude;
      state.baseAltitude = action.payload.baseAltitude;
      state.baseMgrs = action.payload.baseMgrs ? action.payload.baseMgrs : null;
    },
    setDistanceMeToDrone: (
      state,
      action: PayloadAction<{ distanceMeToDrone: number }>
    ) => {
      state.distanceMeToDrone = action.payload.distanceMeToDrone;
    },
  },
});

export const {
  setDroneLocation,
  setMyLocation,
  setBaseLocation,
  setDistanceMeToDrone,
} = locationSlice.actions;

export default locationSlice.reducer;
