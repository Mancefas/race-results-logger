import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App';
import {
    racersWithoutFinishTime,
    handleFinishingTime,
} from '../../store/slices/racersSlice';
import { finishButtonColor } from '../../utils/constants/cssConstants';
import RootState from '../../types/types';

const EndTime = () => {
    const racers = useSelector(racersWithoutFinishTime);
    const dispatch: AppDispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.racers.loading);
    const error = useSelector((state: RootState) => state.racers.error);

    const [errorState, setErrorState] = useState('');

    const handlePress = (userNr: string) => {
        dispatch(handleFinishingTime(userNr));
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
                <ActivityIndicator size="large" color={finishButtonColor} />
            </Modal>
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {racers.map((userNr) => (
                        <View key={userNr} style={styles.finishingGridItem}>
                            <Button
                                onPress={() => handlePress(userNr)}
                                mode="contained-tonal"
                                textColor="white"
                                buttonColor={finishButtonColor}
                                style={{ paddingVertical: 15 }}
                                rippleColor={finishButtonColor}
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
    finishingGridItem: {
        flexBasis: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});

export default EndTime;
