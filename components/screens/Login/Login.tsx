import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-paper/lib/typescript/src/components/Icon';
import { Text, TextInput, Button } from 'react-native-paper';

const Login = () => {

    return (
        <View style={styles.container}>
          <Text variant="displayMedium">Prisijungti</Text>
          <View style={styles.inputsContainer}>
            <TextInput
            style={styles.inputEmail}
            label="Email"
            value={''}
            mode='outlined'
             />
            <TextInput
            label="Password"
            style={styles.inputEmail}
            value={''}
            secureTextEntry 
            mode='outlined'
             />
            <Button
             mode="contained"
             style={styles.inputButton}
            
             >
              PRISIJUNGTI
              </Button>
          </View>
          
        </View>
      );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputsContainer: {
      flexDirection: 'column',
      width: '75%'
    },
    inputEmail:{
      marginBottom: 15,
    },
    inputButton: {
      borderRadius:4
    }
  });