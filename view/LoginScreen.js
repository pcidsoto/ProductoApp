import axios from 'axios';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const login = async () => {
        console.log('Intentando iniciar sesión con:', { email, password });
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
            });
        setMensaje('Login exitoso');
        navigation.navigate('Productos', { token: res.data.token });
        } catch (err) {
            setMensaje('Error: ' + (err.response?.data?.message || err.message));
        }
    };

return (
    <View style={{ padding: 20 }}>
        <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
        <TextInput placeholder="Contraseña" onChangeText={setPassword} value={password} secureTextEntry />
        <Button title="Iniciar sesión" onPress={login} />
        <Text>{mensaje}</Text>
    </View>
    );
}
