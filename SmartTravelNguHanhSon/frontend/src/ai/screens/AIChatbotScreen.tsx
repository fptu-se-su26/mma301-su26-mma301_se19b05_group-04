import React, { useState, useRef } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { ChatBubble } from '../components/ChatBubble';
import { aiApi } from '../services/aiApi';
import { ChatMessage } from '../../../types/ai';
import { COLORS } from '../../../utils/constants';
import { generateId } from '../../../utils/helpers';

const SUGGESTIONS = ['Ngũ Hành Sơn có gì hay?', 'Workshop nào phù hợp nhóm bạn?', 'Gợi ý món ăn ngon?', 'Làng đá mỹ nghệ ở đâu?', 'Workshop phù hợp gia đình?'];

export const AIChatbotScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'ai', content: 'Xin chào! 👋 Tôi là trợ lý du lịch AI của Smart Travel Ngũ Hành Sơn. Tôi có thể giúp bạn tìm hiểu về địa điểm, workshop trải nghiệm, ẩm thực và nhiều hơn nữa! Bạn muốn biết gì?', createdAt: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: ChatMessage = { id: generateId(), role: 'user', content: msg, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const reply = await aiApi.askAIChatbot(msg);
    const aiMsg: ChatMessage = { id: generateId(), role: 'ai', content: reply, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.headerDot} />
          <Text style={styles.headerTitle}>AI Chatbot</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="sparkles" size={20} color="#8B5CF6" />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatBubble content={item.content} isUser={item.role === 'user'} />}
          contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 12 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd()}
          ListFooterComponent={loading ? (
            <View style={styles.loadWrap}>
              <View style={styles.typingDots}>
                <ActivityIndicator color="#8B5CF6" size="small" />
                <Text style={styles.typingText}>AI đang suy nghĩ...</Text>
              </View>
            </View>
          ) : null}
        />

        {messages.length <= 1 && (
          <View style={{ height: 45, marginBottom: 8 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sugWrap}>
              {SUGGESTIONS.map((s, i) => (
                <TouchableOpacity key={i} style={styles.sugChip} onPress={() => send(s)}>
                  <Text style={styles.sugText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            placeholder="Nhập câu hỏi..." 
            placeholderTextColor={COLORS.muted} 
            value={input} 
            onChangeText={setInput} 
            onSubmitEditing={() => send()} 
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => send()}>
            <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.sendGrad}>
              <Ionicons name="send" size={18} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 48, paddingBottom: 14, paddingHorizontal: 16 },
  backBtn: { marginRight: 12 },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E', marginRight: 6 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  headerIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  loadWrap: { paddingHorizontal: 16, paddingVertical: 8 },
  typingDots: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F3FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, alignSelf: 'flex-start' },
  typingText: { color: '#8B5CF6', fontSize: 13, marginLeft: 8 },
  sugWrap: { paddingHorizontal: 12, paddingBottom: 8 },
  sugChip: { backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginRight: 8 },
  sugText: { fontSize: 13, color: '#8B5CF6' },
  inputArea: { flexDirection: 'row', padding: 12, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: 20, paddingHorizontal: 18, height: 44, fontSize: 15, color: COLORS.text },
  sendBtn: { marginLeft: 8 },
  sendGrad: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
});
