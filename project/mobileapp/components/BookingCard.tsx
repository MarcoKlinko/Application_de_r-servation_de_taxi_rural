import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, MapPin, Navigation, Phone, X, CircleCheck as CheckCircle, Calendar, Star } from 'lucide-react-native';

interface Booking {
  id: string;
  driverName: string;
  driverPhoto: string;
  vehicleNumber: string;
  vehicleType: string;
  pickup: string;
  destination: string;
  bookingTime: string;
  estimatedArrival: string;
  status: 'active' | 'completed' | 'cancelled' | 'scheduled';
  fare: number;
  driverPhone: string;
  driverRating: number;
}

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onCall?: (phone: string) => void;
}

export default function BookingCard({ booking, onCancel, onCall }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#3B82F6';
      case 'cancelled': return '#EF4444';
      case 'scheduled': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock size={16} color="#10B981" />;
      case 'completed': return <CheckCircle size={16} color="#3B82F6" />;
      case 'cancelled': return <X size={16} color="#EF4444" />;
      case 'scheduled': return <Calendar size={16} color="#F59E0B" />;
      default: return <Clock size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          {getStatusIcon(booking.status)}
          <Text style={[styles.status, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
        <Text style={styles.bookingId}>#{booking.id}</Text>
      </View>

      <View style={styles.driverSection}>
        <Image source={{ uri: booking.driverPhoto }} style={styles.driverPhoto} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{booking.driverName}</Text>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleNumber}>{booking.vehicleNumber}</Text>
            <Text style={styles.vehicleType}> • {booking.vehicleType}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{booking.driverRating}</Text>
          </View>
        </View>
        {booking.status === 'active' && onCall && (
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => onCall(booking.driverPhone)}
          >
            <Phone size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.routeSection}>
        <View style={styles.routeItem}>
          <View style={styles.routeIconContainer}>
            <MapPin size={16} color="#10B981" />
          </View>
          <Text style={styles.routeText}>{booking.pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <View style={styles.routeIconContainer}>
            <Navigation size={16} color="#EF4444" />
          </View>
          <Text style={styles.routeText}>{booking.destination}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Booking Time</Text>
          <Text style={styles.detailValue}>
            {new Date(booking.bookingTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>
            {booking.status === 'scheduled' ? 'Scheduled' : 'ETA'}
          </Text>
          <Text style={styles.detailValue}>
            {new Date(booking.estimatedArrival).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fare</Text>
          <Text style={styles.fareValue}>${booking.fare}</Text>
        </View>
      </View>

      {booking.status === 'active' && onCancel && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => onCancel(booking.id)}
        >
          <X size={16} color="#EF4444" />
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bookingId: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  callButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  routeSection: {
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  routeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginLeft: 15,
    marginVertical: 4,
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  fareValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
});