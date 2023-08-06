import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App';
import {
    racersWithoutFinishTime,
    handleFinishingTime,
} from '../../store/slices/racersSlice';

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
                        <Pressable onPress={() => handlePress(userNr)}>
                            <Avatar.Text size={70} label={userNr} />
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
    finishingGridItem: {
        flexBasis: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        color: 'green',
    },
});

export default EndTime;
