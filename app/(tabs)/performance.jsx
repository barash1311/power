import React, { useMemo } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { PieChart } from "react-native-gifted-charts";
import { useLocalSearchParams } from "expo-router";

import machineData from "../../lib/testData"; // Importing the machine data

const Performance = () => {
  const { machineId } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  // Find the machine data based on machineId
  const selectedMachine = machineId
    ? machineData.find((machine) => machine.id == machineId)
    : null;

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

  const { totalPowerGenerated, totalFuelConsumed } = selectedMachine
    ? calculateTotals([selectedMachine])
    : calculateTotals(machineData);

  // Prepare data for the line chart
  const lineChartData = selectedMachine
    ? {
        labels: selectedMachine.yearlyData.map((data) => data.month),
        datasets: [
          {
            data: selectedMachine.yearlyData.map((data) =>
              parseInt(data.powerGenerated.split(" ")[0])
            ),
            color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`, // Color for power data
          },
          {
            data: selectedMachine.yearlyData.map((data) =>
              parseInt(data.fuelUsed.split(" ")[0])
            ),
            color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`, // Color for fuel data
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
        color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`, // Color for power data
      },
      {
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
        color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`, // Color for fuel data
      },
    ],
  };

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
          <View style={{ height: 420 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: selectedMachine ? screenWidth * 2 : screenWidth * 3, // Adjust width based on data length
                }}
              >
                <LineChart
                  data={selectedMachine ? lineChartData : randomLineChartData}
                  width={selectedMachine ? 700 : 1200}
                  height={420}
                  bezier
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientTo: "#08130D",
                    strokeWidth: 3,
                    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`, // Default color
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  yAxisLabel={"kW/L"}
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
