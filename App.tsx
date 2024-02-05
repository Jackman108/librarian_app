import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthorsScreen from './src/screens/AuthorsScreen';
import BooksScreen from './src/screens/BooksScreen';
import { RootStackParamList } from './navigationTypes'; 
import LoadingScreen from './src/screens/LoadingScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>        
      {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Books" component={BooksScreen} />
            <Stack.Screen name="Authors" component={AuthorsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;