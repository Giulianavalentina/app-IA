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

  const renderRow = (rowObjects) => (
    <View key={rowObjects.map(obj => obj.id).join('-')} style={styles.row}>
      {rowObjects.map((item) => (
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
      {rowObjects.length === 1 && <View style={{ width: '45%', margin: 5 }} />} {/* Placeholder for even spacing */}
    </View>
  );

  const pairs = objects.reduce((acc, curr, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2));
    }
    return acc;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Encuentra los objetos</Text>
        <Text style={styles.score}>Puntos: {score}</Text>
      </View>

      <View style={styles.content}>
        {pairs.map(row => renderRow(row))}
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
    backgroundColor: '#ffffff',
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
    color: '#312b2b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10, // Reducimos el padding horizontal
    marginTop: 10, // Añadimos un poco de margen superior
  },
row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Cambiamos a space-between
    marginBottom: 10,
    paddingHorizontal: 10, // Añadimos un poco de padding horizontal a la fila
  },
  objectCard: {
    width: '48%', // Volvemos a un ancho cercano a la mitad
    aspectRatio: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 5, // Añadimos un poco de margen vertical
  },
  objectCard: {
    width: '45%', // Mantenemos el ancho
    aspectRatio: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 12,
    margin: 5, // Reducimos el margen
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  foundObjectCard: {
    backgroundColor: '#e8f5e8',
    borderWidth: 2,
    borderColor: '#4caf50',
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
    backgroundColor: '#4caf50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foundIcon: {
    fontSize: 12,
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
});