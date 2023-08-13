import { useState } from 'react';
import { StyleSheet, View, Pressable, Modal } from 'react-native';
import {
    Avatar,
    TextInput,
    Button,
    Text,
    SegmentedButtons,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux/';
import { allRacers, handleEditRacer } from '../../store/slices/racersSlice';
import { AppDispatch } from '../../../App';

const EditRacer = () => {
    const racers = useSelector(allRacers);
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

    type propsItems = {
        id: string;
        name: string[];
        bicycle: string;
        group: string;
    };

    const handleItemPress = ({ id, name, bicycle, group }: propsItems) => {
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
        <>
            <View style={styles.container}>
                <View style={styles.gridContainer}>
                    {racers.map((racer) => (
                        <View key={racer.id} style={styles.gridItem}>
                            <Pressable
                                onPress={() =>
                                    handleItemPress({
                                        id: racer.id,
                                        name: racer.name,
                                        bicycle: racer.bicycle,
                                        group: racer.group,
                                    })
                                }
                            >
                                <Avatar.Text
                                    style={styles.startNrAvatar}
                                    size={70}
                                    label={racer.id}
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisisble(false)}
            >
                <View style={styles.addRacerContainer}>
                    <Button
                        onPress={() => setIsModalVisisble(false)}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        X
                    </Button>
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
        padding: 10,
    },
    startNrAvatar: {
        backgroundColor: 'red',
    },
    addRacerContainer: {
        height: '75%',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
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
