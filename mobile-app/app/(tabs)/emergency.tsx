import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Vibration, Linking, Platform, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/components/useColorScheme';
import { Colors } from '@/constants/Colors';
import { AmbulanceIcon, PhoneIcon, LocationIcon, TimerIcon, InfoIcon, ContactIcon, HospitalIcon } from '@/assets/icons';

interface Hospital {
  name: string;
  address: string;
  distance: number;
  rating: number;
  isOpen24Hours: boolean;
  phone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function EmergencyScreen() {
  const colorScheme = useColorScheme();
  const [isEmergency, setIsEmergency] = useState(false);
  const [ambulanceStatus, setAmbulanceStatus] = useState<'searching' | 'found' | 'arriving' | null>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    setupLocation();
    setupSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const setupLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for emergency services.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      findNearbyHospitals(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const findNearbyHospitals = async (userLocation: Location.LocationObject) => {
    setIsLoadingHospitals(true);
    try {
      // Simulate API call to find nearby hospitals
      // In a real app, you would use Google Places API or similar
      const mockHospitals: Hospital[] = [
        {
          name: "City General Hospital",
          address: "123 Main St, City",
          distance: 2.5,
          rating: 4.5,
          isOpen24Hours: true,
          phone: "+1234567890",
          coordinates: {
            latitude: userLocation.coords.latitude + 0.01,
            longitude: userLocation.coords.longitude + 0.01,
          }
        },
        {
          name: "Medical Center",
          address: "456 Health Ave, City",
          distance: 3.8,
          rating: 4.2,
          isOpen24Hours: true,
          phone: "+1987654321",
          coordinates: {
            latitude: userLocation.coords.latitude - 0.01,
            longitude: userLocation.coords.longitude - 0.01,
          }
        }
      ];
      setNearbyHospitals(mockHospitals);
    } catch (error) {
      console.error('Error finding hospitals:', error);
      Alert.alert('Error', 'Unable to find nearby hospitals. Please try again.');
    } finally {
      setIsLoadingHospitals(false);
    }
  };

  const setupSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/emergency-siren.mp3'),
        { shouldPlay: false, isLooping: true }
      );
      setSound(sound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const playEmergencySound = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopEmergencySound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

  const handleEmergencyPress = async () => {
    if (!location) {
      Alert.alert('Error', 'Unable to get your location. Please enable location services.');
      return;
    }

    setIsEmergency(true);
    Vibration.vibrate([0, 500, 200, 500], true);
    await playEmergencySound();

    setAmbulanceStatus('searching');
    setTimeout(() => setAmbulanceStatus('found'), 2000);
    setTimeout(() => setAmbulanceStatus('arriving'), 4000);

    setEta(5);

    const { latitude, longitude } = location.coords;
    const url = Platform.select({
      ios: `maps:${latitude},${longitude}?q=Emergency`,
      android: `geo:${latitude},${longitude}?q=Emergency`,
    });
    if (url) {
      await Linking.openURL(url);
    }

    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
  };

  const handleStopEmergency = async () => {
    setIsEmergency(false);
    Vibration.cancel();
    await stopEmergencySound();
    setAmbulanceStatus(null);
    setEta(null);
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:911');
  };

  const handleCallHospital = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleNavigateToHospital = (hospital: Hospital) => {
    const url = Platform.select({
      ios: `maps:${hospital.coordinates.latitude},${hospital.coordinates.longitude}?q=${encodeURIComponent(hospital.name)}`,
      android: `geo:${hospital.coordinates.latitude},${hospital.coordinates.longitude}?q=${encodeURIComponent(hospital.name)}`,
    });
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Emergency Services</Text>
          <Text style={styles.headerSubtitle}>Immediate Medical Assistance</Text>
        </View>

        {/* Emergency Button */}
        <View style={styles.emergencySection}>
          <TouchableOpacity
            style={[
              styles.emergencyButton,
              isEmergency && styles.emergencyButtonActive,
            ]}
            onPress={isEmergency ? handleStopEmergency : handleEmergencyPress}
          >
            <Text style={styles.emergencyButtonText}>
              {isEmergency ? 'STOP EMERGENCY' : 'EMERGENCY ALERT'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCallEmergency}>
            <PhoneIcon width={24} height={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Call 911</Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        {location && (
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
                description="Emergency Location"
                pinColor="#FF3B30"
              />
              {nearbyHospitals.map((hospital, index) => (
                <Marker
                  key={index}
                  coordinate={hospital.coordinates}
                  title={hospital.name}
                  description={`${hospital.distance}km away`}
                  pinColor="#007AFF"
                />
              ))}
            </MapView>
          </View>
        )}

        {/* Ambulance Status */}
        {ambulanceStatus && (
          <View style={styles.statusContainer}>
            <AmbulanceIcon width={24} height={24} color="#007AFF" />
            <Text style={styles.statusText}>
              {ambulanceStatus === 'searching' && 'Searching for nearest ambulance...'}
              {ambulanceStatus === 'found' && 'Ambulance found! En route...'}
              {ambulanceStatus === 'arriving' && 'Ambulance arriving...'}
            </Text>
            {eta !== null && (
              <View style={styles.etaContainer}>
                <TimerIcon width={20} height={20} color="#007AFF" />
                <Text style={styles.etaText}>ETA: {eta} minutes</Text>
              </View>
            )}
          </View>
        )}

        {/* Nearby Hospitals */}
        <View style={styles.hospitalsContainer}>
          <View style={styles.sectionHeader}>
            <HospitalIcon width={24} height={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
          </View>
          {isLoadingHospitals ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            nearbyHospitals.map((hospital, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hospitalCard}
                onPress={() => handleNavigateToHospital(hospital)}
              >
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                  <View style={styles.hospitalDetails}>
                    <Text style={styles.hospitalDistance}>{hospital.distance}km away</Text>
                    <Text style={styles.hospitalRating}>★ {hospital.rating}</Text>
                    {hospital.isOpen24Hours && (
                      <Text style={styles.hospitalOpen}>24/7</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCallHospital(hospital.phone)}
                >
                  <PhoneIcon width={20} height={20} color="#007AFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Emergency Instructions */}
        <View style={styles.instructionsContainer}>
          <InfoIcon width={24} height={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Emergency Instructions</Text>
          <Text style={styles.instructionText}>
            1. Stay calm and follow instructions{'\n'}
            2. Keep the patient lying flat{'\n'}
            3. Do not give food or water{'\n'}
            4. Keep airways clear{'\n'}
            5. Apply first aid if trained
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.contactsContainer}>
          <ContactIcon width={24} height={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:911')}>
            <Text style={styles.contactText}>Emergency Services: 911</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+1234567890')}>
            <Text style={styles.contactText}>Hospital: (123) 456-7890</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 180,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  emergencySection: {
    padding: 20,
    alignItems: 'center',
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyButtonActive: {
    backgroundColor: '#FF9500',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapContainer: {
    height: 200,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  etaText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#007AFF',
  },
  hospitalsContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#007AFF',
  },
  hospitalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  hospitalDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  hospitalDistance: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  hospitalRating: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 15,
  },
  hospitalOpen: {
    fontSize: 14,
    color: '#4CAF50',
  },
  callButton: {
    justifyContent: 'center',
    padding: 10,
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginTop: 10,
  },
  contactsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#007AFF',
  },
}); 