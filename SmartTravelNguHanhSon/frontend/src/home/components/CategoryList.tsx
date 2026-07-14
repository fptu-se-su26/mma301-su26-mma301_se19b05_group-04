import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategoryChip } from '../../../components/travel/CategoryChip';
import { CATEGORIES } from '../../destination/data/categories';

type Props = { selected: string; onSelect: (c: string) => void };

export const CategoryList: React.FC<Props> = ({ selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.c}>
    {CATEGORIES.map(cat => (
      <CategoryChip key={cat.id} label={cat.label} active={selected === cat.label} onPress={() => onSelect(cat.label)} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({ c: { paddingHorizontal: 16, paddingVertical: 8 } });
