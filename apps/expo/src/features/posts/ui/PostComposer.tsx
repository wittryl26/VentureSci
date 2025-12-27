import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AccentButton } from '../../../shared/ui/AccentButton';
import { palette, typography } from '../../../shared/theme';
import { PostCategory } from '../../../entities/post/types';

interface PostComposerProps {
  onCreate: (payload: { title: string; summary: string; category: PostCategory }) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('Share a new breakthrough');
  const [summary, setSummary] = useState(
    'Concise description, collaborators needed, and outcomes.',
  );
  const [category, setCategory] = useState<PostCategory>('discovery');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a post</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput
        style={[styles.input, styles.multiline]}
        value={summary}
        onChangeText={setSummary}
        multiline
        numberOfLines={3}
        placeholder="Summary"
      />
      <View style={styles.categoryRow}>
        {(['discovery', 'funding', 'announcement'] as PostCategory[]).map((item) => (
          <AccentButton
            key={item}
            label={item}
            onPress={() => setCategory(item)}
            variant={item === category ? 'solid' : 'ghost'}
          />
        ))}
      </View>
      <AccentButton
        label="Publish preview"
        onPress={() => onCreate({ title, summary, category })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  container: {
    gap: 8,
  },
  input: {
    borderColor: palette.grid,
    borderRadius: 12,
    borderWidth: 1,
    color: palette.text,
    fontFamily: typography.regular,
    padding: 12,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 16,
  },
});
