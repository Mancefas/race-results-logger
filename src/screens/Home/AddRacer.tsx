import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import { useDispatch } from 'react-redux/';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../../App';
import { addRacerToDatabase } from '../../store/slices/racersSlice';

const AddRacer = () => {
    const [fName, setFName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [bicycle, setBicycle] = useState<string>('');
    const [group, setGroup] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    const { t } = useTranslation();

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

    const handleSubmitRacer = async () => {
        if (hasAllInputs) {
            try {
                const racerData = {
                    id,
                    bicycle,
                    group,
                    name: [fName, surname],
                };
                await dispatch(addRacerToDatabase(racerData));

                // Clear input fields after successful addition
                setFName('');
                setSurname('');
                setId('');
                setBicycle('');
                setGroup('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const hasAllInputs = !!fName && !!surname && !!id && !!bicycle && !!group;

    return (
        <View style={styles.addRacerContainer}>
            <TextInput
                style={styles.addRacerInput}
                label={t('addRacer:startingNr')}
                value={id}
                onChangeText={(number) => setId(number)}
                mode="outlined"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.addRacerInput}
                label={t('addRacer:name')}
                value={fName}
                onChangeText={setFName}
                mode="outlined"
            />

            <TextInput
                style={styles.addRacerInput}
                label={t('addRacer:surname')}
                value={surname}
                onChangeText={setSurname}
                mode="outlined"
            />

            <View style={styles.addRacerChoosingContainer}>
                <View style={styles.addRacerSelectContainer}>
                    <Text variant="displaySmall">{t('addRacer:bicycle')}</Text>
                    <SegmentedButtons
                        value={bicycle}
                        onValueChange={setBicycle}
                        buttons={bicycleTypes}
                    />
                </View>

                <View style={styles.addRacerSelectContainer}>
                    <Text variant="displaySmall">{t('addRacer:group')}</Text>
                    <SegmentedButtons
                        value={group}
                        onValueChange={setGroup}
                        buttons={racingGroups}
                    />
                </View>
                <Button
                    onPress={handleSubmitRacer}
                    mode="contained"
                    disabled={!hasAllInputs}
                >
                    {t('addRacer:addButton')}
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

export default AddRacer;
