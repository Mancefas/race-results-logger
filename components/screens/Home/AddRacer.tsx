import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text  } from 'react-native-paper';

const AddRacer = () => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [startNr, setStartNr] = React.useState("");

  const bicycleTypes = ['mtb', 'gravel'];
  const racingGroups = ['M', 'M40', 'W'];

  return (
    <View style={styles.addRacerContainer}>
      <TextInput
        style={styles.addRacerInput}
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        mode='outlined'
      />

      <TextInput
        style={styles.addRacerInput}
        label="Surname"
        value={surname}
        onChangeText={text => setSurname(text)}
        mode='outlined'
      />
      
      <TextInput
        style={styles.addRacerInput}
        label="Starting nr"
        value={startNr}
        onChangeText={text => setStartNr(text)}
        mode='outlined'
      />

      <View style={styles.addRacerChoosingContainer}>

        <View>
        <Text variant='displaySmall'>
          Bicycle
        </Text>
        <View style={styles.buttonsContainer}>
        {bicycleTypes.map((bicycle, i) => (
          <Button key={i}>
            {bicycle.toUpperCase()}
          </Button>
        ))}
        </View>
        </View>

      <View>
        <Text variant='displaySmall'>
          Group
        </Text>
        <View style={styles.buttonsContainer}>
        {racingGroups.map((group, i) => (
          <Button key={i}>
            {group.toUpperCase()}
          </Button>
        ))}
        </View>
      </View>

      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  addRacerContainer: {
    height:'100%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    rowGap: 15,
  },
  addRacerInput: {
    width: '65%'
  },
  addRacerChoosingContainer:{
    width:'65%'
  },
  buttonsContainer: {
    flexDirection:'row',
    alignSelf:'center',
  }
})

export default AddRacer