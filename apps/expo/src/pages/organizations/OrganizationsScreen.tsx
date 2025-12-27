import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Organization } from '../../entities/organization/types';
import { mockOrganizations } from '../../features/organizations/model/mockOrganizations';
import { fetchOrganizations } from '../../features/organizations/api/organizations';
import { OrganizationList } from '../../features/organizations/ui/OrganizationList';
import { palette, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';

export const OrganizationsScreen: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleBookmark = (id: string) => {
    setOrganizations((existing) => existing.map((org) => (org.id === id ? { ...org, bookmarked: true } : org)));
  };

  const handleInquiry = (id: string) => {
    setInquiryCount((count) => count + 1);
    setOrganizations((existing) =>
      existing.map((org) => (org.id === id ? { ...org, bookmarked: true } : org)),
    );
  };

  useEffect(() => {
    let mounted = true;

    fetchOrganizations()
      .then((data) => {
        if (!mounted) return;
        setOrganizations(data.length > 0 ? data : mockOrganizations);
      })
      .catch(() => {
        if (!mounted) return;
        setOrganizations(mockOrganizations);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

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
        <Text style={styles.status}>{loading ? 'Loading organizations...' : 'Synced from API when available.'}</Text>
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
  status: {
    fontFamily: typography.regular,
    color: palette.muted,
  },
});

export default OrganizationsScreen;
