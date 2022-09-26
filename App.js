import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Formulario from './components/Formulario';
import Listar from './components/Listar';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
    <Stack.Navigator >
      <Stack.Screen name="Formulario" component={Formulario} options={{ headerShown: false}}/>
      <Stack.Screen name="Listar" component={Listar} options={{ headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}