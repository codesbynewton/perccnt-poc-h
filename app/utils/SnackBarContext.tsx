// SnackbarContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Snackbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

// Define a type for the context
interface SnackbarContextType {
  enqueueSnackbar: (params: { message: string, variant: 'message' | 'error' }) => void;
}

// Create the context
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// Snackbar Provider Component
export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<'message' | 'error'>('message'); // Default to 'message'
  const [visible, setVisible] = useState(false);

  const enqueueSnackbar = ({ message, variant }: { message: string, variant: 'message' | 'error' }) => {
    setMessage(message);
    setVariant(variant);
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar: enqueueSnackbar }}>
      {children}
      {/* Snackbar Component */}
      {message && (
        <Snackbar
          visible={visible}
          onDismiss={hideSnackbar}
          duration={3000}
          style={variant === 'error' ? styles.errorSnackbar : styles.messageSnackbar}
        >
          {message}
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Styles for the Snackbars
const styles = StyleSheet.create({
  messageSnackbar: {
    backgroundColor: '#4CAF50', // Green for messages
  },
  errorSnackbar: {
    backgroundColor: '#D32F2F', // Red for errors
  },
});
