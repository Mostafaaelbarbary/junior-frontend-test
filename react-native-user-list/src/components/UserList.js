import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadMoreUsers } from "../redux/usersSlice";
import UserCard from "./UserCard";

function UserList() {
  const dispatch = useDispatch();

  const { users, loading, error, searchQuery, visibleCount } = useSelector(
    (state) => state.users
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  const renderUser = useCallback(({ item }) => {
    return <UserCard user={item} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading) {
    return <ActivityIndicator size="large" color="#2563eb" />;
  }

  if (error) {
    return <Text style={styles.message}>{error}</Text>;
  }

  if (visibleUsers.length === 0) {
    return <Text style={styles.message}>No users found.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleUsers}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />

      {visibleCount < filteredUsers.length && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={() => dispatch(loadMoreUsers())}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 30,
    fontSize: 16,
  },
  loadMoreButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  loadMoreText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserList;