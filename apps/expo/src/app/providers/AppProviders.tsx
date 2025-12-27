import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from '../navigation/RootNavigator';
import { AuthProvider } from '../../features/auth/model/auth-context';
import { EncryptedChatProvider } from '../../features/chat/model/EncryptedChatProvider';
import { useRobotoMono } from '../../shared/hooks/useRobotoMono';
import { Screen } from '../../shared/ui/Screen';

export const AppProviders: React.FC = () => {
  const fontsLoaded = useRobotoMono();

  if (!fontsLoaded) {
    return <Screen padded={false} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AuthProvider>
          <EncryptedChatProvider>
            <StatusBar style="dark" />
            <AppNavigator />
          </EncryptedChatProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppProviders;
