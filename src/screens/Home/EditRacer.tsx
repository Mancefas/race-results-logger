import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    TextInput,
    Button,
    Text,
    SegmentedButtons,
    Portal,
    Modal,
    PaperProvider,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux/';
import {
    sortedByIdAllRacers,
    handleEditRacer,
} from '../../store/slices/racersSlice';
import { AppDispatch } from '../../../App';
import RootState from '../../types/types';
import { fixButtonColor } from '../../utils/constants/cssConstants';

const EditRacer = () => {
    const racers = useSelector(sortedByIdAllRacers);

    const [isModalVisible, setIsModalVisisble] = useState(false);
    const [fName, setFName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [bicycle, setBicycle] = useState<string>('');
    const [group, setGroup] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    const bicycleTypes = [
        {
            value: 'mtb',
            label: 'mtb',
        },
        {
            value: 'gravel',
            label: 'gravel',
        },
    ];

    const racingGroups = [
        {
            value: 'M',
            label: 'M',
        },
        {
            value: 'M40',
            label: 'M40',
        },
        {
            value: 'W',
            label: 'W',
        },
    ];

    const handleItemPress = ({
        id,
        name,
        bicycle,
        group,
    }: RootState['racers']['value'][0]) => {
        setIsModalVisisble(true);
        setFName(name[0]);
        setSurname(name[1]);
        setId(id);
        setBicycle(bicycle);
        setGroup(group);
    };

    const handleSubmitEditedRacer = async () => {
        try {
            const racerData = {
                id,
                bicycle,
                group,
                name: [fName, surname],
            };
            await dispatch(handleEditRacer(racerData));
        } catch (error) {
            console.log(error);
        } finally {
            setIsModalVisisble(false);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {racers.map((racer) => (
                        <View key={racer.id} style={styles.gridItem}>
                            <Button
                                onPress={() =>
                                    handleItemPress({
                                        id: racer.id,
                                        name: racer.name,
                                        bicycle: racer.bicycle,
                                        group: racer.group,
                                    })
                                }
                                mode="contained-tonal"
                                buttonColor={fixButtonColor}
                                style={{ paddingVertical: 15 }}
                            >
                                {racer.id}
                            </Button>
                        </View>
                    ))}
                </View>
            </View>

            <Portal>
                <Modal
                    visible={isModalVisible}
                    onDismiss={() => setIsModalVisisble(false)}
                >
                    <View style={styles.addRacerContainer}>
                        <Text>Starting nr</Text>
                        <Text variant="displaySmall">{id}</Text>
                        <TextInput
                            style={styles.addRacerInput}
                            label="Name"
                            value={fName}
                            onChangeText={setFName}
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
                            <View style={styles.addRacerSelectContainer}>
                                <Text variant="displaySmall">Bicycle</Text>
                                <SegmentedButtons
                                    value={bicycle}
                                    onValueChange={setBicycle}
                                    buttons={bicycleTypes}
                                />
                            </View>

                            <View style={styles.addRacerSelectContainer}>
                                <Text variant="displaySmall">Group</Text>
                                <SegmentedButtons
                                    value={group}
                                    onValueChange={setGroup}
                                    buttons={racingGroups}
                                />
                            </View>
                            <Button
                                onPress={handleSubmitEditedRacer}
                                mode="contained"
                            >
                                Change
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </PaperProvider>
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
    startNrAvatar: {
        backgroundColor: 'red',
    },
    addRacerContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 15,
        rowGap: 15,
        backgroundColor: 'white',
    },
    addRacerInput: {
        width: '65%',
    },
    addRacerChoosingContainer: {
        width: '65%',
        rowGap: 30,
    },
    addRacerSelectContainer: {
        rowGap: 10,
    },
    selectButtonsGroup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default EditRacer;
