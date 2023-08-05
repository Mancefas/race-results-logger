import {
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { getDocs, collection } from 'firebase/firestore';
import RootState from '../../types/types';
import { firebaseDB } from '../../config/firebase';

// Async thunk for fetching data from Firebase
export const fetchRacers = createAsyncThunk('racers/fetchRacers', async () => {
    const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;
    const data = await getDocs(collection(firebaseDB, dbName));
    const dataToArrayOfRacers = data.docs.map((doc) => ({
        id: doc.id,
        bicycle: doc.data().bicycle || '', // Set a default value if not present
        group: doc.data().group || '', // Set a default value if not present
        name: doc.data().name || [], // Set a default value if not present
        startingTime: doc.data().startingTime || null, // Set a default value if not present
        finishingTime: doc.data().finishingTime || null, // Set a default value if not present
    }));
    return dataToArrayOfRacers;
});

// export const selectRacersWithoutStartTime = (state) => state.racers.value;

export const racersSlice = createSlice({
    name: 'racers',
    initialState: {
        loading: false,
        error: '',
        value: [
            {
                id: '',
                bicycle: '',
                group: '',
                name: [],
                startingTime: null,
                finishingTime: null,
            },
        ],
    },
    reducers: {
        // Your other reducers, if any
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRacers.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchRacers.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchRacers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default racersSlice.reducer;
