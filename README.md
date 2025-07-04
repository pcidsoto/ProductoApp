# 📱 ProductoApp - App en React Native con Login y Navegación

ProductoApp es una aplicación construida con React Native (usando Expo), que permite iniciar sesión a través de una API externa y navegar a una lista de productos. Esta guía te mostrará cómo recrear el proyecto desde cero.

---

## 🚧 Requisitos Previos

- Node.js instalado
- Expo CLI (`npm install -g expo-cli`)
- Editor de código (Visual Studio Code recomendado)
- Cuenta en GitHub (opcional para versionado)
- Backend API de login funcionando (como [APILogin](https://github.com/pcidsoto/APILogin))

---

## 🚀 Pasos para crear el proyecto

### 1. Crear el proyecto con Expo

```bash
npx create-expo-app ProductoApp
cd ProductoApp
```

---

### 2. Instalar dependencias necesarias

```bash
npm install axios
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

---

### 3. Crear estructura de carpetas

```bash
mkdir screens
```

---

### 4. Crear las pantallas base

#### `screens/LoginScreen.js`
```js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://TU_IP_LOCAL:3000/api/auth/login', {
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
```

#### `screens/ProductoListScreen.js`
```js
import React from 'react';
import { View, Text } from 'react-native';

export default function ProductoListScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Lista de productos</Text>
    </View>
  );
}
```

---

### 5. Configurar navegación en `App.js`

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProductoListScreen from './screens/ProductoListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Productos" component={ProductoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

### 6. Ejecutar la app

```bash
npx expo start
```

📱 Escanea el QR con la app Expo Go o presiona `w` para abrir en el navegador.

---

## 🧪 Prueba de login

Usa estos datos con tu backend:

- **Email**: `test@ejemplo.com`
- **Password**: `123456`

---

## 🔧 Consejos

- Reemplaza `http://TU_IP_LOCAL:3000/...` por la IP real de tu PC (usa `ipconfig` o `ifconfig`).
- Asegúrate que tu celular esté en la misma red que tu backend.

---

## 🛡️ Futuras mejoras

- Guardar token en almacenamiento seguro (`AsyncStorage`)
- Validar sesión y proteger rutas
- Mostrar productos reales desde un endpoint protegido

---

## 📄 Licencia

MIT