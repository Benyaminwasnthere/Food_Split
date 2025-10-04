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

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameErr = useMemo(() => (name && name.length < 2 ? 'Enter your name' : ''), [name]);
  const emailErr = useMemo(() => (email && !EMAIL_RE.test(email) ? 'Enter a valid email' : ''), [email]);
  const pwErr = useMemo(() => (pw && pw.length < 8 ? 'Min 8 characters' : ''), [pw]);
  const matchErr = useMemo(() => (confirm && confirm !== pw ? 'Passwords do not match' : ''), [confirm, pw]);
  const formValid =
    name.length >= 2 && EMAIL_RE.test(email) && pw.length >= 8 && confirm === pw;

  const onSignUp = async () => {
    if (!formValid || loading) return;
    setLoading(true);

    // TODO: replace with real API call
    setTimeout(() => {
      setLoading(false);
      // On success, go to app or back to Login
      navigation.replace('Home'); // or navigation.navigate('Login')
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join Food Split</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, nameErr ? styles.inputError : null]}
            placeholder="Alex and Benyamin the boy"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />
          {!!nameErr && <Text style={styles.error}>{nameErr}</Text>}

          <Text style={[styles.label, { marginTop: 14 }]}>Email</Text>
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
              placeholder="Create a password"
              secureTextEntry={!showPw}
              autoCapitalize="none"
              value={pw}
              onChangeText={setPw}
              returnKeyType="next"
            />
            <TouchableOpacity onPress={() => setShowPw((s) => !s)}>
              <Text style={styles.link}>{showPw ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {!!pwErr && <Text style={styles.error}>{pwErr}</Text>}

          <Text style={[styles.label, { marginTop: 14 }]}>Confirm password</Text>
          <TextInput
            style={[styles.input, matchErr ? styles.inputError : null]}
            placeholder="Repeat password"
            secureTextEntry={!showPw}
            autoCapitalize="none"
            value={confirm}
            onChangeText={setConfirm}
            returnKeyType="done"
            onSubmitEditing={onSignUp}
          />
          {!!matchErr && <Text style={styles.error}>{matchErr}</Text>}

          <TouchableOpacity
            style={[styles.button, !formValid || loading ? styles.buttonDisabled : null]}
            onPress={onSignUp}
            disabled={!formValid || loading}
          >
            {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Create account</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 14 }}>
            <Text style={styles.muted}>
              Already have an account? <Text style={styles.link}>Log in</Text>
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
