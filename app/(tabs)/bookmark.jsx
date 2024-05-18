import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

import machinesData from "../../lib/testData.js";

const PresentMachines = () => {
  const navigation = useNavigation(); // Get navigation object

  const [machines, setMachines] = useState(machinesData);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const selectMachine = (machineId) => {
    setSelectedMachine(machineId);
    // Navigate to Performance component with machineId as parameter
    navigation.navigate("performance", { machineId });
  };

  const filterMachines = (searchTerm) => {
    const filteredMachines = machinesData.filter((machine) =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMachines(filteredMachines);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View>
          <Text style={{ fontSize: 15, color: "#9CA3AF" }}>Welcome back</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFFFFF" }}>
            power up
          </Text>
        </View>
        <Image
          source={images.logoSmall}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>

      <SearchInput
        placeholder="Search for the machine"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          filterMachines(text);
        }}
      />

      <View style={{ paddingVertical: 11 }} />

      {/* Machine List */}
      <FlatList
        data={machines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 18,
              paddingVertical: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor:
                selectedMachine === item.id ? "#FFA500" : "#161622",
            }}
            onPress={() => selectMachine(item.id)}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Fuel Consumed: {item.fuelConsumed}
              </Text>
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Power Generated: {item.powerGenerated}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default PresentMachines;
