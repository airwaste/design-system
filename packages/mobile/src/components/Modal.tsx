import React from 'react';
import { Modal as RNModal, Pressable, Text, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, footer, style, titleStyle, children }) => (
  <RNModal visible={open} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 16 }} onPress={onClose}>
      <Pressable
        style={[
          {
            backgroundColor: theme.colors.brand.white,
            borderRadius: theme.radii.lg,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.18,
            shadowRadius: 30,
            elevation: 10,
          },
          style,
        ]}
        onPress={(e) => e.stopPropagation()}
      >
        {title && (
          <Text style={[{ fontSize: 16, fontWeight: '600', color: theme.colors.neutral[900], marginBottom: 12 }, titleStyle]}>
            {title}
          </Text>
        )}
        <View>{children}</View>
        {footer && <View style={{ marginTop: 16 }}>{footer}</View>}
      </Pressable>
    </Pressable>
  </RNModal>
);
