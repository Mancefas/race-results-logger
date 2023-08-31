import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux/';
import {
    racersWithoutStartTime,
    handleStartingTime,
} from '../../store/slices/racersSlice';
import RootState from '../../types/types';
import type { AppDispatch } from '../../../App';
import { startButtonColor } from '../../utils/constants/cssConstants';

const StartTime = () => {
    const racersToStart = useSelector(racersWithoutStartTime);
    const loading = useSelector((state: RootState) => state.racers.loading);
    const error = useSelector((state: RootState) => state.racers.error);

    const [errorState, setErrorState] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const handlePress = (userNr: string) => {
        dispatch(handleStartingTime(userNr));
    };

    useEffect(() => {
        setErrorState(error);

        setTimeout(() => {
            setErrorState('');
        }, 4000);
    }, [error]);

    return (
        <>
            {errorState && (
                <Text
                    style={{ textAlign: 'center', color: 'red', marginTop: 10 }}
                >
                    {errorState}
                </Text>
            )}
            <Modal visible={loading}>
                <ActivityIndicator size="large" color={startButtonColor} />
            </Modal>

            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {racersToStart.map((userNr) => (
                        <View key={userNr} style={styles.gridItem}>
                            <Button
                                onPress={() => handlePress(userNr)}
                                mode="contained-tonal"
                                buttonColor={startButtonColor}
                                textColor="white"
                                style={{ paddingVertical: 15 }}
                                rippleColor={startButtonColor}
                            >
                                {userNr}
                            </Button>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        flexBasis: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});

export default StartTime;
