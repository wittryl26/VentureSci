import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Post } from '../../../entities/post/types';
import { palette, typography } from '../../../shared/theme';
import { AccentButton } from '../../../shared/ui/AccentButton';
import Card from '../../../shared/ui/Card';

interface PostListProps {
  posts: Post[];
  onSave: (id: string) => void;
  onInquiry: (id: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onSave, onInquiry }) => (
  <View style={styles.stack}>
    {posts.map((post) => (
      <Card key={post.id} style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.category}>{post.category.toUpperCase()}</Text>
        <Text style={styles.summary}>{post.summary}</Text>
        <View style={styles.actions}>
          <AccentButton label={post.saved ? 'Saved' : 'Save'} onPress={() => onSave(post.id)} />
          <AccentButton
            variant="ghost"
            label="Inquiry request"
            onPress={() => onInquiry(post.id)}
          />
        </View>
        <Text style={styles.meta}>{post.inquiries} active inquiries</Text>
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
  category: {
    color: palette.accent,
    fontFamily: typography.medium,
    fontSize: 12,
    letterSpacing: 1,
  },
  meta: {
    color: palette.muted,
    fontFamily: typography.medium,
  },
  stack: {
    gap: 12,
  },
  summary: {
    color: palette.muted,
    fontFamily: typography.regular,
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 16,
  },
});
