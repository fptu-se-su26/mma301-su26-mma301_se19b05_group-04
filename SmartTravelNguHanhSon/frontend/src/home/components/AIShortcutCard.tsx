import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../../../components/common/AppButton';
import { colors } from '../../../theme/colors';

export const AIShortcutCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <View style={styles.c}>
    <View style={styles.row}>
      <Ionicons name="sparkles" size={28} color={colors.primary} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.t}>Trợ lý AI du lịch</Text>
        <Text style={styles.d}>Hỏi đáp, gợi ý và tạo lịch trình thông minh</Text>
      </View>
    </View>
    <AppButton title="Khám phá AI" onPress={onPress} style={{ marginTop: 12 }} icon="arrow-forward-outline" />
  </View>
);

const styles = StyleSheet.create({
  c: { margin: 16, padding: 16, backgroundColor: '#E0F2FE', borderRadius: 18, borderWidth: 1, borderColor: colors.primary },
  row: { flexDirection: 'row', alignItems: 'center' },
  t: { fontSize: 17, fontWeight: 'bold', color: colors.primary },
  d: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
