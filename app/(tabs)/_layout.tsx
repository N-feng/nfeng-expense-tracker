import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";
import CustomTabs from "@/components/CustomTabs";

const _layout = () => {
  return (
    <Tabs
      // tabBar={(props) => <TabBar {...props} />}
      tabBar={CustomTabs}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;
