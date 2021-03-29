import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store';

const persistor = persistStore(store);
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const dropdown = useRef<DropdownAlert>(null);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation colorScheme={colorScheme} />
              <DropdownAlert ref={dropdown} closeInterval={5000} />
              <StatusBar />
            </PersistGate>
          </ReduxProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
