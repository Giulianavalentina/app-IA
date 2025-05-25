import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useGame } from '../context/GameContext';

export default function MainGameScreen({ navigation }) {
  const { objects, setCurrentObject, score, isGameComplete } = useGame();

  React.useEffect(() => {
    if (isGameComplete()) {
      navigation.navigate('GameOver');
    }
  }, [objects, navigation, isGameComplete]);

  const handleObjectPress = (object) => {
    if (!object.found) {
      setCurrentObject(object);
      navigation.navigate('Camera');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#D6C9D9' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Encuentra los objetos</Text>
        <Text style={styles.score}>Puntos: {score}</Text>
      </View>

      <View style={styles.content}>
        {objects.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.objectCard,
              item.found && styles.foundObjectCard
            ]}
            onPress={() => handleObjectPress(item)}
            disabled={item.found}
          >
            <Image source={require(`../imag/${item.image}`)} style={styles.objectImage} resizeMode="contain" />
            <Text style={styles.objectName}>{item.name}</Text>
            {item.found && (
              <View style={styles.foundIndicator}>
                <Text style={styles.foundIcon}>👁️</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.pagination}>
        {/* ... pagination dots ... */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  objectCard: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#000000',
  },
  foundObjectCard: {
    backgroundColor: 'rgba(144, 238, 144, 0.5)',
  },
  objectName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 5,
  },
  foundIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  foundIcon: {
    fontSize: 16,
    color: '#2E7D32',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d9d9d9',
  },
  activeDot: {
    backgroundColor: '#000000',
  },
  objectImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 5,
  },
});