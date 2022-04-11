import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SimulatorCard from '../components/SimulatorCard';

export default function SimulatorScreen() {
  return (
      <ScrollView style={styles.container}>
          <SimulatorCard />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
