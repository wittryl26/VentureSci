import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../pages/home/HomeScreen';
import OrganizationsScreen from '../../pages/organizations/OrganizationsScreen';
import MessagesScreen from '../../pages/messages/MessagesScreen';
import ProfileScreen from '../../pages/profile/ProfileScreen';
import {
  ForgotPasswordScreen,
  OnboardingScreen,
  SignInScreen,
  SignUpScreen,
  VerifyEmailScreen,
  VerifyPhoneScreen,
} from '../../features/auth/ui/AuthScreens';
import { appTheme, palette } from '../../shared/theme';
import { useAuth } from '../../features/auth/model/auth-context';
import type { AuthStackParamList, MainTabParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: palette.accent,
      tabBarIcon: ({ color, size }) => {
        const map: Record<keyof MainTabParamList, string> = {
          Home: 'home-outline',
          Organizations: 'grid-outline',
          Messages: 'chatbubbles-outline',
          Profile: 'person-circle-outline',
        };
        return <Ionicons name={map[route.name as keyof MainTabParamList]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Organizations" component={OrganizationsScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    <AuthStack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

export const AppNavigator = () => {
  const { status } = useAuth();
  const authenticated = status === 'authenticated';

  return (
    <NavigationContainer theme={appTheme}>
      {authenticated ? <MainTabs /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};

export default AppNavigator;
