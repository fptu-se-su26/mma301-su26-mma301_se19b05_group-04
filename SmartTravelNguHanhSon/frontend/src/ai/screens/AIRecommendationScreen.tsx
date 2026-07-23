import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { Loading } from '../../../components/common/Loading';
import { AppButton } from '../../../components/common/AppButton';
import { aiApi } from '../services/aiApi';
import { COLORS } from '../../../utils/constants';

const INTERESTS = ['Di sản', 'Làng nghề', 'Biển', 'Ẩm thực', 'An Thượng', 'Workshop', 'Chụp ảnh', 'Thủ công', 'Giải trí đêm', 'Gia đình'];
const COMPANIONS = ['Một mình', 'Cặp đôi', 'Nhóm bạn', 'Gia đình'];

export const AIRecommendationScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState<string[]>(['Di sản', 'Biển']);
  const [companion, setCompanion] = useState('Cặp đôi');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const toggle = (item: string) => {
    setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const generate = async () => {
    setLoading(true);
    const prompt = `Tôi đang đi du lịch Ngũ Hành Sơn, Đà Nẵng với ${companion.toLowerCase()}. Sở thích: ${selected.join(', ')}. Hãy gợi ý 5 địa điểm và workshop phù hợp. Với mỗi gợi ý, cho biết tên, lý do nên đến, và thời gian phù hợp. Trả lời ngắn gọn bằng tiếng Việt.`;
    const reply = await aiApi.askAIChatbot(prompt);
    setResult(reply);
    setLoading(false);
  };

  if (loading) return <Loading text="AI đang phân tích sở thích..." />;

  return (
    <ScreenContainer>
      <Header title="AI gợi ý địa điểm" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.c}>
        {!result ? (
          <>
            <LinearGradient colors={['#8B5CF6', '#6366F1', '#0EA5E9']} style={styles.banner}>
              <Ionicons name="sparkles" size={32} color="#FFF" />
              <Text style={styles.bannerTitle}>AI sẽ gợi ý địa điểm{'\n'}phù hợp với bạn</Text>
              <Text style={styles.bannerSub}>Chọn sở thích để AI phân tích</Text>
            </LinearGradient>

            <Text style={styles.label}>Bạn đi cùng ai?</Text>
            <View style={styles.chips}>
              {COMPANIONS.map(c => (
                <TouchableOpacity key={c} style={[styles.chip, companion === c && styles.chipActive]} onPress={() => setCompanion(c)}>
                  <Text style={[styles.chipText, companion === c && { color: '#FFF' }]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Sở thích của bạn</Text>
            <View style={styles.chips}>
              {INTERESTS.map(item => {
                const active = selected.includes(item);
                return (
                  <TouchableOpacity key={item} style={[styles.chip, active && styles.chipActiveAccent]} onPress={() => toggle(item)}>
                    <Text style={[styles.chipText, active && { color: '#FFF' }]}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <AppButton
              title="Nhận gợi ý từ AI"
              variant="secondary"
              onPress={generate}
              iconLeft={<Ionicons name="sparkles" size={18} color="#FFF" />}
              style={{ marginTop: 20 }}
            />
          </>
        ) : (
          <>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="sparkles" size={20} color="#8B5CF6" />
                <Text style={styles.resultTitle}>Gợi ý từ AI</Text>
              </View>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            <AppButton
              title="Gợi ý lại"
              variant="primary"
              onPress={() => setResult('')}
              iconLeft={<Ionicons name="refresh" size={18} color="#FFF" />}
              style={{ marginTop: 16 }}
            />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  c: { padding: 16, paddingBottom: 130 },
  banner: { borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20 },
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginTop: 12 },
  bannerSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 10, color: COLORS.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surface, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipActiveAccent: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  chipText: { fontSize: 14, color: COLORS.text },
  genBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  genBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  resultCard: { backgroundColor: '#F5F3FF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#DDD6FE' },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B5CF6', marginLeft: 8 },
  resultText: { fontSize: 15, color: COLORS.text, lineHeight: 24 },
});
