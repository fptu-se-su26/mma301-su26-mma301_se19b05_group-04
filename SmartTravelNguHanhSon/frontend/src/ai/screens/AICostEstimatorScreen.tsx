import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { Loading } from '../../../components/common/Loading';
import { aiApi } from '../services/aiApi';
import { COLORS } from '../../../utils/constants';

const DURATIONS = ['Nửa ngày', '1 ngày', '2 ngày', '3 ngày'];
const STYLES = ['Tiết kiệm', 'Trung bình', 'Thoải mái', 'Sang trọng'];

export const AICostEstimatorScreen = ({ navigation }: any) => {
  const [duration, setDuration] = useState('1 ngày');
  const [people, setPeople] = useState('2');
  const [style, setStyle] = useState('Trung bình');
  const [includeWorkshop, setIncludeWorkshop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const estimate = async () => {
    setLoading(true);
    const prompt = `Ước tính chi phí du lịch Ngũ Hành Sơn, Đà Nẵng cho ${people} người, thời gian ${duration}, phong cách ${style.toLowerCase()}${includeWorkshop ? ', có tham gia workshop trải nghiệm' : ''}. Hãy liệt kê chi tiết: vé tham quan, ăn uống, di chuyển, workshop (nếu có), lưu trú (nếu 2+ ngày), và tổng chi phí ước tính. Trả lời ngắn gọn bằng tiếng Việt, dùng format dễ đọc.`;
    const reply = await aiApi.askAIChatbot(prompt);
    setResult(reply);
    setLoading(false);
  };

  if (loading) return <Loading text="AI đang ước tính chi phí..." />;

  return (
    <ScreenContainer>
      <Header title="AI ước tính chi phí" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.c}>
        {!result ? (
          <>
            <LinearGradient colors={['#0284C7', '#0EA5E9', '#2DD4BF']} style={styles.banner}>
              <Ionicons name="calculator" size={32} color="#FFF" />
              <Text style={styles.bannerTitle}>Ước tính chi phí{'\n'}chuyến đi</Text>
              <Text style={styles.bannerSub}>AI sẽ giúp bạn lên ngân sách hợp lý</Text>
            </LinearGradient>

            <Text style={styles.label}>Thời gian</Text>
            <View style={styles.chips}>
              {DURATIONS.map(d => (
                <TouchableOpacity key={d} style={[styles.chip, duration === d && styles.chipActive]} onPress={() => setDuration(d)}>
                  <Text style={[styles.chipText, duration === d && { color: '#FFF' }]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <AppInput label="Số người" value={people} onChangeText={setPeople} keyboardType="numeric" />

            <Text style={styles.label}>Phong cách chi tiêu</Text>
            <View style={styles.chips}>
              {STYLES.map(s => (
                <TouchableOpacity key={s} style={[styles.chip, style === s && styles.chipActive]} onPress={() => setStyle(s)}>
                  <Text style={[styles.chipText, style === s && { color: '#FFF' }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.toggleRow} onPress={() => setIncludeWorkshop(!includeWorkshop)}>
              <Ionicons name={includeWorkshop ? 'checkbox' : 'square-outline'} size={24} color={COLORS.primary} />
              <Text style={styles.toggleText}>Bao gồm workshop trải nghiệm</Text>
            </TouchableOpacity>

            <AppButton
              title="Ước tính chi phí"
              variant="secondary"
              onPress={estimate}
              iconLeft={<Ionicons name="calculator" size={18} color="#FFF" />}
              style={{ marginTop: 20 }}
            />
          </>
        ) : (
          <>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="wallet" size={20} color={COLORS.primary} />
                <Text style={styles.resultTitle}>Ước tính chi phí</Text>
              </View>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            <AppButton
              title="Ước tính lại"
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
  chipText: { fontSize: 14, color: COLORS.text },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  toggleText: { fontSize: 15, color: COLORS.text, marginLeft: 10 },
  genBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  genBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  resultCard: { backgroundColor: '#E0F2FE', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#38BDF8' },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginLeft: 8 },
  resultText: { fontSize: 15, color: COLORS.text, lineHeight: 24 },
});
