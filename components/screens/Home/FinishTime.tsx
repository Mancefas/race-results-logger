import { StyleSheet, View } from 'react-native';

import { Avatar } from 'react-native-paper';

const EndTime = () => {
  const users = Array.from({ length: 15 }, (_, index) => (index + 1).toString());
 


  return (
    <View style={styles.container}>
    <View style={styles.gridContainer}>
      {users.map((userNr) => (
        <View key={userNr} style={styles.finishingGridItem}>
          <Avatar.Text size={70} label={userNr} />
        </View>
      ))}
    </View>
  </View>
  )
}

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
  finishingGridItem: {
    flexBasis: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color:'green',
  },
});

export default EndTime