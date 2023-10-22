import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { t } = useTranslation();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError('');
        } catch (error: any) {
            if (error.message.includes('auth/user-not-found')) {
                setError(t('login:errNoUser'));
            } else if (error.message.includes('auth/wrong-password')) {
                setError(t('login:errWrongPassword'));
            } else {
                setError(t('login:errRandom'));
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Icon name="login" size={30} style={styles.icon} />
            <Text variant="displayMedium">{t('login:login')}</Text>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.inputEmail}
                    label={t('login:email')}
                    mode="outlined"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    label={t('login:password')}
                    style={styles.inputEmail}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    mode="outlined"
                />
                {error && <Text style={styles.errorMessage}>{error}</Text>}
                <Button
                    mode="contained"
                    style={styles.inputButton}
                    onPress={handleLogin}
                >
                    {t('login:login')}
                </Button>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    icon:{
        color: '#000000',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputsContainer: {
        flexDirection: 'column',
        width: '75%',
    },
    inputEmail: {
        marginBottom: 15,
    },
    inputButton: {
        borderRadius: 4,
    },
    errorMessage: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
    },
});
