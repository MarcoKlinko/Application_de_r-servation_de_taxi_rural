import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock } from 'lucide-react-native';
import BookingCard from '@/components/BookingCard';

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

const mockBookings: Booking[] = [
  {
    id: '1',
    driverName: 'Kevin',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-123',
    vehicleType: 'Sedan',
    pickup: 'Village Centrale',
    destination: 'Anjoma Centre',
    bookingTime: '2024-01-15 14:30',
    estimatedArrival: '2024-01-15 14:38',
    status: 'active',
    fare: 15,
    driverPhone: '+1234567890',
    driverRating: 4.8,
  },
  {
    id: '2',
    driverName: 'Duhamel',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-456',
    vehicleType: 'SUV',
    pickup: 'Analakely',
    destination: 'Analamahitsy',
    bookingTime: '2024-01-15 09:15',
    estimatedArrival: '2024-01-15 09:25',
    status: 'completed',
    fare: 12,
    driverPhone: '+1234567891',
    driverRating: 4.9,
  },
  {
    id: '3',
    driverName: 'Mika',
    driverPhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
    vehicleNumber: 'TX-789',
    vehicleType: 'Hatchback',
    pickup: 'Anosizato',
    destination: 'Analakely',
    bookingTime: '2024-01-16 16:00',
    estimatedArrival: '2024-01-16 16:00',
    status: 'scheduled',
    fare: 18,
    driverPhone: '+1234567892',
    driverRating: 4.7,
  },
];

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setBookings(prev =>
              prev.map(booking =>
                booking.id === bookingId
                  ? { ...booking, status: 'cancelled' as const }
                  : booking
              )
            );
          },
        },
      ]
    );
  };

  const handleCallDriver = (phoneNumber: string) => {
    Alert.alert('Call Driver', `Calling ${phoneNumber}...`);
  };

  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'scheduled');
  const historyBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Bookings</Text>
          <Text style={styles.subtitle}>Track and manage your rides</Text>
        </View>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
          style={styles.headerImage}
        />
      </View>

      {/* Tab Container */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active & Scheduled
          </Text>
          {activeBookings.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeBookings.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' ? (
          activeBookings.length > 0 ? (
            activeBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
                onCall={handleCallDriver}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Calendar size={64} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Active Bookings</Text>
              <Text style={styles.emptySubtitle}>
                Your current and scheduled rides will appear here
              </Text>
              <TouchableOpacity style={styles.emptyButton}>
                <Text style={styles.emptyButtonText}>Book a Ride</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          historyBookings.length > 0 ? (
            historyBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Clock size={64} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Booking History</Text>
              <Text style={styles.emptySubtitle}>
                Your completed and cancelled rides will appear here
              </Text>
            </View>
          )
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  badge: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
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
    marginBottom: 32,
  },
  emptyButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  emptyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});