import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux/';
import {
    racersWithoutStartTime,
    handleStartingTime,
} from '../../store/slices/racersSlice';
import type { AppDispatch } from '../../../App';
import { startButtonColor } from '../../utils/constants/cssConstants';

const StartTime = () => {
    const racersToStart = useSelector(racersWithoutStartTime);

    const dispatch: AppDispatch = useDispatch();

    const handlePress = (userNr: string) => {
        dispatch(handleStartingTime(userNr));
    };

    return (
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
    gridItem: {
        flexBasis: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});

export default StartTime;
