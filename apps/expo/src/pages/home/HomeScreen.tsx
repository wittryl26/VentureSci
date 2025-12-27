import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Post } from '../../entities/post/types';
import { mockPosts } from '../../features/posts/model/mockPosts';
import { PostComposer } from '../../features/posts/ui/PostComposer';
import { PostList } from '../../features/posts/ui/PostList';
import { palette, surfaceStyles, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';

export const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [saved, setSaved] = useState<string[]>([]);

  const stats = useMemo(
    () => ({
      saved: saved.length,
      inquiries: posts.reduce((sum, post) => sum + post.inquiries, 0),
    }),
    [saved.length, posts],
  );

  const handleCreate = (payload: {
    title: string;
    summary: string;
    category: Post['category'];
  }) => {
    const next: Post = {
      id: `post-${Date.now()}`,
      title: payload.title,
      summary: payload.summary,
      category: payload.category,
      inquiries: 0,
    };
    setPosts((existing) => [next, ...existing]);
  };

  const handleSave = (id: string) => {
    setSaved((existing) => Array.from(new Set([...existing, id])));
    setPosts((existing) =>
      existing.map((post) => (post.id === id ? { ...post, saved: true } : post)),
    );
  };

  const handleInquiry = (id: string) => {
    setPosts((existing) =>
      existing.map((post) => (post.id === id ? { ...post, inquiries: post.inquiries + 1 } : post)),
    );
  };

  return (
    <Screen>
      <Card style={styles.hero}>
        <Text style={styles.title}>Discover frontier projects</Text>
        <Text style={styles.body}>
          Browse breakthrough workstreams, publish new updates, and send inquiries with encrypted
          context.
        </Text>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeValue}>{stats.saved}</Text>
            <Text style={styles.badgeLabel}>saved</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeValue}>{stats.inquiries}</Text>
            <Text style={styles.badgeLabel}>inquiries</Text>
          </View>
        </View>
      </Card>
      <Card>
        <PostComposer onCreate={handleCreate} />
      </Card>
      <PostList posts={posts} onSave={handleSave} onInquiry={handleInquiry} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: palette.grid,
    borderRadius: 12,
    padding: 10,
  },
  badgeLabel: {
    color: palette.muted,
    fontFamily: typography.medium,
  },
  badgeValue: {
    color: palette.accent,
    fontFamily: typography.bold,
    fontSize: 18,
  },
  badges: {
    flexDirection: 'row',
    gap: 16,
  },
  body: {
    ...surfaceStyles.body,
  },
  hero: {
    gap: 8,
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 18,
  },
});

export default HomeScreen;
