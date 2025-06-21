import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, MapPin, Navigation, DollarSign, Clock, Phone, CircleCheck as CheckCircle, X, Star, TrendingUp, Zap } from 'lucide-react-native';

interface RideRequest {
  id: string;
  passengerName: string;
  passengerPhoto: string;
  pickup: string;
  destination: string;
  distance: number;
  estimatedFare: number;
  requestTime: string;
  passengerPhone: string;
  rating: number;
}

const mockRideRequests: RideRequest[] = [
  {
    id: '1',
    passengerName: 'Miteran',
    passengerPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    pickup: 'Andrainjato',
    destination: 'Hospital',
    distance: 2.5,
    estimatedFare: 15,
    requestTime: '2024-01-15 14:35',
    passengerPhone: '+1234567890',
    rating: 4.8,
  },
  {
    id: '2',
    passengerName: 'Rismu',
    passengerPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    pickup: 'ENI',
    destination: 'Cité Andrainjato',
    distance: 1.8,
    estimatedFare: 12,
    requestTime: '2024-01-15 14:42',
    passengerPhone: '+1234567891',
    rating: 4.9,
  },
];

export default function DriverScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>(mockRideRequests);
  const [currentRide, setCurrentRide] = useState<RideRequest | null>(null);
  const [earnings, setEarnings] = useState({
    today: 85,
    thisWeek: 420,
    thisMonth: 1680,
  });

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      Alert.alert('🚗 You\'re Online!', 'You are now available for ride requests!');
    } else {
      Alert.alert('📴 You\'re Offline', 'You are now offline. No new requests will be sent.');
    }
  };

  const handleAcceptRide = (request: RideRequest) => {
    setCurrentRide(request);
    setRideRequests(prev => prev.filter(r => r.id !== request.id));
    Alert.alert('✅ Ride Accepted', `You have accepted the ride from ${request.passengerName}`);
  };

  const handleDeclineRide = (requestId: string) => {
    setRideRequests(prev => prev.filter(r => r.id !== requestId));
    Alert.alert('❌ Ride Declined', 'The ride request has been declined.');
  };

  const handleCompleteRide = () => {
    if (currentRide) {
      setEarnings(prev => ({
        ...prev,
        today: prev.today + currentRide.estimatedFare,
      }));
      Alert.alert('🎉 Ride Completed', `Ride completed! You earned $${currentRide.estimatedFare}`);
      setCurrentRide(null);
    }
  };

  const handleCallPassenger = (phoneNumber: string) => {
    Alert.alert('📞 Calling Passenger', `Calling ${phoneNumber}...`);
  };

  const renderRideRequest = (request: RideRequest) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.passengerSection}>
          <Image source={{ uri: request.passengerPhoto }} style={styles.passengerPhoto} />
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>{request.passengerName}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{request.rating}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => handleCallPassenger(request.passengerPhone)}
        >
          <Phone size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.routeSection}>
        <View style={styles.routeItem}>
          <View style={styles.routeIconContainer}>
            <MapPin size={16} color="#10B981" />
          </View>
          <Text style={styles.routeText}>{request.pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <View style={styles.routeIconContainer}>
            <Navigation size={16} color="#EF4444" />
          </View>
          <Text style={styles.routeText}>{request.destination}</Text>
        </View>
      </View>

      <View style={styles.requestDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>{request.distance} km</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fare</Text>
          <Text style={styles.fareValue}>${request.estimatedFare}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Requested</Text>
          <Text style={styles.detailValue}>
            {new Date(request.requestTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDeclineRide(request.id)}
        >
          <X size={18} color="#EF4444" />
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptRide(request)}
        >
          <CheckCircle size={18} color="#FFFFFF" />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Driver Dashboard</Text>
            <Text style={styles.subtitle}>Manage your rides and earnings</Text>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
            style={styles.headerImage}
          />
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusInfo}>
              <View style={[styles.statusIndicator, { backgroundColor: isOnline ? '#10B981' : '#64748B' }]}>
                <Car size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text style={[styles.statusText, { color: isOnline ? '#10B981' : '#64748B' }]}>
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
                <Text style={styles.statusDescription}>
                  {isOnline 
                    ? 'Available for ride requests' 
                    : 'Turn on to receive requests'
                  }
                </Text>
              </View>
            </View>
            <Switch
              value={isOnline}
              onValueChange={handleToggleOnline}
              trackColor={{ false: '#E2E8F0', true: '#DCFCE7' }}
              thumbColor={isOnline ? '#10B981' : '#94A3B8'}
            />
          </View>
        </View>

        {/* Earnings Section */}
        <View style={styles.earningsSection}>
          <Text style={styles.sectionTitle}>💰 Earnings Overview</Text>
          <View style={styles.earningsGrid}>
            <View style={styles.earningCard}>
              <View style={styles.earningIcon}>
                <Zap size={20} color="#10B981" />
              </View>
              <Text style={styles.earningValue}>${earnings.today}</Text>
              <Text style={styles.earningLabel}>Today</Text>
            </View>
            <View style={styles.earningCard}>
              <View style={styles.earningIcon}>
                <TrendingUp size={20} color="#3B82F6" />
              </View>
              <Text style={styles.earningValue}>${earnings.thisWeek}</Text>
              <Text style={styles.earningLabel}>This Week</Text>
            </View>
            <View style={styles.earningCard}>
              <View style={styles.earningIcon}>
                <DollarSign size={20} color="#F59E0B" />
              </View>
              <Text style={styles.earningValue}>${earnings.thisMonth}</Text>
              <Text style={styles.earningLabel}>This Month</Text>
            </View>
          </View>
        </View>

        {/* Current Ride */}
        {currentRide && (
          <View style={styles.currentRideSection}>
            <Text style={styles.sectionTitle}>🚗 Current Ride</Text>
            <View style={styles.currentRideCard}>
              <View style={styles.passengerHeader}>
                <Image source={{ uri: currentRide.passengerPhoto }} style={styles.currentPassengerPhoto} />
                <View style={styles.currentPassengerInfo}>
                  <Text style={styles.currentPassengerName}>{currentRide.passengerName}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.rating}>{currentRide.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCallPassenger(currentRide.passengerPhone)}
                >
                  <Phone size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.routeSection}>
                <View style={styles.routeItem}>
                  <View style={styles.routeIconContainer}>
                    <MapPin size={16} color="#10B981" />
                  </View>
                  <Text style={styles.routeText}>{currentRide.pickup}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeItem}>
                  <View style={styles.routeIconContainer}>
                    <Navigation size={16} color="#EF4444" />
                  </View>
                  <Text style={styles.routeText}>{currentRide.destination}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleCompleteRide}
              >
                <CheckCircle size={20} color="#FFFFFF" />
                <Text style={styles.completeButtonText}>Complete Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Ride Requests */}
        {isOnline && rideRequests.length > 0 && (
          <View style={styles.requestsSection}>
            <Text style={styles.sectionTitle}>📋 Ride Requests</Text>
            {rideRequests.map(renderRideRequest)}
          </View>
        )}

        {/* Empty States */}
        {isOnline && rideRequests.length === 0 && !currentRide && (
          <View style={styles.emptyState}>
            <Clock size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Waiting for Requests</Text>
            <Text style={styles.emptySubtitle}>
              You're online and ready to receive ride requests
            </Text>
          </View>
        )}

        {!isOnline && (
          <View style={styles.offlineState}>
            <Car size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>You're Offline</Text>
            <Text style={styles.emptySubtitle}>
              Turn on your availability to start receiving ride requests
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  statusIndicator: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  earningsSection: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  earningsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  earningCard: {
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
  earningIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  earningValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  earningLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentRideSection: {
    margin: 16,
    marginTop: 8,
  },
  currentRideCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  passengerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPassengerPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  currentPassengerInfo: {
    flex: 1,
  },
  currentPassengerName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  requestsSection: {
    margin: 16,
    marginTop: 8,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  passengerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  passengerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
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
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
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
  declineButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 16,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 16,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  offlineState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});