import React from "react";
import {
  View,
  Text,
  ScrollView as RNScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Text as SvgText } from "react-native-svg";
import machineData from "../lib/testData"; // Adjust the path according to your project structure

const ScrollableChart = ({ machineId }) => {
  const screenWidth = Dimensions.get("window").width;
  const selectedMachine = machineData.find(
    (machine) => machine.id === machineId
  );

  const chartHeight = 400;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const yAxisLabels = [0, 200, 400, 600, 800, 1000, 1200];

  return (
    <View style={{ flex: 1, backgroundColor: "#161622", padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#FFFFFF",
          marginBottom: 20,
        }}
      >
        {selectedMachine ? selectedMachine.name : "Select a Machine"}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Fixed Y-Axis Labels */}
        <Svg height={chartHeight} width={50}>
          {yAxisLabels.map((label, index) => (
            <SvgText
              key={index}
              x={45}
              y={
                chartHeight -
                40 -
                (index * (chartHeight - 40)) / (yAxisLabels.length - 1)
              }
              fill="white"
              fontSize="12"
              textAnchor="end"
            >
              {label}
            </SvgText>
          ))}
        </Svg>

        {/* Scrollable X-Axis Data */}
        <RNScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{ flex: 1 }}
        >
          {selectedMachine && selectedMachine.yearlyData && (
            <View
              style={{
                width: selectedMachine.yearlyData.length * 80,
                flexDirection: "row",
              }}
            >
              {selectedMachine.yearlyData.map((data, index) => (
                <View key={index} style={{ width: 80, alignItems: "center" }}>
                  <Text style={{ color: "white" }}>{data.month}</Text>
                  <Text style={{ color: "white" }}>{data.fuelUsed}</Text>
                  <Text style={{ color: "white" }}>{data.powerGenerated}</Text>
                </View>
              ))}
            </View>
          )}
        </RNScrollView>
      </View>
    </View>
  );
};

export default ScrollableChart;
