import { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import React, { useEffect } from "react";

const useAppwrite = (fn) => {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fn();
      setdata(response);
    } catch (error) {
      Alert.alert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { data, Loading, refetch };
};

export default useAppwrite;
