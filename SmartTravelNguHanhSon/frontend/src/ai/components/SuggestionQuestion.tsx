import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
type Props = { question: string; onPress: () => void };
export const SuggestionQuestion: React.FC<Props> = ({ question, onPress }) => (
  <TouchableOpacity style={styles.c} onPress={onPress}>
    <Text style={styles.t}>{question}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  c: { borderWidth: 1, borderColor: colors.primary, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  t: { color: colors.primary, fontSize: 13 },
});
