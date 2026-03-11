import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
}

const COLORS = ['#000000', '#E2231A', '#0000FF', '#008000', '#FF8C00'];

export default function DrawingScreen() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentColor, setCurrentColor] = useState('#000000');
  const currentStroke = useRef<Point[]>([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const {locationX, locationY} = evt.nativeEvent;
      currentStroke.current = [{x: locationX, y: locationY}];
    },
    onPanResponderMove: (evt) => {
      const {locationX, locationY} = evt.nativeEvent;
      currentStroke.current.push({x: locationX, y: locationY});
    },
    onPanResponderRelease: () => {
      if (currentStroke.current.length > 0) {
        setStrokes(prev => [
          ...prev,
          {points: [...currentStroke.current], color: currentColor},
        ]);
        currentStroke.current = [];
      }
    },
  });

  const handleClear = () => {
    setStrokes([]);
  };

  const handleSave = () => {
    if (strokes.length === 0) {
      Alert.alert('Empty Canvas', 'Please draw something first.');
      return;
    }
    Alert.alert('Saved', 'Your drawing has been saved!');
  };

  return (
    <View testID="drawing-screen" style={styles.container}>
      <Text style={styles.title}>Drawing Pad</Text>

      <View style={styles.colorRow}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            testID={`color-picker-${color.replace('#', '')}`}
            style={[
              styles.colorCircle,
              {backgroundColor: color},
              currentColor === color && styles.colorSelected,
            ]}
            onPress={() => setCurrentColor(color)}
          />
        ))}
      </View>

      <View
        testID="drawing-canvas"
        style={styles.canvas}
        {...panResponder.panHandlers}>
        {strokes.map((stroke, i) =>
          stroke.points.map((point, j) => (
            <View
              key={`${i}-${j}`}
              style={[
                styles.dot,
                {
                  left: point.x - 3,
                  top: point.y - 3,
                  backgroundColor: stroke.color,
                },
              ]}
            />
          )),
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          testID="clear-button"
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="save-button"
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  colorRow: {flexDirection: 'row', gap: 12, marginBottom: 16},
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  colorSelected: {borderColor: '#E2231A', borderWidth: 3},
  canvas: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd'},
  clearButtonText: {fontSize: 16, fontWeight: '600', color: '#333'},
  saveButton: {backgroundColor: '#E2231A'},
  saveButtonText: {fontSize: 16, fontWeight: '600', color: '#fff'},
});
