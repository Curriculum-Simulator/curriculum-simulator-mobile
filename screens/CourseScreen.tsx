import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import CourseCard from '../components/CourseCard';

export default function CourseScreen() {
  return (
      <ScrollView style={styles.container}>
        <CourseCard />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
