import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>DocQueue</ThemedText>
        <ThemedText style={styles.subtitle}>Healthcare Simplified</ThemedText>
      </ThemedView>

      {/* Main Content */}
      <ThemedView style={styles.content}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>About DocQueue</ThemedText>
          <ThemedText style={styles.cardText}>
            DocQueue is a revolutionary healthcare management platform designed to streamline medical services and improve patient care. Our mission is to make healthcare more accessible and efficient for everyone.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Key Features</ThemedText>
          <ThemedText style={styles.cardText}>
            • Digital Health Records{'\n'}
            • Appointment Management{'\n'}
            • Secure Communication{'\n'}
            • Real-time Updates{'\n'}
            • Patient Portal Access
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Contact Us</ThemedText>
          <ThemedText style={styles.cardText}>
            Phone: (123) 456-7890{'\n'}
            Email: info@docqueue.com{'\n'}
            Address: 123 Healthcare Ave, Medical City
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Created By</ThemedText>
          <ThemedText style={styles.cardText}>
            Sobin Johnson{'\n'}
            Jeff Joji{'\n\n'}
            © 2024 DocQueue. All rights reserved.
          </ThemedText>
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
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
