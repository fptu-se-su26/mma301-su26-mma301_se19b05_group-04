import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '../../../types/user';
import { colors } from '../../../theme/colors';
export const ProfileHeader: React.FC<{ user: User }> = ({ user }) => (
  <View style={styles.c}>
    {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.av} /> : (
      <View style={[styles.av, { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.white, fontSize: 28, fontWeight: 'bold' }}>{user.fullName[0]}</Text>
      </View>
    )}
    <Text style={styles.name}>{user.fullName}</Text>
    <Text style={styles.email}>{user.email}</Text>
    {user.phone ? <Text style={styles.phone}>{user.phone}</Text> : null}
  </View>
);
const styles = StyleSheet.create({
  c: { alignItems: 'center', paddingVertical: 24, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  av: { width: 90, height: 90, borderRadius: 45 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  email: { color: colors.muted, marginTop: 2 },
  phone: { color: colors.muted, marginTop: 2 },
});
