import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Colors maintained from your original code
const COLORS = {
  primary: '#4F46E5',
  accent: '#4F46E5',
  background: '#FCFCFD',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};

const RADIUS = {
  button: 14,
};

const SLIDES = [
  {
    id: '1',
    title: 'Your Home, Fully Stocked',
    description: 'Welcome to Daily Drop! From groceries to everyday household essentials.',
    imageUrl: require('../public/assets/images/Shopping bag-bro.svg'),
  },
  {
    id: '2',
    title: 'Fast & Reliable Delivery',
    description: 'Order what you need and get it delivered right to your doorstep.',
    imageUrl: require('../public/assets/images/Address-bro.svg'),
  },
  {
    id: '3',
    title: 'Hassle-Free Living',
    description: 'We handle the errands so you can enjoy a simpler way to run your home.',
    imageUrl: require('../public/assets/images/Enthusiastic-cuate.svg'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/authLayout');
    }
  };

  const handleSkip = () => {
    router.replace('/authLayout');
  };

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        {/* Skip button placed at the top right of each slide like the screenshot */}
        <View style={styles.topBar}>
          {currentIndex < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Centered Image Area */}
        <View style={styles.imageContainer}>
          <Image
            source={item.imageUrl}
            style={styles.illustration}
            contentFit="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      {/* Full-width action button */}
      <View style={styles.footer}>
        {/* Progress Dots */}
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Keep Going'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
  },
  topBar: {
    height: 50,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
  },
  skipText: {
    fontFamily: 'ClashDisplay-Semibold',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: '85%',
    height: '85%',
  },
  content: {
    flex: 0.4,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ClashDisplay-Semibold',
    fontSize: 22,
    // fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 9,
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    fontFamily: 'ClashDisplay-Regular',
    fontSize: 15,
    // fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 23,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: COLORS.border,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'ClashDisplay-Semibold',
    color: COLORS.surface,
    fontSize: 16,
  },
});