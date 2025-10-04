import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailErr = useMemo(() => (email && !EMAIL_RE.test(email) ? 'Enter a valid email' : ''), [email]);
  const pwErr = useMemo(() => (pw && pw.length < 8 ? 'Min 8 characters' : ''), [pw]);
  const formValid = EMAIL_RE.test(email) && pw.length >= 8;

  const onLogin = async () => {
    if (!formValid || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to continue</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailErr ? styles.inputError : null]}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
          />
          {!!emailErr && <Text style={styles.error}>{emailErr}</Text>}

          <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
          <View style={[styles.input, styles.row, pwErr ? styles.inputError : null]}>
            <TextInput
              style={styles.textInput}
              placeholder="Your password"
              secureTextEntry={!showPw}
              autoCapitalize="none"
              value={pw}
              onChangeText={setPw}
              returnKeyType="done"
              onSubmitEditing={onLogin}
            />
            <TouchableOpacity onPress={() => setShowPw((s) => !s)}>
              <Text style={styles.link}>{showPw ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {!!pwErr && <Text style={styles.error}>{pwErr}</Text>}

          <TouchableOpacity
            style={[styles.button, !formValid || loading ? styles.buttonDisabled : null]}
            onPress={onLogin}
            disabled={!formValid || loading}
          >
            {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Log In</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 14 }}>
            <Text style={styles.muted}>
              Don’t have an account? <Text style={styles.link}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F8' },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 15, color: '#6B7280', marginTop: 4 },
  form: {},
  label: { fontSize: 14, color: '#374151', marginBottom: 6 },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textInput: { flex: 1, paddingRight: 12 },
  inputError: { borderColor: '#EF4444' },
  error: { color: '#EF4444', marginTop: 6 },
  button: {
    height: 50,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  link: { color: '#0EA5E9', fontWeight: '600' },
  muted: { color: '#6B7280' },
});
