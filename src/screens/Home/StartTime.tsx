import { StyleSheet, View, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '../../config/firebase';

import { Avatar } from 'react-native-paper';

const StartTime = () => {
    const users = Array.from({ length: 25 }, (_, index) =>
        (index + 1).toString(),
    );
    const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;

    const handleStartingTime = async (userNr: string) => {
        try {
            await updateDoc(doc(firebaseDB, dbName, userNr), {
                startingTime: Date.now(),
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {users.map((userNr) => (
                    <View key={userNr} style={styles.gridItem}>
                        <Pressable onPress={() => handleStartingTime(userNr)}>
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
