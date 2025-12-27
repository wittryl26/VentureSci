import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Organization } from '../../../entities/organization/types';
import { palette, typography } from '../../../shared/theme';
import { AccentButton } from '../../../shared/ui/AccentButton';
import Card from '../../../shared/ui/Card';

interface OrganizationListProps {
  organizations: Organization[];
  onBookmark: (id: string) => void;
  onInquiry: (id: string) => void;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  onBookmark,
  onInquiry,
}) => (
  <View style={styles.stack}>
    {organizations.map((org) => (
      <Card key={org.id} style={styles.card}>
        <Text style={styles.title}>{org.name}</Text>
        <Text style={styles.subtitle}>{org.focus}</Text>
        <Text style={styles.meta}>{org.location}</Text>
        <View style={styles.chips}>
          {org.needs.map((need) => (
            <View key={need} style={styles.chip}>
              <Text style={styles.chipText}>{need}</Text>
            </View>
          ))}
        </View>
        <View style={styles.actions}>
          <AccentButton
            label={org.bookmarked ? 'Saved' : 'Save org'}
            onPress={() => onBookmark(org.id)}
          />
          <AccentButton variant="ghost" label="Send inquiry" onPress={() => onInquiry(org.id)} />
        </View>
        <Text style={styles.meta}>Contact: {org.contact}</Text>
      </Card>
    ))}
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    gap: 8,
  },
  chip: {
    backgroundColor: palette.grid,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: palette.text,
    fontFamily: typography.medium,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  meta: {
    color: palette.muted,
    fontFamily: typography.regular,
  },
  stack: {
    gap: 12,
  },
  subtitle: {
    color: palette.accent,
    fontFamily: typography.medium,
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 16,
  },
});
