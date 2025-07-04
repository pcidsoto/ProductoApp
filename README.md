# 📱 ProductoApp - App React Native con Login (Expo)

ProductoApp es una app de ejemplo en React Native construida con Expo. Permite autenticarse mediante una API externa (`/api/auth/login`) y navegar a una pantalla de productos. Usa una estructura simple basada en `views`.

---

## 📁 Estructura del Proyecto

```
ProductoApp/
├── views/
│   ├── LoginView.js
│   └── ProductoListView.js
├── App.js
├── package.json
└── ...
```

---

## 🚧 Requisitos Previos

- Node.js
- Expo CLI: `npm install -g expo-cli`

---

## 🚀 Cómo recrear el proyecto paso a paso

### 1. Crear el proyecto con Expo

```bash
expo init ProductoAPP
choose a template >> blank
cd ProductoApp
```

```información necesaria para ejecutar la app
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios # requires an iOS device or macOS for access to an iOS simulator
- npm run web
```

---

### 2. Instalar dependencias necesarias

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo install axios
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install @react-navigation/native @react-navigation/native-stack
```

---

### 3. Crear estructura de carpetas

```bash
mkdir views
```

---

### 4. Crear el archivo `views/LoginScreen.js`

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
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      setMensaje('Login exitoso');
      // navigation.navigate('Productos', { token: res.data.token });
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

---

### 6. Configurar navegación en `App.js`

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './views/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🌐 Ejecutar la app en navegador (web)

```bash
npx expo start --web
```

Esto abrirá `http://localhost:19006` con la app corriendo en el navegador.

---

## 📲 Ejecutar la app en móvil

```bash
npx expo start
```

Escanea el QR con la app **Expo Go** desde tu celular conectado a la misma red Wi-Fi que tu PC.

---

## 🧪 Datos de prueba

Asegúrate de que tu API esté corriendo en el backend (`APILogin`) con:

- Email: `test@ejemplo.com`
- Password: `123456`

Reemplaza `http://TU_IP_LOCAL:3000` por tu IP real visible con `ipconfig` o `ifconfig`.

---

## 🛡️ Ideas futuras

- Guardar token en `AsyncStorage`
- Proteger rutas con sesión activa
- Mostrar productos reales desde API

---

## 📄 Licencia

MIT