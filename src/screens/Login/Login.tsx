import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword  } from 'firebase/auth'
import { auth } from '../../config/firebase';

const Login = () => {  

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleLogin = async () => {
    try {
     await signInWithEmailAndPassword(auth, email, password )
     setError('')
    } catch (error: any) { // pakeisti i kita type
       if(error.message.includes('auth/user-not-found')){
          setError('no user')
       } else if(error.message.includes('auth/wrong-password')) {
        setError('wrong password')
       } else {
        setError('error')
        console.error(error)
       }        
    }

  }

    return (
        <View style={styles.container}>
          <Text variant="displayMedium">Prisijungti</Text>
          <View style={styles.inputsContainer}>
            <TextInput
            style={styles.inputEmail}
            label="Email"
            mode='outlined'
            value={email}
            onChangeText={setEmail}
             />
            <TextInput
            label="Password"
            style={styles.inputEmail}
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
            mode='outlined'
             />
             {error && <Text style={styles.errorMessage}>{error}</Text>}
            <Button
             mode="contained"
             style={styles.inputButton}
            onPress={handleLogin }
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
    },
    errorMessage: {
      color:'red',
      marginVertical: 10,
      textAlign:'center'
    }
  });