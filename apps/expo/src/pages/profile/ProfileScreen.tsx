import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../features/auth/model/auth-context';
import { palette, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';
import { AccentButton } from '../../shared/ui/AccentButton';

const credibilityLinks = [
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=venturesci' },
  { label: 'ORCID', url: 'https://orcid.org/0000-0002-venturesci' },
  { label: 'GitHub', url: 'https://github.com/venturesci' },
];

export const ProfileScreen: React.FC = () => {
  const { user, signOut, verifyEmail, verifyPhone } = useAuth();

  return (
    <Screen>
      <Card style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.caption}>{user?.email ?? 'No user selected'}</Text>
        <View style={styles.verifications}>
          <Text style={styles.badge}>{user?.verified ? 'Email verified' : 'Email pending'}</Text>
          <Text style={styles.badge}>{user?.phoneVerified ? 'Phone verified' : 'SMS pending'}</Text>
        </View>
        <View style={styles.actions}>
          <AccentButton label="Verify email" onPress={verifyEmail} />
          <AccentButton label="Verify phone" onPress={verifyPhone} variant="ghost" />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Credibility links</Text>
        {credibilityLinks.map((link) => (
          <View key={link.url} style={styles.linkRow}>
            <Text style={styles.linkLabel}>{link.label}</Text>
            <Text style={styles.linkValue}>{link.url}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Text style={styles.caption}>
          Save updates for organizations and posts to surface in Messages.
        </Text>
        <AccentButton label="Sign out" onPress={signOut} />
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: palette.grid,
    borderRadius: 12,
    color: palette.text,
    fontFamily: typography.medium,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  caption: {
    color: palette.muted,
    fontFamily: typography.regular,
  },
  header: {
    gap: 8,
  },
  linkLabel: {
    color: palette.accent,
    fontFamily: typography.medium,
  },
  linkRow: {
    borderColor: palette.grid,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
  },
  linkValue: {
    color: palette.text,
    fontFamily: typography.regular,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 16,
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 18,
  },
  verifications: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default ProfileScreen;
