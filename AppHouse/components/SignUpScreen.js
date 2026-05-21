import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (name && email && phone && password) {
      Alert.alert('Thành công', 'Tài khoản của bạn đã được khởi tạo.', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
      ]);
    } else {
      Alert.alert('Lỗi', 'Vui lòng hoàn thiện tất cả các trường dữ liệu.');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.brandRow}>
                <Ionicons name="business" size={32} color="#1d4ed8" />
                <Text style={styles.brandText}>Smart Rent</Text>
              </View>

              <Text style={styles.title}>Create account</Text>

              <Text style={styles.subtitle}>
                Join Smart Rent and find your ideal living space.
              </Text>
            </View>

            <View style={styles.card}>
              {/* Full Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full name</Text>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#9ca3af"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email address</Text>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#9ca3af"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="your_email@gmail.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone number</Text>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="#9ca3af"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="0123456xxxx"
                    placeholderTextColor="#9ca3af"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>

                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Sign up</Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.loginLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 17,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },

  brandText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 320,
  },

  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },

  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },

  inputIcon: {
    paddingLeft: 14,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#111827',
  },

  button: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    alignItems: 'center',
  },

  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },

  loginLink: {
    color: '#1d4ed8',
    fontSize: 14,
    fontWeight: '700',
  },
});