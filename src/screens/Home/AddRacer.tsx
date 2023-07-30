import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import Constants from 'expo-constants';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../../config/firebase';

const AddRacer = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [startNr, setStartNr] = useState<string>('');
    const [bicycle, setBicycle] = useState<string>('');
    const [group, setGroup] = useState<string>('');

    const dbName = Constants.expoConfig?.extra?.firebaseDbCollectionName;

    const bicycleTypes = ['mtb', 'gravel'];
    const racingGroups = ['M', 'M40', 'W'];

    const handleSubmitRacer = async () => {
        try {
            await setDoc(doc(firebaseDB, dbName, startNr), {
                bicycle: bicycle,
                group: group,
                name: [name, surname],
            });
        } catch (error) {
            console.log(error);
        } finally {
            setName('');
            setSurname('');
            setStartNr('');
            setBicycle('');
            setGroup('');
        }
    };

    const hasAllInputs =
        !!name && !!surname && !!startNr && !!bicycle && !!group;

    return (
        <View style={styles.addRacerContainer}>
            <TextInput
                style={styles.addRacerInput}
                label="Starting nr"
                value={startNr}
                onChangeText={(number) => setStartNr(number)}
                mode="outlined"
                // keyboardType="numeric"
            />
            <TextInput
                style={styles.addRacerInput}
                label="Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
            />

            <TextInput
                style={styles.addRacerInput}
                label="Surname"
                value={surname}
                onChangeText={setSurname}
                mode="outlined"
            />

            <View style={styles.addRacerChoosingContainer}>
                <View>
                    <Text variant="displaySmall">Bicycle</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setGroup(newValue)}
                        value={group}
                    >
                        <View style={styles.selectButtonsGroup}>
                            {bicycleTypes.map((bicycle, i) => (
                                <View key={i}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {bicycle.toUpperCase()}
                                    </Text>
                                    <RadioButton value={bicycle} />
                                </View>
                            ))}
                        </View>
                    </RadioButton.Group>
                </View>

                <View>
                    <Text variant="displaySmall">Group</Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setBicycle(newValue)}
                        value={bicycle}
                    >
                        <View style={styles.selectButtonsGroup}>
                            {racingGroups.map((group, i) => (
                                <View key={i}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {group}
                                    </Text>
                                    <RadioButton value={group} />
                                </View>
                            ))}
                        </View>
                    </RadioButton.Group>
                </View>
                <Button
                    onPress={handleSubmitRacer}
                    mode="contained"
                    disabled={!hasAllInputs}
                >
                    Įvesti
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    addRacerContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 15,
    },
    addRacerInput: {
        width: '65%',
    },
    addRacerChoosingContainer: {
        width: '65%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    selectButtonsGroup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default AddRacer;
