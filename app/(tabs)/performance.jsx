import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { PieChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { images } from "../../constants";
import machineData from "../../lib/testData";
import { Calendar } from "react-native-calendars"; // Import Calendar from react-native-calendars

const Performance = () => {
  const { machineId } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  const [selectedMachineId, setSelectedMachineId] = useState(machineId || "");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date.dateString);
    setStartDatePickerVisible(false);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date.dateString);
    setEndDatePickerVisible(false);
  };

  // Calculate totals for the selected machine or all machines
  const calculateTotals = (data) => {
    const totalPowerGenerated = data.reduce(
      (acc, machine) =>
        acc +
        machine.yearlyData.reduce(
          (total, data) => total + parseInt(data.powerGenerated.split(" ")[0]),
          0
        ),
      0
    );

    const totalFuelConsumed = data.reduce(
      (acc, machine) =>
        acc +
        machine.yearlyData.reduce(
          (total, data) => total + parseInt(data.fuelUsed.split(" ")[0]),
          0
        ),
      0
    );

    return { totalPowerGenerated, totalFuelConsumed };
  };

  const { totalPowerGenerated, totalFuelConsumed } = selectedMachineId
    ? calculateTotals([
        machineData.find((machine) => machine.id == selectedMachineId),
      ])
    : calculateTotals(machineData);

  // Prepare data for the line chart
  const lineChartData = selectedMachineId
    ? {
        labels: machineData
          .find((machine) => machine.id == selectedMachineId)
          .yearlyData.map((data) => data.month),
        datasets: [
          {
            data: machineData
              .find((machine) => machine.id == selectedMachineId)
              .yearlyData.map((data) =>
                parseInt(data.powerGenerated.split(" ")[0])
              ),
            color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
          },
          {
            data: machineData
              .find((machine) => machine.id == selectedMachineId)
              .yearlyData.map((data) => parseInt(data.fuelUsed.split(" ")[0])),
            color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
          },
        ],
      }
    : null;

  // Prepare data for the pie chart
  const pieData = [
    {
      value: totalPowerGenerated,
      color: "#1E8449",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    {
      value: totalFuelConsumed,
      color: "orange",
      gradientCenterColor: "#3BE9DE",
    },
  ];

  // Styles
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    calendarContainer: {
      backgroundColor: "#161622",
      padding: 20,
      borderRadius: 10,
    },
    closeButton: {
      color: "#FFFFFF",
      textAlign: "center",
      marginTop: 10,
      fontSize: 16,
    },
    container: {
      flex: 1,
      backgroundColor: "#1E2923",
      flexDirection: "row",
      paddingLeft: -5,
    },
    yAxisContainer: {
      justifyContent: "space-evenly",
      height: 220,
      marginRight: 5,
      marginLeft: 15,
      marginBottom: -20,
      marginVertical: 72,
    },
    yAxisLabel: {
      marginVertical: 60,
      color: "white",
      fontSize: 10,
      letterSpacing: 1,
      marginBottom: 100,
      marginLeft: 10,
    },
    chartStyle: {
      marginVertical: 4,
      borderRadius: 16,
      paddingRight: 1.5,
      paddingLeft: 1.5,
    },
  });

  // Center label component for the pie chart
  const centerLabelComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>
        {totalPowerGenerated} kW
      </Text>
      <Text style={{ fontSize: 14, color: "white" }}>
        {totalFuelConsumed} L
      </Text>
    </View>
  );

  // Generate random data for the line chart when no machine is selected
  const randomLineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
      },
      {
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
        color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
      },
    ],
  };

  // Extracting maximum values for powerGenerated and fuelUsed from the test data
  const maxPowerGenerated = Math.max(
    ...machineData.flatMap((machine) =>
      machine.yearlyData.map((data) =>
        parseInt(data.powerGenerated.split(" ")[0])
      )
    )
  );

  const maxFuelUsed = Math.max(
    ...machineData.flatMap((machine) =>
      machine.yearlyData.map((data) => parseInt(data.fuelUsed.split(" ")[0]))
    )
  );

  // Calculate the step size based on the maximum values
  const stepSize = Math.ceil(Math.max(maxPowerGenerated, maxFuelUsed) / 5);

  // Generate yAxisLabels based on the step size and maximum value
  const yAxisLabels = Array.from(
    { length: 6 },
    (_, index) => index * stepSize
  ).reverse();

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: "#161622", padding: 16 }}>
          {/* Top Heading */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 15, color: "#9CA3AF" }}>
                Welcome back
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  marginTop: 5,
                }}
              >
                power up
              </Text>
            </View>
            <Image
              source={images.logoSmall}
              style={{ width: 50, height: 50, marginTop: 5 }}
              resizeMode="contain"
            />
          </View>

          {/* Performance Page Content */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 20,
            }}
          >
            Performance Page
          </Text>

          {/* Dropdown and Date Range Picker */}
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {/* Dropdown */}
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ color: "white" }}>select a machine:</Text>
              <Picker
                selectedValue={selectedMachineId}
                onValueChange={(itemValue) => setSelectedMachineId(itemValue)}
                style={{
                  color: "white",
                  backgroundColor: "#161622",
                  paddingTop: 4,
                  paddingBottom: 4,
                  height: 40,
                }}
                itemStyle={{
                  backgroundColor: "#161622",
                  color: "white",
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
                dropdownIconColor="white"
              >
                {machineData.map((machine) => (
                  <Picker.Item
                    key={machine.id}
                    label={machine.name}
                    value={machine.id}
                    style={{
                      backgroundColor: "#161622",
                      color: "white",
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                  />
                ))}
              </Picker>
            </View>

            {/* Date Range Picker */}
            <View style={{ flex: 1, marginRight: 5, borderColor: "red" }}>
              <Text style={{ color: "white", marginBottom: 10 }}>
                Select a date range:
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setStartDatePickerVisible(true)}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={{
                      color: "white",
                      paddingVertical: 10,
                      paddingHorizontal: 13,
                      backgroundColor: "#161622",
                      borderRadius: 5,
                    }}
                  >
                    {selectedStartDate ? selectedStartDate : "Start Date"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setEndDatePickerVisible(true)}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={{
                      color: "white",
                      paddingVertical: 10,
                      paddingHorizontal: 13,
                      backgroundColor: "#161622",
                      borderRadius: 5,
                    }}
                  >
                    {selectedEndDate ? selectedEndDate : "End Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Modal
            visible={isStartDatePickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalBackground}>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleStartDateSelect}
                  theme={{
                    backgroundColor: "#161622",
                    calendarBackground: "#161622",
                    textSectionTitleColor: "#FFFFFF",
                    selectedDayBackgroundColor: "#FFFFFF",
                    selectedDayTextColor: "#000000",
                    todayTextColor: "#00adf5",
                    dayTextColor: "#FFFFFF",
                    textDisabledColor: "#444",
                    monthTextColor: "#FFFFFF",
                    arrowColor: "white",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setStartDatePickerVisible(false)}
                >
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isEndDatePickerVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalBackground}>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleEndDateSelect}
                  theme={{
                    paddingTop: 50,
                    backgroundColor: "#161622",
                    calendarBackground: "#161622",
                    textSectionTitleColor: "#FFFFFF",
                    selectedDayBackgroundColor: "#FFFFFF",
                    selectedDayTextColor: "#000000",
                    todayTextColor: "#00adf5",
                    dayTextColor: "#FFFFFF",
                    textDisabledColor: "#444",
                    monthTextColor: "#FFFFFF",
                    arrowColor: "white",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setEndDatePickerVisible(false)}
                >
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Pie Chart */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, alignItems: "center", paddingLeft: "2px" }}>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={"#161622"}
                startAngle={-90}
                labels={[
                  { value: "Power Generated", color: "#009FFF" },
                  { value: "Fuel Consumed", color: "#93FCF8" },
                ]}
                labelStyle={{ fontSize: 12, fontWeight: "bold" }}
                labelPosition={150}
              />
            </View>
            <View
              style={{ flex: 1, alignItems: "flex-start", paddingLeft: 40 }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", marginBottom: 8 }}
              >
                Data Used:
              </Text>
              <Text style={{ color: "#1E8449" }}>
                Total Power: {totalPowerGenerated} kW
              </Text>
              <Text style={{ color: "orange" }}>
                Total Fuel: {totalFuelConsumed} L
              </Text>
            </View>
          </View>

          {/* Line Chart */}
          <View style={styles.container}>
            <View style={styles.yAxisContainer}>
              {yAxisLabels.map((label, index) => (
                <Text key={index} style={styles.yAxisLabel}>
                  {label}
                </Text>
              ))}
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: selectedMachineId ? screenWidth * 2 : screenWidth * 3,
                }}
              >
                <LineChart
                  data={selectedMachineId ? lineChartData : randomLineChartData}
                  width={selectedMachineId ? 600 : 1200}
                  height={400}
                  bezier
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientTo: "#08130D",
                    strokeWidth: 3,
                    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
                  }}
                  style={styles.chartStyle}
                  yAxisLabel={yAxisLabels}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Performance;
