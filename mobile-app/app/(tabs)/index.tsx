import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>DocQueue</ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <ThemedView style={styles.actionContent}>
            <ThemedText type="subtitle">Book Appointment</ThemedText>
            <ThemedText>Schedule your visit</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <ThemedView style={styles.actionContent}>
            <ThemedText type="subtitle">Emergency</ThemedText>
            <ThemedText>Quick medical help</ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <ThemedView style={styles.actionContent}>
            <ThemedText type="subtitle">Find Hospital</ThemedText>
            <ThemedText>Locate nearby hospitals</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* Upcoming Appointments */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Appointments</ThemedText>
        <ThemedView style={styles.emptyState}>
          <ThemedText>No upcoming appointments</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Recent Activity */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
        <ThemedView style={styles.emptyState}>
          <ThemedText>No recent activity</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  quickActions: {
    padding: 16,
    gap: 16,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionContent: {
    gap: 4,
  },
  section: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
});
