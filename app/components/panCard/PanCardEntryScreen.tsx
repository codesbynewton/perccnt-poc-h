import React, { useState, useCallback, useMemo } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setPanCard } from '@/app/store/userSlice'
import { useRouter } from 'expo-router'
import { theme } from '../../theme/theme'

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/

const PanCardEntryScreen: React.FC = () => {
  const [panCard, setPanCardIP] = useState<string>('')
  const [error, setError] = useState<string>('')

  const dispatch = useDispatch()
  const router = useRouter()

  const panCardFromStore = useSelector((state: any) => state.user?.panCard)

  const isPanCardValid = useMemo(() => 
    PAN_REGEX.test(panCard), [panCard]
  )

  const handleSubmit = useCallback(() => {
    if (isPanCardValid) {
      dispatch(setPanCard(panCard))
      router.push('/components/portfolio/PortfolioScreen')
    } else {
      setError('Invalid PAN card number')
    }
  }, [panCard, isPanCardValid, dispatch, router])

  const handleLogout = () =>{
    router.push('/components/login/LoginPage')
  }

  const handlePanChange = useCallback((text: string) => {
    const formattedText = text.toUpperCase()
    setPanCardIP(formattedText)
    
    if (error) setError('')
  }, [error])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PAN Card Details</Text>
      <TextInput
        style={[styles.input, error ? styles.errorInput : undefined]}
        placeholder="Enter PAN Card Number"
        value={panCard}
        onChangeText={handlePanChange}
        autoCapitalize="characters"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        maxLength={10}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        mode="contained"
        onPress={handleSubmit}
        buttonColor={theme.colors.primary}
        style={styles.logoutButton}
      >
        Submit
      </Button>
       <Button
        mode="contained"
        onPress={handleLogout}
        buttonColor={theme.colors.primary}
        style={styles.logoutButton}
      >
        Logout
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
    borderRadius: 5,
    backgroundColor: theme.colors.surface,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
  },
  logoutButton: {
    width: 'auto',
    alignSelf: 'center',
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.xlarge,
  },
})

export default React.memo(PanCardEntryScreen)
