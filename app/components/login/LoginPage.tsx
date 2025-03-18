import React, { useState, useCallback, useMemo } from 'react'
import { View, TextInput, Text, StyleSheet, Keyboard } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useSnackbar } from '@/app/utils/SnackBarContext'
import credentials from '../../data/credentials.json'
import { theme } from '../../theme/theme'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const isFormValid = useMemo(() => 
    username.trim() !== '' && password.trim() !== '',
    [username, password]
  )

  const handleLogin = useCallback(() => {
    Keyboard.dismiss()
    
    if (username === credentials.username && 
        password === credentials.password) {
      router.push('/components/panCard/PanCardEntryScreen')
    } else {
      enqueueSnackbar({ 
        message: 'Username or Password is Invalid', 
        variant: 'error' 
      })
    }
  }, [username,password, router, enqueueSnackbar])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        testID="username-input"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={isFormValid ? handleLogin : undefined}
        testID="password-input"
      />
      
      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={!isFormValid} 
        buttonColor={theme.colors.primary}
        style={styles.loginButton}
        
      >
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xxlarge,
    fontWeight: '600',
    marginBottom: theme.spacing.large,
    color: theme.colors.textPrimary,
  },
  input: {
    width: '100%',
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
  },
  loginButton: {
    width: 'auto',
    alignSelf: 'center',
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.xlarge,
  },
})

export default React.memo(LoginPage)
