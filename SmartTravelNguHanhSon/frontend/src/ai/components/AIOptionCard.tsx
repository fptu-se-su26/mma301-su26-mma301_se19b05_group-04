import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
type Props = { icon: keyof typeof Ionicons.glyphMap; title: string; desc: string; onPress: () => void };
export const AIOptionCard: React.FC<Props> = ({ icon, title, desc, onPress }) => (
  <TouchableOpacity style={styles.c} onPress={onPress} activeOpacity={0.8}>
    <Ionicons name={icon} size={32} color={colors.primary} />
    <View style={{ marginLeft: 14, flex: 1 }}>
      <Text style={styles.t}>{title}</Text>
      <Text style={styles.d}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.muted} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  c: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  t: { fontSize: 17, fontWeight: 'bold', color: colors.text },
  d: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
