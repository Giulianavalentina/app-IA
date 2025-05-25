import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useGame } from '../context/GameContext';

export default function GameOverScreen({ navigation }) {
  const { score, resetGame, saveScore } = useGame();
  const [name, setName] = useState('');

  const handleSaveScore = () => {
    if (name.trim()) {
      saveScore(name, score);
      setName('');
      navigation.navigate('Leaderboard');
    } else {
      alert('Por favor, ingresa tu nombre.');
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('MainGame');
  };

  const handleViewLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  const handleGoHome = () => {
    resetGame();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#D6C9D9' }]}>
      <View style={styles.content}>
        <Text style={styles.gameOverText}>¡Partida Terminada!</Text>
        <Text style={styles.scoreText}>Puntuación Final:</Text>
        <Text style={styles.finalScore}>{score} puntos</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#008080' }]}
          onPress={handleSaveScore}
        >
          <Text style={styles.buttonText}>Guardar Puntuación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#A8BFA5' }]}
          onPress={handlePlayAgain}
        >
          <Text style={styles.buttonText}>Volver a Jugar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#8FBC8F', justifyContent: 'center' }]}
          onPress={handleViewLeaderboard}
        >
          <Text style={styles.buttonText}>Ver Tabla de Clasificación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#E27D60' }]}
          onPress={handleGoHome}
        >
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#333333',
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
  },
  activeDot: {
    backgroundColor: '#000000',
  },
});