import {useState} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { Avatar } from 'react-native-paper';

const StartTime = () => {
  const users = Array.from({ length: 25 }, (_, index) => (index + 1).toString());
 


  return (
    <View style={styles.container}>
    <View style={styles.gridContainer}>
      {users.map((userNr) => (
        <View key={userNr} style={styles.gridItem}>
          <Avatar.Text style={styles.startNrAvatar} size={70} label={userNr} />
        </View>
      ))}
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {    
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
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
    backgroundColor:'green'
  }
});

export default StartTime