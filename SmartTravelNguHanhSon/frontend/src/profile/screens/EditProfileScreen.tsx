import React, { useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { AppInput } from '../../../components/common/AppInput';
import { AppButton } from '../../../components/common/AppButton';
import { useAuth } from '../../../hooks/useAuth';

export const EditProfileScreen = ({ navigation }: any) => {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const save = () => {
    if (user) { updateUser({ ...user, fullName, email, phone }); Alert.alert('Thành công', 'Đã cập nhật hồ sơ!'); navigation.goBack(); }
  };

  return (
    <ScreenContainer>
      <Header title="Chỉnh sửa hồ sơ" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.c}>
        <AppInput label="Họ tên" value={fullName} onChangeText={setFullName} />
        <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppInput label="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppButton title="Lưu thay đổi" onPress={save} icon="checkmark-circle-outline" />
      </ScrollView>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({ c: { padding: 16, paddingBottom: 130 } });
