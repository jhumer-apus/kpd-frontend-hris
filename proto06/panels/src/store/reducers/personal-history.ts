import { createReducer, createSlice } from '@reduxjs/toolkit';
import { UPDATE_RELATIVES } from '../actions/personal-history';

interface PersonalHistory {
    relatives: any[];
}
const initialState: PersonalHistory = { 
    relatives: [] 
};

const personalHistoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(UPDATE_RELATIVES, (state, action) => {
            state.relatives = action.payload?? [];
        })
});

export default personalHistoryReducer;