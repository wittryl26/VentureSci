import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EncryptedChatPanel } from '../../features/chat/ui/EncryptedChatPanel';
import { palette, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';

export const MessagesScreen: React.FC = () => {
  return (
    <Screen>
      <Card style={styles.header}>
        <Text style={styles.title}>Messages / Inbox</Text>
        <Text style={styles.caption}>
          Kick off encrypted chat requests. Stream Chat handles delivery while Supabase stores metadata and RLS
          protects participants.
        </Text>
      </Card>
      <EncryptedChatPanel />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  title: {
    fontFamily: typography.bold,
    color: palette.text,
    fontSize: 18,
  },
  caption: {
    fontFamily: typography.regular,
    color: palette.muted,
  },
});

export default MessagesScreen;
