import React from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { AppButton } from '../../../components/common/AppButton';
import { useItinerary } from '../../../hooks/useItinerary';
import { generateId } from '../../../utils/helpers';
import { COLORS } from '../../../utils/constants';

export const AIItineraryResultScreen = ({ route, navigation }: any) => {
  const { content } = route.params;
  const { saveAIItinerary } = useItinerary();

  const handleSave = () => {
    saveAIItinerary({ id: generateId(), title: 'Lịch trình AI', content, type: 'ai', createdAt: new Date().toISOString() });
    Alert.alert('Thành công', 'Đã lưu lịch trình!');
  };

  return (
    <ScreenContainer>
      <Header title="Kết quả lịch trình" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.c}>
        <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.banner}>
          <Ionicons name="sparkles" size={24} color="#FFF" />
          <Text style={styles.bannerText}>Lịch trình được tạo bởi AI</Text>
        </LinearGradient>

        <View style={styles.resultCard}>
          <Text style={styles.resultText}>{content}</Text>
        </View>

        <AppButton title="Lưu lịch trình" onPress={handleSave} icon="bookmark-outline" style={styles.btn} />
        <AppButton title="Tạo lại" variant="outline" onPress={() => navigation.goBack()} icon="refresh-outline" style={styles.btn} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  c: { padding: 16 },
  banner: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, marginBottom: 16 },
  bannerText: { color: '#FFF', fontSize: 15, fontWeight: '600', marginLeft: 10 },
  resultCard: { backgroundColor: '#F5F3FF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#DDD6FE' },
  resultText: { fontSize: 15, color: COLORS.text, lineHeight: 24 },
  btn: { marginTop: 10 },
});
