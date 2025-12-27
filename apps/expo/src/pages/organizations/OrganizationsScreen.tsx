import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Organization } from '../../entities/organization/types';
import { mockOrganizations } from '../../features/organizations/model/mockOrganizations';
import { OrganizationList } from '../../features/organizations/ui/OrganizationList';
import { palette, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';

export const OrganizationsScreen: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [inquiryCount, setInquiryCount] = useState(0);

  const handleBookmark = (id: string) => {
    setOrganizations((existing) => existing.map((org) => (org.id === id ? { ...org, bookmarked: true } : org)));
  };

  const handleInquiry = (id: string) => {
    setInquiryCount((count) => count + 1);
    setOrganizations((existing) =>
      existing.map((org) => (org.id === id ? { ...org, bookmarked: true } : org)),
    );
  };

  return (
    <Screen>
      <Card style={styles.header}>
        <Text style={styles.title}>Organizations</Text>
        <Text style={styles.caption}>
          Save labs, venture studios, or funds to receive updates and route encrypted inquiries.
        </Text>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{inquiryCount}</Text>
          <Text style={styles.statLabel}>inquiry requests queued</Text>
        </View>
      </Card>
      <OrganizationList organizations={organizations} onBookmark={handleBookmark} onInquiry={handleInquiry} />
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
  stat: {
    backgroundColor: palette.grid,
    borderRadius: 12,
    padding: 10,
  },
  statValue: {
    fontFamily: typography.bold,
    color: palette.accent,
    fontSize: 16,
  },
  statLabel: {
    fontFamily: typography.medium,
    color: palette.muted,
  },
});

export default OrganizationsScreen;
