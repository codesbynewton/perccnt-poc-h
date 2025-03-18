import React, { useMemo, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { useRouter } from 'expo-router'

interface PortfolioItem {
  id: string
  name: string
  invested: string
  returns: string
}

const PortfolioScreen: React.FC = () => {

  const router = useRouter()

  const portfolioData = useMemo(() => require("../../data/portfolioData.json"), []);

  const totalValue = useMemo(() => {
    return portfolioData.reduce((total: number, item: { invested: string }) => {
      const value = Number(item.invested.replace(/[^\d]/g, '')) || 0;
      return total + value;
    }, 0);
  }, []);

  const renderItem = useCallback(({ item }: { item: PortfolioItem }) => {
    const isLoss = item.returns.startsWith('-');
    const returnsColor = isLoss ? theme.colors.error : theme.colors.success;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardValue}>Invested: {item.invested}</Text>
        <Text style={[styles.cardGains, { color: returnsColor }]}>
          {isLoss ? 'Loss: ' : 'Profit: '}
          {item.returns}
        </Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: PortfolioItem) => item.id, []);

  const handleLogout = () =>{
    router.push('/components/login/LoginPage')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment Portfolio</Text>
      
      <FlatList
        data={portfolioData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.total}>Total Value: ₹{totalValue.toLocaleString('en-IN')}</Text>
          </View>
        }
      />

      <Button
        mode="contained"
        onPress={handleLogout}
        buttonColor={theme.colors.primary}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingBottom: theme.spacing.large,
    justifyContent: 'space-between',
  },
  button: {
    color: theme.colors.primary
  },
  title: {
    fontSize: theme.fontSize.xlarge,
    fontWeight: '700',
    marginHorizontal: theme.spacing.large,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.medium,
    color: theme.colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    marginTop: theme.spacing.small,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2.5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  cardValue: {
    fontSize: theme.fontSize.medium,
    marginTop: theme.spacing.small,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  cardGains: {
    fontSize: theme.fontSize.small,
    marginTop: theme.spacing.small,
  },
  footer: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  logoutButton: {
    width: 'auto',
    alignSelf: 'center',
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.xlarge,
  },
  total: {
    fontSize: theme.fontSize.large,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
});

export default React.memo(PortfolioScreen);
