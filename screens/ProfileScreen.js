import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, FONTS } from '../theme';

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const { width } = useWindowDimensions(); // Ekran genişliğini alıyoruz
  
  const currentTheme = COLORS[theme];
  const isLargeScreen = width > 500; // Geniş ekran kontrolü

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      
      {/* Tema Değiştirme Butonu */}
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons 
          name={theme === 'light' ? 'moon' : 'sunny'} 
          size={24} 
          color={currentTheme.text} 
        />
      </Pressable>

      {/* Profil Kartı - Dinamik Stil */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: currentTheme.card,
          width: isLargeScreen ? '50%' : '85%', // Büyük ekranda daha dar, mobilde geniş
          padding: isLargeScreen ? SPACING.xl : SPACING.lg
        }
      ]}>
        <Ionicons 
          name="person-circle-outline" 
          size={isLargeScreen ? 120 : 80} // İkon boyutu da değişiyor
          color={currentTheme.text} 
        />
        
        <Text style={[styles.name, { color: currentTheme.text }]}>John Doe</Text>
        <Text style={[styles.role, { color: currentTheme.text }]}>Mobile Developer</Text>

        <Pressable
          style={({ pressed }) => [
            styles.likeButton,
            { backgroundColor: pressed ? '#e63946' : '#ff6b6b' }
          ]}
          onPress={() => console.log('Profile Liked!')}
        >
          <Ionicons name="heart" size={20} color="white" />
          <Text style={styles.likeText}>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: SPACING.sm,
    zIndex: 1,
  },
  card: {
    // Sabit width kaldırıldı, yukarıda dinamik verilecek
    borderRadius: RADII.md,
    alignItems: 'center',
    // iOS shadow
    shadowColor: COLORS.light.cardShadow,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Android shadow
    elevation: 6,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: SPACING.md,
  },
  role: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 50,
    marginTop: SPACING.md,
  },
  likeText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
});