import '@testing-library/jest-native/extend-expect';
import 'react-native/jest/setup';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValue(true),
  isLoaded: jest.fn().mockReturnValue(true),
}));
jest.mock('expo-crypto', () => ({
  getRandomBytes: jest.fn((size: number) => new Uint8Array(size)),
}));
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement('SafeAreaProvider', null, children),
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});
jest.mock('stream-chat-expo', () => ({
  StreamChat: {
    getInstance: jest.fn().mockReturnValue({
      connectUser: jest.fn(),
      disconnectUser: jest.fn(),
    }),
  },
  OverlayProvider: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('./src/shared/hooks/useRobotoMono', () => ({
  useRobotoMono: () => true,
}));
jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => {
      const Navigator = ({ children }: { children: React.ReactNode }) =>
        React.createElement('Navigator', null, children);
      const Screen = ({ children }: { children: React.ReactNode }) => children;
      return { Navigator, Screen };
    },
  };
});
jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  return {
    createBottomTabNavigator: () => {
      const Navigator = ({ children }: { children: React.ReactNode }) =>
        React.createElement('Navigator', null, children);
      const Screen = ({ children }: { children: React.ReactNode }) => children;
      return { Navigator, Screen };
    },
  };
});
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));
