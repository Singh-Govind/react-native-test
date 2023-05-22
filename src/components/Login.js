import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontSize: 20, marginTop: 10, textAlign: "center" }}>
          Welcome! Sign in to get started
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
            padding: 10,
            backgroundColor: "#DB4437",
            borderRadius: 5,
          }}
        >
          <Icon name="google" size={20} style={{ marginRight: 10 }} />
          <Text style={{ color: "white" }}>Continue with Google</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            marginTop: 2,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          By signing up, you agree to our
        </Text>
        <View
          style={{ marginTop: 10, flexDirection: "row", textAlign: "center" }}
        >
          <TouchableOpacity style={{ fontSize: 16 }}>
            <Text>Terms of Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ fontSize: 16 }}>
            <Text>Refund Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ fontSize: 16 }}>
            <Text>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
