import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { AppInput } from '../../../components/common/AppInput';
import { Loading } from '../../../components/common/Loading';
import { AppButton } from '../../../components/common/AppButton';
import { aiApi } from '../services/aiApi';
import { COLORS } from '../../../utils/constants';

const DURATIONS = ['Nửa ngày', '1 ngày', '2 ngày'];
const INTERESTS = ['Văn hóa', 'Làng nghề', 'Biển', 'Ẩm thực', 'Chụp ảnh', 'Giải trí về đêm', 'Workshop trải nghiệm', 'Thủ công mỹ nghệ'];
const BUDGETS = ['Tiết kiệm', 'Trung bình', 'Thoải mái'];
const TRANSPORTS = ['Đi bộ', 'Xe máy', 'Taxi'];

export const AIItineraryScreen = ({ navigation }: any) => {
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [interests, setInterests] = useState<string[]>(['Văn hóa']);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [transport, setTransport] = useState(TRANSPORTS[1]);
  const [people, setPeople] = useState('2');
  const [loading, setLoading] = useState(false);

  const toggleInterest = (i: string) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const generate = async () => {
    setLoading(true);
    const content = await aiApi.generateAIItinerary({ duration, interests, budget, transport, people: parseInt(people) || 2 });
    setLoading(false);
    navigation.navigate('AIItineraryResult', { content });
  };

  if (loading) return <Loading text="AI đang tạo lịch trình..." />;

  const Chips: React.FC<{ items: string[]; selected: string | string[]; onSelect: (v: string) => void }> = ({ items, selected, onSelect }) => (
    <View style={styles.chips}>
      {items.map(item => {
        const active = Array.isArray(selected) ? selected.includes(item) : selected === item;
        return (
          <TouchableOpacity key={item} style={[styles.chip, active && styles.chipActive]} onPress={() => onSelect(item)}>
            <Text style={[styles.chipText, active && { color: '#FFF' }]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Tạo lịch trình AI" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.c} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#6366F1', '#0EA5E9']} style={styles.banner}>
          <Ionicons name="calendar" size={28} color="#FFF" />
          <Text style={styles.bannerTitle}>AI sẽ tạo lịch trình hoàn hảo cho bạn</Text>
        </LinearGradient>

        <Text style={styles.label}>⏱ Thời gian</Text>
        <Chips items={DURATIONS} selected={duration} onSelect={setDuration} />

        <Text style={styles.label}>❤️ Sở thích</Text>
        <Chips items={INTERESTS} selected={interests} onSelect={toggleInterest} />

        <Text style={styles.label}>💰 Ngân sách</Text>
        <Chips items={BUDGETS} selected={budget} onSelect={setBudget} />

        <Text style={styles.label}>🚗 Phương tiện</Text>
        <Chips items={TRANSPORTS} selected={transport} onSelect={setTransport} />

        <AppInput label="👥 Số người" value={people} onChangeText={setPeople} keyboardType="numeric" />

        <AppButton
          title="Tạo lịch trình AI"
          variant="secondary"
          onPress={generate}
          iconLeft={<Ionicons name="sparkles" size={18} color="#FFF" />}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  c: { padding: 16, paddingBottom: 130 },
  banner: { borderRadius: 18, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bannerTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginLeft: 12, flex: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: COLORS.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surface, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  chipText: { fontSize: 14, color: COLORS.text },
  genBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  genBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});
