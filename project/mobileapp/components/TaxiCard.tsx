import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Navigation, Clock, Star, MapPin } from 'lucide-react-native';

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

interface TaxiCardProps {
  taxi: Taxi;
  onBook: (taxi: Taxi) => void;
  isBooking?: boolean;
}

export default function TaxiCard({ taxi, onBook, isBooking = false }: TaxiCardProps) {
  return (
    <View style={[styles.card, !taxi.available && styles.unavailableCard]}>
      <View style={styles.header}>
        <View style={styles.driverSection}>
          <Image source={{ uri: taxi.driverPhoto }} style={styles.driverPhoto} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{taxi.driverName}</Text>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleNumber}>{taxi.vehicleNumber}</Text>
              <Text style={styles.vehicleType}> • {taxi.vehicleType}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{taxi.rating}</Text>
        </View>
      </View>

      <Image source={{ uri: taxi.vehiclePhoto }} style={styles.vehiclePhoto} />

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.detailText}>{taxi.distance} km away</Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.detailText}>{taxi.estimatedTime} min</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${taxi.priceEstimate}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          !taxi.available && styles.unavailableButton,
          isBooking && styles.bookingButton,
        ]}
        onPress={() => onBook(taxi)}
        disabled={!taxi.available || isBooking}
      >
        <Text style={[
          styles.bookButtonText,
          !taxi.available && styles.unavailableButtonText,
        ]}>
          {isBooking ? 'Booking...' : taxi.available ? 'Book Now' : 'Unavailable'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  unavailableCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  vehicleType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
  },
  vehiclePhoto: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  priceContainer: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#166534',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  unavailableButton: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  bookingButton: {
    backgroundColor: '#64748B',
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  unavailableButtonText: {
    color: '#94A3B8',
  },
});