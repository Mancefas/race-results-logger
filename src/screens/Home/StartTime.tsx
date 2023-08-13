import { StyleSheet, View, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux/';
import {
    racersWithoutStartTime,
    handleStartingTime,
} from '../../store/slices/racersSlice';
import type { AppDispatch } from '../../../App';

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
                        <Pressable onPress={() => handlePress(userNr)}>
                            <Avatar.Text
                                style={styles.startNrAvatar}
                                size={70}
                                label={userNr}
                            />
                        </Pressable>
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
        padding: 10,
    },
    startNrAvatar: {
        backgroundColor: 'green',
    },
});

export default StartTime;
