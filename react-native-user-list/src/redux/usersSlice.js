import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const CACHE_KEY = "cachedUsers";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      const transformedUsers = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
      }));

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(transformedUsers));

      return transformedUsers;
    } catch (error) {
      try {
        const cachedUsers = await AsyncStorage.getItem(CACHE_KEY);

        if (cachedUsers) {
          return JSON.parse(cachedUsers);
        }

        return rejectWithValue("No internet connection and no cached data found.");
      } catch {
        return rejectWithValue("Failed to load users.");
      }
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: "",
  visibleCount: 5,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.visibleCount = 5;
    },

    loadMoreUsers: (state) => {
      state.visibleCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, loadMoreUsers } = usersSlice.actions;

export default usersSlice.reducer;