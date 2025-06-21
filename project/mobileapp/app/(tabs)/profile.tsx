import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, Mail, MapPin, CreditCard, Bell, Shield, CircleHelp as HelpCircle, Settings, Star, TrendingUp, Calendar, CreditCard as Edit3, ChevronRight, Award, Clock } from 'lucide-react-native';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  totalRides: number;
  rating: number;
  isDriver: boolean;
  profilePhoto: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Marco klinko',
    email: 'marco.klinko@email.com',
    phone: '+1 (555) 123-4567',
    address: 'Centre Village, Ville Rurale',
    memberSince: '2023-06-15',
    totalRides: 47,
    rating: 4.8,
    isDriver: false,
    profilePhoto: 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg?semt=ais_hybrid&w=740',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [notifications, setNotifications] = useState({
    rideUpdates: true,
    promotions: false,
    driverUpdates: true,
  });

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('✅ Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSettingPress = (setting: string) => {
    Alert.alert('🚧 Coming Soon', `${setting} feature will be available soon.`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const renderProfileField = (
    icon: React.ReactNode,
    label: string,
    value: string,
    field: keyof UserProfile,
    editable: boolean = true
  ) => (
    <View style={styles.profileField}>
      <View style={styles.fieldIcon}>{icon}</View>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing && editable ? (
          <TextInput
            style={styles.fieldInput}
            value={editedProfile[field] as string}
            onChangeText={(text) =>
              setEditedProfile(prev => ({ ...prev, [field]: text }))
            }
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor="#94A3B8"
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    </View>
  );

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void,
    hasSwitch: boolean = false,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E2E8F0', true: '#DCFCE7' }}
          thumbColor={switchValue ? '#10B981' : '#94A3B8'}
        />
      ) : (
        <ChevronRight size={20} color="#94A3B8" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          >
            <Edit3 size={20} color="#3B82F6" />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.memberSince}>
                Member since {formatDate(profile.memberSince)}
              </Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Award size={14} color="#F59E0B" />
                  <Text style={styles.badgeText}>Verified</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Calendar size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{profile.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Star size={20} color="#F59E0B" />
              </View>
              <Text style={styles.statValue}>{profile.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Clock size={20} color="#10B981" />
              </View>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>On-time</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>👤 Personal Information</Text>
          {renderProfileField(<User size={20} color="#64748B" />, 'Full Name', profile.name, 'name')}
          {renderProfileField(<Mail size={20} color="#64748B" />, 'Email', profile.email, 'email')}
          {renderProfileField(<Phone size={20} color="#64748B" />, 'Phone', profile.phone, 'phone')}
          {renderProfileField(<MapPin size={20} color="#64748B" />, 'Address', profile.address, 'address')}
        </View>

        {/* Notifications */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          {renderSettingItem(
            <Bell size={20} color="#64748B" />,
            'Ride Updates',
            'Get notified about your ride status',
            () => {},
            true,
            notifications.rideUpdates,
            (value) => setNotifications(prev => ({ ...prev, rideUpdates: value }))
          )}
          {renderSettingItem(
            <TrendingUp size={20} color="#64748B" />,
            'Promotions',
            'Receive offers and discounts',
            () => {},
            true,
            notifications.promotions,
            (value) => setNotifications(prev => ({ ...prev, promotions: value }))
          )}
          {profile.isDriver && renderSettingItem(
            <Bell size={20} color="#64748B" />,
            'Driver Updates',
            'Ride requests and driver notifications',
            () => {},
            true,
            notifications.driverUpdates,
            (value) => setNotifications(prev => ({ ...prev, driverUpdates: value }))
          )}
        </View>

        {/* Payment & Security */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>💳 Payment & Security</Text>
          {renderSettingItem(
            <CreditCard size={20} color="#64748B" />,
            'Payment Methods',
            'Manage your payment options',
            () => handleSettingPress('Payment Methods')
          )}
          {renderSettingItem(
            <Shield size={20} color="#64748B" />,
            'Security',
            'Password and privacy settings',
            () => handleSettingPress('Security')
          )}
        </View>

        {/* Support */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>🆘 Support</Text>
          {renderSettingItem(
            <HelpCircle size={20} color="#64748B" />,
            'Help & Support',
            'Get help with your account',
            () => handleSettingPress('Help & Support')
          )}
          {renderSettingItem(
            <Settings size={20} color="#64748B" />,
            'App Settings',
            'Preferences and app configuration',
            () => handleSettingPress('App Settings')
          )}
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Rural Taxi v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for rural communities</Text>
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  editActions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  cancelButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  profileSection: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  profileField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fieldIcon: {
    marginRight: 16,
    width: 20,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  fieldInput: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    marginRight: 16,
    width: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 48,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
  },
});