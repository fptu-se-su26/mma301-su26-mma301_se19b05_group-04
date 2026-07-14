import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
type Props = { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; color?: string };
export const ProfileMenuItem: React.FC<Props> = ({ icon, label, onPress, color }) => (
  <TouchableOpacity style={styles.c} onPress={onPress}>
    <Ionicons name={icon} size={22} color={color || colors.text} />
    <Text style={[styles.t, color ? { color } : null]}>{label}</Text>
    <Ionicons name="chevron-forward" size={18} color={colors.muted} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  c: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  t: { flex: 1, marginLeft: 14, fontSize: 16 },
});
