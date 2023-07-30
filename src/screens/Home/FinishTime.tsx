import { Pressable, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '../../config/firebase';

import { Avatar } from 'react-native-paper';

const EndTime = () => {
    const users = Array.from({ length: 15 }, (_, index) =>
        (index + 1).toString(),
    );
    const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;

    const handleFinishingTime = async (userNr: string) => {
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                finishingTime: Date.now(),
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {users.map((userNr) => (
                    <View key={userNr} style={styles.finishingGridItem}>
                        <Pressable onPress={() => handleFinishingTime(userNr)}>
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
