import {
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import {
    getDocs,
    collection,
    updateDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
import RootState from '../../types/types';
import { firebaseDB } from '../../config/firebase';

const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;

// Async thunk for fetching data from Firebase
export const fetchRacers = createAsyncThunk('racers/fetchRacers', async () => {
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

// Async thunk for adding a racer to Firebase
export const addRacerToDatabase = createAsyncThunk(
    'racers/addRacerToDatabase',
    async (racerData: RootState['racers']['value'][0]) => {
        const newRacer = {
            ...racerData,
            startingTime: null,
            finishingTime: null,
        };
        try {
            await setDoc(doc(firebaseDB, dbName, racerData.id), newRacer);
            return newRacer; // Return the added racer data to update the Redux store
        } catch (error) {
            throw new Error('Failed to add the racer.');
        }
    },
);

// Async thunk for add the starting time in Firebase
export const handleStartingTime = createAsyncThunk(
    'racers/updateStartingTime',
    async (userNr: string) => {
        const startingTime = Date.now(); // Generate the timestamp dynamically
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                startingTime,
            });
            return { userNr, startingTime }; // Return both userNr and startingTime
        } catch (error: any) {
            throw new Error(
                'Failed to update starting time.' + '(' + error.message + ')',
            );
        }
    },
);

// Async thunk for add the finishing time in Firebase
export const handleFinishingTime = createAsyncThunk(
    'racers/updateFinishingTime',
    async (userNr: string) => {
        const finishingTime = Date.now(); // Generate the timestamp dynamically
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                finishingTime,
            });
            return { userNr, finishingTime }; // Return both userNr and finishingTime
        } catch (error: any) {
            throw new Error(
                'Failed to update finishing time.' + '(' + error.message + ')',
            );
        }
    },
);

export const handleEditRacer = createAsyncThunk(
    'racers/handleEditRacer',
    async (racerData: RootState['racers']['value'][0]) => {
        const updatedData = {
            id: racerData.id,
            group: racerData.group,
            bicycle: racerData.bicycle,
            name: racerData.name,
        };

        try {
            await updateDoc(doc(firebaseDB, dbName, racerData.id), updatedData);
            return updatedData;
        } catch {
            throw new Error('Failed to update finishing time.');
        }
    },
);

export const allRacers = (state: RootState) => state.racers.value;

export const sortedByIdAllRacers = createSelector(allRacers, (racers) =>
    [...racers].sort((a, b) => +a.id - +b.id),
);

export const racersWithoutStartTime = createSelector(allRacers, (racers) =>
    racers
        .filter((racer) => racer.startingTime === null)
        .map((racer) => racer.id)
        .sort((a, b) => +a - +b),
);

export const racersWithoutFinishTime = createSelector(allRacers, (racers) =>
    racers
        .filter(
            (racer) =>
                racer.startingTime !== null && racer.finishingTime === null,
        )
        .map((racer) => racer.id)
        .sort((a, b) => +a - +b),
);

export const racersSlice = createSlice({
    name: 'racers',
    initialState: {
        loading: false,
        error: '',
        value: [] as RootState['racers']['value'],
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
            // Handle adding a racer to Firebase
            .addCase(addRacerToDatabase.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(addRacerToDatabase.fulfilled, (state, action) => {
                state.loading = false;
                state.value.push(action.payload);
            })
            .addCase(addRacerToDatabase.rejected, (state, action) => {
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
            })
            // Handle edit racer
            .addCase(handleEditRacer.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(handleEditRacer.fulfilled, (state, action) => {
                state.loading = false;

                const editedRacerToUpdate = state.value.find((racer) => {
                    racer.id === action.payload.id;
                });
                if (editedRacerToUpdate) {
                    editedRacerToUpdate.id = action.payload.id;
                    editedRacerToUpdate.bicycle = action.payload.bicycle;
                    editedRacerToUpdate.group = action.payload.group;
                    editedRacerToUpdate.name = action.payload.name;
                }
            })
            .addCase(handleEditRacer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default racersSlice.reducer;
