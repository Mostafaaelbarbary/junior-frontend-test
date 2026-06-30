import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/usersSlice";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native User List</Text>

      <SearchBar />
      <UserList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 18,
    paddingTop: StatusBar.currentHeight || 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default App;