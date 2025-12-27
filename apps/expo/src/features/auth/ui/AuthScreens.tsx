import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccentButton } from '../../../shared/ui/AccentButton';
import { Screen } from '../../../shared/ui/Screen';
import { TextField } from '../../../shared/ui/TextField';
import { palette, surfaceStyles, typography } from '../../../shared/theme';
import { useAuth } from '../model/auth-context';
import type { AuthStackParamList } from '../../../app/navigation/types';

type AuthScreenProps<RouteName extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  RouteName
>;

export const SignInScreen: React.FC<AuthScreenProps<'SignIn'>> = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('researcher@venturesci.io');
  const [password, setPassword] = useState('password123');

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Sign in</Text>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextField label="Password" value={password} secureTextEntry onChangeText={setPassword} />
        <AccentButton
          label="Continue"
          onPress={() => {
            signIn(email);
            navigation.navigate('Onboarding');
          }}
        />
        <AccentButton
          variant="ghost"
          label="Create an account"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>
      </View>
    </Screen>
  );
};

export const SignUpScreen: React.FC<AuthScreenProps<'SignUp'>> = ({ navigation }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('new.user@venturesci.io');

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Sign up</Text>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextField label="Create password" value="long-password" secureTextEntry />
        <AccentButton
          label="Continue"
          onPress={() => {
            signUp(email);
            navigation.navigate('Onboarding');
          }}
        />
        <AccentButton
          variant="ghost"
          label="Back to sign in"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </Screen>
  );
};

export const OnboardingScreen: React.FC<AuthScreenProps<'Onboarding'>> = ({ navigation }) => {
  const { completeOnboarding } = useAuth();

  const steps = useMemo(
    () => [
      'Identify your role (researcher, founder, funder)',
      'Link credibility sources to verify expertise',
      'Join or create organizations to collaborate',
      'Sync messaging preferences and notifications',
    ],
    [],
  );

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Welcome to VentureSci</Text>
        <Text style={styles.subtitle}>Complete onboarding to access the network.</Text>
        <View style={styles.list}>
          {steps.map((step) => (
            <Text key={step} style={styles.listItem}>
              • {step}
            </Text>
          ))}
        </View>
        <AccentButton label="Verify email" onPress={() => navigation.navigate('VerifyEmail')} />
        <AccentButton label="Verify phone" onPress={() => navigation.navigate('VerifyPhone')} />
        <AccentButton
          label="Finish onboarding"
          onPress={() => {
            completeOnboarding();
            navigation.navigate('SignIn');
          }}
        />
      </View>
    </Screen>
  );
};

export const VerifyEmailScreen: React.FC<AuthScreenProps<'VerifyEmail'>> = ({ navigation }) => {
  const { verifyEmail } = useAuth();
  const [code, setCode] = useState('123456');

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Email verification</Text>
        <TextField label="Code" value={code} onChangeText={setCode} keyboardType="number-pad" />
        <AccentButton
          label="Confirm email"
          onPress={() => {
            verifyEmail();
            navigation.navigate('Onboarding');
          }}
        />
      </View>
    </Screen>
  );
};

export const VerifyPhoneScreen: React.FC<AuthScreenProps<'VerifyPhone'>> = ({ navigation }) => {
  const { verifyPhone } = useAuth();
  const [code, setCode] = useState('741852');

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Text verification</Text>
        <TextField label="SMS code" value={code} onChangeText={setCode} keyboardType="number-pad" />
        <AccentButton
          label="Confirm phone"
          onPress={() => {
            verifyPhone();
            navigation.navigate('Onboarding');
          }}
        />
      </View>
    </Screen>
  );
};

export const ForgotPasswordScreen: React.FC<AuthScreenProps<'ForgotPassword'>> = ({
  navigation,
}) => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('reset@venturesci.io');

  return (
    <Screen>
      <View style={surfaceStyles.card}>
        <Text style={styles.title}>Reset password</Text>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AccentButton
          label="Send reset link"
          onPress={() => {
            requestPasswordReset(email);
            navigation.navigate('SignIn');
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  link: {
    color: palette.accent,
    fontFamily: typography.medium,
    marginTop: 12,
  },
  list: {
    gap: 6,
    marginBottom: 12,
  },
  listItem: {
    ...surfaceStyles.body,
  },
  subtitle: {
    ...surfaceStyles.body,
    marginBottom: 12,
  },
  title: {
    ...surfaceStyles.heading,
  },
});
