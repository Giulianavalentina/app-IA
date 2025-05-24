import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useGame } from '../context/GameContext';

export default function GameOverScreen({ navigation }) {
  const { score, resetGame, addToLeaderboard } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleSubmitScore = () => {
    if (playerName.trim()) {
      addToLeaderboard(playerName.trim(), score);
      setNameSubmitted(true);
    } else {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('MainGame');
  };

  const handleGoHome = () => {
    resetGame();
    navigation.navigate('Home');
  };

  const handleViewLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Partida Terminada!</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Puntuación Final:</Text>
          <Text style={styles.scoreValue}>{score} puntos</Text>
        </View>

        {!nameSubmitted ? (
          <View style={styles.nameInputContainer}>
            <Text style={styles.nameLabel}>Ingresa tu nombre:</Text>
            <TextInput
              style={styles.nameInput}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Tu nombre"
              maxLength={20}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitScore}
            >
              <Text style={styles.buttonText}>Guardar Puntuación</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              ¡Puntuación guardada exitosamente!
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={handlePlayAgain}
          >
            <Text style={styles.buttonText}>Volver a Jugar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={handleViewLeaderboard}
          >
            <Text style={styles.buttonText}>Ver Tabla de Clasificación</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoHome}
          >
            <Text style={styles.buttonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#312b2b',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  nameInputContainer: {
    marginBottom: 32,
  },
  nameLabel: {
    fontSize: 16,
    color: '#312b2b',
    marginBottom: 12,
    textAlign: 'center',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successText: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
  },
  playAgainButton: {
    backgroundColor: '#312b2b',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  leaderboardButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#757575',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
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
});