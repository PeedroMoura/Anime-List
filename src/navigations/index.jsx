import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import HomePage from "../pages/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Buscar from "../pages/Buscar";
import Loja from "../pages/Loja";


const Stack = createStackNavigator();

export const NavegacaoPrincipal = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="login"
        options={{ title: "Login" }}
        component={Login}
      />
      <Stack.Screen
          name="home"
          options={{ title: "Home" }}
          component={NavegacaoConfiguracao}
        />
      <Stack.Screen
        name="cadastro"
        options={{ title: "Cadastro" }}
        component={Cadastro}
      />
    
    </Stack.Navigator>
  </NavigationContainer>
);

const Tab = createBottomTabNavigator();

export const NavegacaoConfiguracao = () => (
  <Tab.Navigator screenOptions={{ headerShown: false}}>
    <Tab.Screen
      name="home"
      component={HomePage}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: () => <MaterialIcons name="home" size={20}/>,
      }}
    />

    <Tab.Screen
      name="perfil"
      component={Buscar}
      options={{
        tabBarLabel: "Perfil",
        tabBarIcon: () => <MaterialIcons name="person" size={20} />,
      }}
    />

    <Tab.Screen
      name="configuracao"
      component={Loja}
      options={{
        tabBarLabel: "Loja",
        tabBarIcon: () => <MaterialIcons name="store" size={20} />,
      }}
    />

    
  </Tab.Navigator>
);
