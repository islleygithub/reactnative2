import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, onUpdate, onDelete }) => {
  const [animatedValue] = useState(new Animated.Value(1));

  const handleDelete = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item.id);
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: animatedValue }]}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => onUpdate(item)}>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#02a898',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 2,
  },
  itemContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default Item;
