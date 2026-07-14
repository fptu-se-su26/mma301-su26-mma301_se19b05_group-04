import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { Workshop, WorkshopBooking } from '../../../types/workshop';
import { COLORS } from '../../../utils/constants';
import { formatCurrency, generateId, generateBookingCode } from '../../../utils/helpers';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { useAuth } from '../../../hooks/useAuth';

export const WorkshopBookingScreen = ({ route, navigation }: any) => {
  const { workshop } = route.params as { workshop: Workshop };
  const { addWorkshopBooking } = useWorkshopBooking();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [participants, setParticipants] = useState('1');
  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const numParticipants = parseInt(participants) || 0;
  const totalPrice = workshop.price * numParticipants;

  // Generate dates for next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return { day: d.getDate().toString(), weekday: days[d.getDay()], month: (d.getMonth() + 1).toString() };
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập họ tên';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    if (!email.trim()) errs.email = 'Vui lòng nhập email';
    if (!selectedDate) errs.date = 'Vui lòng chọn ngày';
    if (!selectedSlot) errs.slot = 'Vui lòng chọn khung giờ';
    if (numParticipants <= 0) errs.participants = 'Số người phải lớn hơn 0';
    if (numParticipants > workshop.maxParticipants) errs.participants = `Tối đa ${workshop.maxParticipants} người`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const booking: WorkshopBooking = {
      id: generateId(),
      bookingCode: generateBookingCode(),
      userId: user?.id || '',
      workshopId: workshop.id,
      workshopTitle: workshop.title,
      workshopImage: workshop.image,
      ownerId: workshop.ownerId,
      ownerName: workshop.ownerName,
      customerName: name,
      phone,
      email,
      date: selectedDate,
      timeSlot: selectedSlot,
      participants: numParticipants,
      note: note || undefined,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    addWorkshopBooking(booking);
    navigation.navigate('WorkshopBookingSuccess', { booking });
  };

  return (
    <ScreenContainer>
      <Header title="Đặt lịch workshop" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Workshop Info */}
        <View style={styles.workshopCard}>
          <Image source={{ uri: workshop.image }} style={styles.wsImg} />
          <View style={styles.wsInfo}>
            <Text style={styles.wsTitle} numberOfLines={2}>{workshop.title}</Text>
            <Text style={styles.wsPrice}>{formatCurrency(workshop.price)}/người</Text>
          </View>
        </View>

        {/* Date Selection */}
        <Text style={styles.label}>Chọn ngày</Text>
        {errors.date ? <Text style={styles.err}>{errors.date}</Text> : null}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateWrap}>
          {dates.map(d => {
            const info = formatDateDisplay(d);
            const active = selectedDate === d;
            return (
              <TouchableOpacity key={d} style={[styles.dateCard, active && styles.dateCardActive]} onPress={() => setSelectedDate(d)}>
                <Text style={[styles.dateWeekday, active && styles.dateTextActive]}>{info.weekday}</Text>
                <Text style={[styles.dateDay, active && styles.dateTextActive]}>{info.day}</Text>
                <Text style={[styles.dateMonth, active && styles.dateTextActive]}>Th{info.month}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time Slot */}
        <Text style={styles.label}>Chọn khung giờ</Text>
        {errors.slot ? <Text style={styles.err}>{errors.slot}</Text> : null}
        <View style={styles.slotsWrap}>
          {workshop.scheduleSlots.map(slot => (
            <TouchableOpacity key={slot} style={[styles.slotChip, selectedSlot === slot && styles.slotChipActive]} onPress={() => setSelectedSlot(slot)}>
              <Ionicons name="time-outline" size={16} color={selectedSlot === slot ? '#FFF' : COLORS.primary} />
              <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Participants */}
        <Text style={styles.label}>Số lượng người (tối đa {workshop.maxParticipants})</Text>
        <View style={styles.counterRow}>
          <TouchableOpacity style={styles.counterBtn} onPress={() => setParticipants(String(Math.max(1, numParticipants - 1)))}>
            <Ionicons name="remove" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.counterValue}>{participants}</Text>
          <TouchableOpacity style={styles.counterBtn} onPress={() => setParticipants(String(Math.min(workshop.maxParticipants, numParticipants + 1)))}>
            <Ionicons name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {errors.participants ? <Text style={styles.err}>{errors.participants}</Text> : null}

        {/* Personal Info */}
        <Text style={styles.label}>Thông tin liên hệ</Text>
        <AppInput label="Họ và tên *" value={name} onChangeText={setName} error={errors.name} placeholder="Nhập họ tên..." />
        <AppInput label="Số điện thoại *" value={phone} onChangeText={setPhone} error={errors.phone} placeholder="Nhập số điện thoại..." keyboardType="phone-pad" />
        <AppInput label="Email *" value={email} onChangeText={setEmail} error={errors.email} placeholder="Nhập email..." keyboardType="email-address" />
        <AppInput label="Ghi chú (tuỳ chọn)" value={note} onChangeText={setNote} placeholder="Yêu cầu đặc biệt..." multiline />

        {/* Total */}
        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Giá mỗi người</Text>
            <Text style={styles.totalValue}>{formatCurrency(workshop.price)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Số người</Text>
            <Text style={styles.totalValue}>x {numParticipants}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalDivider]}>
            <Text style={styles.totalFinalLabel}>Tổng tiền</Text>
            <Text style={styles.totalFinalValue}>{formatCurrency(totalPrice)}</Text>
          </View>
        </View>

        {/* Submit */}
        <AppButton
          title="Xác nhận đặt lịch"
          variant="secondary"
          onPress={handleSubmit}
          iconLeft={<Ionicons name="checkmark-circle" size={20} color="#FFF" />}
          style={{ marginTop: 24 }}
        />

        <View style={{ height: 130 }} />
      </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scroll: { padding: 16 },
  workshopCard: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  wsImg: { width: 80, height: 80, borderRadius: 12 },
  wsInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  wsTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  wsPrice: { fontSize: 18, fontWeight: 'bold', color: '#F97316', marginTop: 4 },
  label: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginTop: 16, marginBottom: 10 },
  err: { color: COLORS.danger, fontSize: 12, marginBottom: 4 },
  dateWrap: { paddingBottom: 4 },
  dateCard: { width: 60, alignItems: 'center', paddingVertical: 12, borderRadius: 14, backgroundColor: COLORS.surface, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  dateCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dateWeekday: { fontSize: 12, color: COLORS.muted },
  dateDay: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginVertical: 2 },
  dateMonth: { fontSize: 11, color: COLORS.muted },
  dateTextActive: { color: '#FFF' },
  slotsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  slotChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#E0F2FE', marginRight: 8, marginBottom: 8 },
  slotChipActive: { backgroundColor: COLORS.primary },
  slotText: { fontSize: 14, color: COLORS.primary, fontWeight: '600', marginLeft: 6 },
  slotTextActive: { color: '#FFF' },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 4 },
  counterBtn: { width: 48, height: 44, justifyContent: 'center', alignItems: 'center' },
  counterValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginHorizontal: 24 },
  totalCard: { backgroundColor: '#FFF7ED', borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#FDBA74' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalLabel: { fontSize: 14, color: COLORS.muted },
  totalValue: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  totalDivider: { borderTopWidth: 1, borderTopColor: '#FDBA74', paddingTop: 10, marginTop: 4, marginBottom: 0 },
  totalFinalLabel: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  totalFinalValue: { fontSize: 22, fontWeight: 'bold', color: '#F97316' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  submitText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
});
