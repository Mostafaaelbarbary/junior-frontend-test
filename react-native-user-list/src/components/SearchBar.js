import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/usersSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.users.searchQuery);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search users by name..."
      value={searchQuery}
      onChangeText={(text) => dispatch(setSearchQuery(text))}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SearchBar;