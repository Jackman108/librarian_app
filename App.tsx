import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthorsScreen from './src/screens/AuthorsScreen';
import BooksScreen from './src/screens/BooksScreen';
import { RootStackParamList } from './navigationTypes'; // Обновите путь

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="Authors" component={AuthorsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;