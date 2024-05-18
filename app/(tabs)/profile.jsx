import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const ProfileSection = () => {
  const userDetails = {
    name: "username",
    email: "email@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    jobTitle: "Engineer",
    department: "Engineering",
    company: "ABC Corporation",
    machinesAdded: 5,
    totalFuelConsumed: "1000 L",
    totalPowerGenerated: "5000 kW",
  };

  const scrollViewRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleChangePassword = () => {
    console.log("Change Password");
  };

  const handleManageNotifications = () => {
    console.log("Manage Notifications");
  };

  const handleTotalMachinesClick = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 500, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.title}>power up</Text>
            <Text style={styles.profileTitle}>Profile</Text>
          </View>
          <Image
            source={images.logoSmall}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.profileContainer}>
          <Image source={images.profileAvatar} style={styles.avatar} />
          <Text style={styles.userName}>{userDetails.name}</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userJob}>
              {userDetails.jobTitle}, {userDetails.department}
            </Text>
            <Text style={styles.userCompany}>{userDetails.company}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>Email: {userDetails.email}</Text>
          <Text style={styles.detail}>Phone: {userDetails.phone}</Text>
          <Text style={styles.detail}>Address: {userDetails.address}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>
            Machines Added: {userDetails.machinesAdded}
          </Text>
          <Text style={styles.detail}>
            Total Fuel Consumed: {userDetails.totalFuelConsumed}
          </Text>
          <Text style={styles.detail}>
            Total Power Generated: {userDetails.totalPowerGenerated}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleChangePassword}
        >
          <Image
            source={images.changePasswordIcon}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleManageNotifications}
        >
          <Image
            source={images.notificationIcon}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Text style={styles.actionText}>Manage Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  userInfoContainer: {
    alignItems: "center",
  },
  userJob: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 5,
    paddingLeft: 5,
  },
  userCompany: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1F1F2E",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  detail: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  actionButton: {
    backgroundColor: "#FFA500",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  actionText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ProfileSection;
