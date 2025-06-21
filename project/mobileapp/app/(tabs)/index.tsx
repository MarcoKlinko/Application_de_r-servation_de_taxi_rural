import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  Navigation,
  Clock,
  Plus,
  Search,
  Zap,
  Users,
  Shield,
} from 'lucide-react-native';
import TaxiCard from '@/components/TaxiCard';

interface Taxi {
  id: string;
  driverName: string;
  driverPhoto: string;
  vehicleNumber: string;
  vehicleType: string;
  rating: number;
  distance: number;
  estimatedTime: number;
  priceEstimate: number;
  available: boolean;
  vehiclePhoto: string;
}

const mockTaxis: Taxi[] = [
  {
    id: '1',
    driverName: 'Marco',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-123',
    vehicleType: 'Sedan',
    rating: 4.8,
    distance: 2.5,
    estimatedTime: 8,
    priceEstimate: 15,
    available: true,
    vehiclePhoto: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
  {
    id: '2',
    driverName: 'Kevin',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-456',
    vehicleType: 'SUV',
    rating: 4.9,
    distance: 3.2,
    estimatedTime: 12,
    priceEstimate: 18,
    available: true,
    vehiclePhoto: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
  {
    id: '3',
    driverName: 'Rismu',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-789',
    vehicleType: 'Hatchback',
    rating: 4.7,
    distance: 1.8,
    estimatedTime: 6,
    priceEstimate: 12,
    available: false,
    vehiclePhoto: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
];

const features = [
  {
    icon: <Zap size={24} color="#3B82F6" />,
    title: 'Quick Booking',
    description: 'Book a ride in under 30 seconds',
  },
  {
    icon: <Shield size={24} color="#10B981" />,
    title: 'Safe & Secure',
    description: 'Verified drivers and secure payments',
  },
  {
    icon: <Users size={24} color="#F59E0B" />,
    title: 'Community Focused',
    description: 'Supporting local rural communities',
  },
];

export default function HomeScreen() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [availableTaxis, setAvailableTaxis] = useState<Taxi[]>(mockTaxis);
  const [isBooking, setIsBooking] = useState(false);

  const handleBookTaxi = (taxi: Taxi) => {
    if (!pickupLocation || !destination) {
      Alert.alert('Missing Information', 'Please enter both pickup location and destination.');
      return;
    }

    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      Alert.alert(
        'Booking Confirmed! 🎉',
        `Your taxi has been booked!\n\nDriver: ${taxi.driverName}\nVehicle: ${taxi.vehicleNumber} (${taxi.vehicleType})\nEstimated arrival: ${taxi.estimatedTime} minutes\n\nYou'll receive SMS updates about your ride.`,
        [{ text: 'Great!' }]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.title}>Rural Taxi</Text>
              <Text style={styles.subtitle}>Connecting rural communities with reliable transportation</Text>
            </View>
          </View>
        </View>

        {/* Booking Section */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Book Your Ride</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MapPin size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="Pickup location"
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholderTextColor="#94A3B8"
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Navigation size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="Where to?"
                value={destination}
                onChangeText={setDestination}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Rural Taxi?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Available Taxis */}
        <View style={styles.availabilitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Taxis</Text>
            <TouchableOpacity style={styles.refreshButton}>
              <Search size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.taxiList}>
            {availableTaxis.map((taxi) => (
              <TaxiCard
                key={taxi.id}
                taxi={taxi}
                onBook={handleBookTaxi}
                isBooking={isBooking}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Schedule Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
              <Clock size={24} color="#3B82F6" />
              <Text style={[styles.actionButtonText, styles.secondaryActionText]}>Recent Trips</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  heroSection: {
    position: 'relative',
    height: 280,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 18,
    color: '#E2E8F0',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  bookingSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    paddingVertical: 16,
  },
  featuresSection: {
    margin: 16,
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  availabilitySection: {
    margin: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
  },
  taxiList: {
    gap: 0,
  },
  quickActions: {
    margin: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOpacity: 0.06,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryActionText: {
    color: '#3B82F6',
  },
});