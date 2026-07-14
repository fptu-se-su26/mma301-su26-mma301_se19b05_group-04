import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
export const ItineraryResultCard: React.FC<{ content: string }> = ({ content }) => (
  <View style={styles.c}><Text style={styles.t}>{content}</Text></View>
);
const styles = StyleSheet.create({
  c: { backgroundColor: colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: colors.border },
  t: { fontSize: 15, color: colors.text, lineHeight: 24 },
});
