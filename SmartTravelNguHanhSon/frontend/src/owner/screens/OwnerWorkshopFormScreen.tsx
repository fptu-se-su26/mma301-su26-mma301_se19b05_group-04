import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { Workshop } from '../../../types/workshop';
import { generateId } from '../../../utils/helpers';
import { COLORS } from '../../../utils/constants';

export const OwnerWorkshopFormScreen = ({ route, navigation }: any) => {
  const existing: Workshop | undefined = route.params?.workshop;
  const isEdit = !!existing;
  const { user } = useAuth();
  const { addWorkshop, updateWorkshop } = useWorkshopManagement();

  const [title, setTitle] = useState(existing?.title || '');
  const [category, setCategory] = useState(existing?.category || 'Thủ công');
  const [location, setLocation] = useState(existing?.location || '');
  const [address, setAddress] = useState(existing?.address || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [detailDescription, setDetailDescription] = useState(existing?.detailDescription || '');
  const [price, setPrice] = useState(existing?.price?.toString() || '');
  const [duration, setDuration] = useState(existing?.duration || '');
  const [maxParticipants, setMaxParticipants] = useState(existing?.maxParticipants?.toString() || '');
  const [hostName, setHostName] = useState(existing?.hostName || user?.fullName || '');
  const [scheduleSlots, setScheduleSlots] = useState(existing?.scheduleSlots?.join(', ') || '');
  const [image, setImage] = useState(existing?.image || 'https://picsum.photos/id/1060/800/600');
  const [latitude, setLatitude] = useState(existing?.latitude?.toString() || '16.0020');
  const [longitude, setLongitude] = useState(existing?.longitude?.toString() || '108.2630');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Vui lòng nhập tên workshop';
    if (!price.trim() || parseFloat(price) <= 0) e.price = 'Giá phải lớn hơn 0';
    if (!maxParticipants.trim() || parseInt(maxParticipants) <= 0) e.maxParticipants = 'Số người phải lớn hơn 0';
    if (!address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const slots = scheduleSlots.split(',').map(s => s.trim()).filter(Boolean);
    const ws: Workshop = {
      id: existing?.id || generateId(),
      ownerId: user?.id || '',
      ownerName: user?.fullName || '',
      title, category, location, address, description, detailDescription,
      image,
      images: [image],
      price: parseFloat(price),
      duration,
      rating: existing?.rating || 0,
      maxParticipants: parseInt(maxParticipants),
      hostName,
      included: existing?.included || ['Nguyên liệu làm sản phẩm', 'Nước uống miễn phí', 'Sản phẩm mang về làm quà'],
      scheduleSlots: slots,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      status: isEdit ? existing!.status : 'pending',
      isActive: existing?.isActive ?? true,
      createdAt: existing?.createdAt || new Date().toISOString(),
    };
    if (isEdit) {
      updateWorkshop(ws.id, ws);
      Alert.alert('Thành công', 'Đã cập nhật workshop');
    } else {
      addWorkshop(ws);
      Alert.alert('Thành công', 'Workshop đã được gửi và đang chờ Admin duyệt.');
    }
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <GradientHeader
        title={isEdit ? 'Sửa workshop' : 'Thêm workshop'}
        subtitle={isEdit ? 'Chỉnh sửa thông tin workshop xưởng Non Nước' : 'Tạo trải nghiệm làm đá mỹ nghệ Non Nước mới'}
        colors={['#0284C7', '#06B6D4', '#67E8F9']}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.c} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <AppInput label="Tên workshop *" value={title} onChangeText={setTitle} error={errors.title} placeholder="Nhập tên workshop..." />
          <AppInput label="Danh mục" value={category} onChangeText={setCategory} placeholder="Thủ công, Ẩm thực, Làng nghề..." />
          <AppInput label="Địa điểm" value={location} onChangeText={setLocation} placeholder="Tên địa điểm xưởng đá" />
          <AppInput label="Địa chỉ *" value={address} onChangeText={setAddress} error={errors.address} placeholder="Địa chỉ xưởng đá đầy đủ..." />
          <AppInput label="Mô tả ngắn" value={description} onChangeText={setDescription} placeholder="Mô tả tóm tắt..." multiline />
          <AppInput label="Mô tả chi tiết" value={detailDescription} onChangeText={setDetailDescription} placeholder="Chi tiết các bước thực hiện..." multiline />
          <AppInput label="Giá (VNĐ) *" value={price} onChangeText={setPrice} error={errors.price} keyboardType="numeric" placeholder="350000" />
          <AppInput label="Thời lượng" value={duration} onChangeText={setDuration} placeholder="2.5 giờ" />
          <AppInput label="Số người tối đa *" value={maxParticipants} onChangeText={setMaxParticipants} error={errors.maxParticipants} keyboardType="numeric" placeholder="10" />
          <AppInput label="Tên người hướng dẫn" value={hostName} onChangeText={setHostName} placeholder="Tên nghệ nhân hướng dẫn..." />
          <AppInput label="Khung giờ (phân cách bởi dấu phẩy)" value={scheduleSlots} onChangeText={setScheduleSlots} placeholder="08:00 - 10:30, 13:00 - 15:30" />
          <AppInput label="Ảnh chính URL" value={image} onChangeText={setImage} placeholder="Nhập liên kết ảnh đẹp..." />
          <AppInput label="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
          <AppInput label="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />
          
          <AppButton 
            title={isEdit ? 'Lưu thay đổi' : 'Gửi duyệt workshop'} 
            onPress={handleSave} 
            variant="secondary"
            icon={isEdit ? 'save-outline' : 'send-outline'} 
            style={{ marginTop: 20 }} 
          />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  c: { padding: 20, paddingBottom: 130 },
});
