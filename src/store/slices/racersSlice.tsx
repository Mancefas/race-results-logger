import {
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
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

// Async thunk for add the starting time in Firebase
export const handleStartingTime = createAsyncThunk(
    'racers/updateStartingTime',
    async (userNr: string) => {
        const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;
        const startingTime = Date.now(); // Generate the timestamp dynamically
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                startingTime,
            });
            return { userNr, startingTime }; // Return both userNr and startingTime
        } catch (error) {
            throw new Error('Failed to update starting time.');
        }
    },
);

// Async thunk for add the finishing time in Firebase
export const handleFinishingTime = createAsyncThunk(
    'racers/updateFinishingTime',
    async (userNr: string) => {
        const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;
        const finishingTime = Date.now(); // Generate the timestamp dynamically
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                finishingTime,
            });
            return { userNr, finishingTime }; // Return both userNr and finishingTime
        } catch (error) {
            throw new Error('Failed to update finishing time.');
        }
    },
);

export const selectRacers = (state: RootState) => state.racers.value;

export const selectRacersWithoutStartTime = createSelector(
    selectRacers,
    (racers) =>
        racers
            .filter((racer) => racer.startingTime === null)
            .map((racer) => racer.id),
);

export const racersWithoutFinishTime = createSelector(selectRacers, (racers) =>
    racers
        .filter(
            (racer) =>
                racer.startingTime !== null && racer.finishingTime === null,
        )!
        .map((racer) => racer.id),
);

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
                startingTime: null as number | null,
                finishingTime: null as number | null,
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
            })
            // Handle adding Starting time
            .addCase(handleStartingTime.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(handleStartingTime.fulfilled, (state, action) => {
                state.loading = false;
                const { userNr, startingTime } = action.payload;
                const racerToUpdate = state.value.find(
                    (racer) => racer.id === userNr,
                );
                if (racerToUpdate) {
                    racerToUpdate.startingTime = startingTime;
                }
            })
            .addCase(handleStartingTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            // Handle adding finishing time
            .addCase(handleFinishingTime.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(handleFinishingTime.fulfilled, (state, action) => {
                state.loading = false;
                const { userNr, finishingTime } = action.payload;
                const racerToUpdate = state.value.find(
                    (racer) => racer.id === userNr,
                );
                if (racerToUpdate) {
                    racerToUpdate.finishingTime = finishingTime;
                }
            })
            .addCase(handleFinishingTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default racersSlice.reducer;
