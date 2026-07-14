import React from 'react';
import { AppProvider } from './src/core/providers/AppProvider';
import { AppNavigator } from './src/core/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
