import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../utils/constants';

type Props = { content: string; isUser: boolean };

export const ChatBubble: React.FC<Props> = ({ content, isUser }) => (
  <View style={[styles.row, isUser && styles.rowUser]}>
    {!isUser && (
      <View style={styles.aiAvatar}>
        <Ionicons name="sparkles" size={16} color="#8B5CF6" />
      </View>
    )}
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={[styles.text, isUser && styles.userText]}>{content}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 12, alignItems: 'flex-end' },
  rowUser: { justifyContent: 'flex-end' },
  aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F5F3FF', justifyContent: 'center', alignItems: 'center', marginRight: 8, marginBottom: 2 },
  bubble: { maxWidth: '75%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18 },
  userBubble: { backgroundColor: '#8B5CF6', borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: '#F5F3FF', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#DDD6FE' },
  text: { fontSize: 15, lineHeight: 22, color: COLORS.text },
  userText: { color: '#FFF' },
});
