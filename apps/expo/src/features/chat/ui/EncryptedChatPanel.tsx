import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { OverlayProvider } from 'stream-chat-expo';
import { decryptMessage, encryptMessage } from '../lib/encryption';
import { useEncryptedChat } from '../model/EncryptedChatProvider';
import { palette, typography } from '../../../shared/theme';
import { AccentButton } from '../../../shared/ui/AccentButton';
import Card from '../../../shared/ui/Card';

export const EncryptedChatPanel: React.FC = () => {
  const { requests, startChat, clientReady, client } = useEncryptedChat();
  const [topic, setTopic] = useState('Follow-up on funding request');

  const requestCopy = useMemo(
    () => (requests.length === 0 ? 'No requests yet. Invite contacts to start encrypted threads.' : 'Recent chat intents'),
    [requests],
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Encrypted inbox</Text>
        <TextInput
          style={styles.input}
          value={topic}
          onChangeText={setTopic}
          placeholder="Topic to encrypt"
          placeholderTextColor={palette.muted}
        />
        <View style={styles.actions}>
          <AccentButton label="Request chat" onPress={() => startChat('Research org lead', topic)} />
          <AccentButton
            variant="ghost"
            label="Save encrypted draft"
            onPress={() => encryptMessage(topic)}
            accessibilityLabel="Save encrypted chat draft"
          />
        </View>
        <Text style={styles.subtitle}>{requestCopy}</Text>
        <View style={styles.list}>
          {requests.map((request) => (
            <View key={request.id} style={styles.requestRow}>
              <Text style={styles.requestTitle}>{request.participant}</Text>
              <Text style={styles.previewLabel}>Encrypted preview</Text>
              <Text style={styles.previewValue}>{request.encryptedPreview}</Text>
              <Text style={styles.decrypted}>
                Decrypted: <Text style={styles.decryptedValue}>{decryptMessage(request.encryptedPreview)}</Text>
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.status}>
          {clientReady
            ? 'Stream client ready — connect with encrypted previews.'
            : 'Stream client offline — using local encrypted previews.'}
        </Text>
      </Card>
      {clientReady && client ? (
        <OverlayProvider>
          <Card style={styles.card}>
            <Text style={styles.subtitle}>
              Stream encrypted chat ready. Provision channels in Supabase to hydrate this inbox.
            </Text>
          </Card>
        </OverlayProvider>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    gap: 10,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: palette.text,
  },
  subtitle: {
    fontFamily: typography.medium,
    color: palette.accent,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.grid,
    borderRadius: 12,
    padding: 12,
    fontFamily: typography.regular,
    color: palette.text,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  list: {
    gap: 8,
  },
  requestRow: {
    gap: 4,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.grid,
  },
  requestTitle: {
    fontFamily: typography.medium,
    color: palette.text,
  },
  previewLabel: {
    fontFamily: typography.medium,
    color: palette.muted,
  },
  previewValue: {
    fontFamily: typography.regular,
    color: palette.accent,
  },
  decrypted: {
    fontFamily: typography.medium,
    color: palette.text,
  },
  decryptedValue: {
    fontFamily: typography.regular,
    color: palette.text,
  },
  status: {
    fontFamily: typography.regular,
    color: palette.muted,
  },
});
