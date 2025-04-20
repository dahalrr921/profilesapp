import React, { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Import the outputs file (make sure this path is correct)
import outputs from "../amplify/amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);

export default function App() {
  const [userProfiles, setUserProfiles] = useState([]);
  const { signOut, user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    // You can add mock data to test
    setUserProfiles([
      { name: "John Doe", age: 30 },
      { name: "Jane Smith", age: 25 },
    ]);
  }, []);

  return (
    <View padding="large">
      <Heading level={1}>Welcome to Your App</Heading>

      {/* Display user information if available */}
      {user ? (
        <div>
          <Heading level={2}>Hello, {user.username}!</Heading>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        <Heading level={2}>Please Sign In</Heading>
      )}

      <Divider />

      {/* Display user profiles (mock data) */}
      <Heading level={2}>User Profiles:</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap="20px">
        {userProfiles.map((profile, index) => (
          <View key={index} border="1px solid #ccc" padding="10px">
            <Heading level={3}>{profile.name}</Heading>
            <p>Age: {profile.age}</p>
          </View>
        ))}
      </Grid>
    </View>
  );
}

