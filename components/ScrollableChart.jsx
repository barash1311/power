// App.js
import React from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const yAxisLabels = [100, 80, 60, 40, 20, 0];

const ScrollableLineChart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.yAxisContainer}>
        {yAxisLabels.map((label, index) => (
          <Text key={index} style={styles.yAxisLabel}>
            {label}
          </Text>
        ))}
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={{ width: screenWidth * 2 }}>
          <LineChart
            data={data}
            width={screenWidth * 2} // Make the chart width larger than the screen width
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero={true}
            withVerticalLabels={true} // Show vertical labels
            withHorizontalLabels={false} // Hide horizontal labels (Y-axis)
            style={styles.chartStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2923",
    flexDirection: "row",
    paddingVertical: 10,
  },
  yAxisContainer: {
    justifyContent: "space-between",
    height: 220, // Ensure this matches the height of the chart
    marginRight: 5,
    marginLeft: 5, // Add some space between Y-axis labels and the chart
    marginBottom: 10,
  },
  yAxisLabel: {
    color: "white",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 22,
  },
  chartStyle: {
    marginVertical: 4,
    borderRadius: 16,
    paddingRight: 1.5,
    marginBottom: 10,
  },
});

export default ScrollableLineChart;
