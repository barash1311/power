import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const mockData = {
  solar: 30,
  grid: 50,
  dieselGenerator: 20,
  totalConsumption: 100,
  transformer1: {
    phase1Voltage: 230,
    phase1Power: 170,
    phase2Voltage: 230,
    phase2Power: 180,
    phase3Voltage: 230,
    phase3Power: 170,
  },
};

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setDashboardData(mockData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(fetchData);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const calculatePercentage = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(2) : 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.powerText}>power up</Text>
          </View>
          <Image
            source={images.logoSmall}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Solar</Text>
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceValue}>{dashboardData.solar} KWh</Text>
              <View style={styles.sourcePercentage}>
                <Text style={styles.percentageText}>
                  {calculatePercentage(
                    dashboardData.solar,
                    dashboardData.totalConsumption
                  )}
                  %
                </Text>
                <FontAwesome5 name="solar-panel" size={24} color="orange" />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grid</Text>
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceValue}>{dashboardData.grid} KWh</Text>
              <View style={styles.sourcePercentage}>
                <Text style={styles.percentageText}>
                  {calculatePercentage(
                    dashboardData.grid,
                    dashboardData.totalConsumption
                  )}
                  %
                </Text>
                <MaterialIcons
                  name="electrical-services"
                  size={24}
                  color="blue"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diesel Generator</Text>
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceValue}>
                {dashboardData.dieselGenerator} KWh
              </Text>
              <View style={styles.sourcePercentage}>
                <Text style={styles.percentageText}>
                  {calculatePercentage(
                    dashboardData.dieselGenerator,
                    dashboardData.totalConsumption
                  )}
                  %
                </Text>
                <FontAwesome5 name="gas-pump" size={24} color="red" />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total Consumption</Text>
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceValue}>
                {dashboardData.totalConsumption} KWh
              </Text>
              <View style={styles.sourcePercentage}>
                <Text style={styles.percentageText}>100%</Text>
                <FontAwesome5 name="plug" size={24} color="green" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transformer 1</Text>
          <View style={styles.transformerContainer}>
            <View style={styles.phaseBox}>
              <Text style={styles.phaseLabel}>Phase 1</Text>
              <Text style={styles.phaseValue}>
                Voltage: {dashboardData.transformer1.phase1Voltage}V
              </Text>
              <Text style={styles.phaseValue}>
                Power: {dashboardData.transformer1.phase1Power}W
              </Text>
            </View>
            <View style={styles.phaseBox}>
              <Text style={styles.phaseLabel}>Phase 2</Text>
              <Text style={styles.phaseValue}>
                Voltage: {dashboardData.transformer1.phase2Voltage}V
              </Text>
              <Text style={styles.phaseValue}>
                Power: {dashboardData.transformer1.phase2Power}W
              </Text>
            </View>
            <View style={styles.phaseBox}>
              <Text style={styles.phaseLabel}>Phase 3</Text>
              <Text style={styles.phaseValue}>
                Voltage: {dashboardData.transformer1.phase3Voltage}V
              </Text>
              <Text style={styles.phaseValue}>
                Power: {dashboardData.transformer1.phase3Power}W
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  topSection: {
    paddingTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingBottom: 60,
  },
  welcomeText: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 5,
  },
  powerText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  logo: {
    width: 36,
    height: 40,
    marginTop: 4,
  },
  row: {
    paddingTop: 13,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  section: {
    paddingTop: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: "#2c2c38",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#1F1F2E",
    marginHorizontal: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 8,
  },
  sourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  sourceValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  sourcePercentage: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  transformerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  phaseBox: {
    width: "30%",
    backgroundColor: "#2C2C38",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "orange",
  },
  phaseLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 4,
  },
  phaseValue: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Home;
