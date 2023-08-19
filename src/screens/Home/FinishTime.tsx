import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App';
import {
    racersWithoutFinishTime,
    handleFinishingTime,
} from '../../store/slices/racersSlice';
import { finishButtonColor } from '../../utils/constants/cssConstants';

const EndTime = () => {
    const racers = useSelector(racersWithoutFinishTime);
    const dispatch: AppDispatch = useDispatch();

    const handlePress = (userNr: string) => {
        dispatch(handleFinishingTime(userNr));
    };

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {racers.map((userNr) => (
                    <View key={userNr} style={styles.finishingGridItem}>
                        <Button
                            onPress={() => handlePress(userNr)}
                            mode="contained-tonal"
                            buttonColor={finishButtonColor}
                            style={{ paddingVertical: 15 }}
                        >
                            {userNr}
                        </Button>
                    </View>
                ))}
            </View>
        </View>
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
