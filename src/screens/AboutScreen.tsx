import React from 'react';
import {View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity} from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView
      testID="about-screen"
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Text style={styles.appIcon}>🧪</Text>
      <Text testID="app-name" style={styles.appName}>
        Raider Test App
      </Text>
      <Text testID="app-version" style={styles.version}>
        Version 1.0.0
      </Text>

      <Text style={styles.description}>
        A React Native demo app designed for mobile test automation practice.
        Built to work with ruby_raider and raider_desktop test frameworks.
      </Text>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text testID="platform-info" style={styles.infoValue}>
            React Native
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Purpose</Text>
          <Text testID="purpose-info" style={styles.infoValue}>
            Test Automation
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>License</Text>
          <Text testID="license-info" style={styles.infoValue}>
            MIT
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Links</Text>
      <TouchableOpacity
        testID="github-link"
        style={styles.linkRow}
        onPress={() =>
          Linking.openURL('https://github.com/RubyRaider/raider_test_app')
        }>
        <Text style={styles.linkText}>GitHub Repository</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="ruby-raider-link"
        style={styles.linkRow}
        onPress={() =>
          Linking.openURL('https://github.com/RubyRaider/ruby_raider')
        }>
        <Text style={styles.linkText}>Ruby Raider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 24, alignItems: 'center'},
  appIcon: {fontSize: 80, marginBottom: 12},
  appName: {fontSize: 28, fontWeight: 'bold', marginBottom: 4},
  version: {fontSize: 16, color: '#888', marginBottom: 24},
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  infoLabel: {fontSize: 14, color: '#666'},
  infoValue: {fontSize: 14, fontWeight: '600'},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  linkRow: {
    width: '100%',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  linkText: {fontSize: 16, color: '#0066CC'},
});
