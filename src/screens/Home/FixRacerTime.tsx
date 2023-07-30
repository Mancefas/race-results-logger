import { StyleSheet, View, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';

const FixRacerTime = () => {
  const users = Array.from({ length: 10 }, (_, index) => (index + 1).toString());

  return (
    <View style={{alignItems:'center', justifyContent: 'center', flex:1}}>
      <View style={styles.gridContainer}>
      {users.map((userNr) => (
        <View key={userNr} style={styles.fixingGridItem}>
          <Pressable><Avatar.Text size={70} label={userNr} /></Pressable>
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
  fixingGridItem: {
    flexBasis: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color:'red',
  },
});

export default FixRacerTime