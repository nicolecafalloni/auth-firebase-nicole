// Nicole de Oliveira Cafalloni
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RealizarLogin from "./screens/realizarLogin";
import PaginaInicial from "./screens/paginaPrincipal";
import sobreNos from "./screens/sobreNos";
import lampada from './screens/lampada';
import imc from './screens/imc';
import editarPerfil from "./screens/editarPerfil";
import listarJogadores from './screens/listarJogadores';
import adicionarJogador from './screens/adicionarJogador';
import editarJogador from './screens/editarJogador';
import listarVideo from './screens/listarVideo';
import listarImagem from "./screens/listarImagem";
import Cadastro from "./screens/cadastrarUsuario";
import uploadImg from './screens/uploadImg';
import uploadVideo from './screens/uploadVideo';
import s3 from './awsConfig'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RealizarLogin">
        <Stack.Screen 
          name="RealizarLogin" 
          component={RealizarLogin} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="PaginaPrincipal" 
          component={PaginaInicial} 
        />
        <Stack.Screen 
          name="lampada" 
          component={lampada} 
        />
        <Stack.Screen 
          name="listarJogadores" 
          component={listarJogadores} 
        />
        <Stack.Screen 
          name="imc" 
          component={imc} 
        />
        <Stack.Screen 
          name="sobreNos" 
          component={sobreNos} 
        />
        <Stack.Screen 
          name="editarPerfil" 
          component={editarPerfil} 
        />

        <Stack.Screen 
          name="adicionarJogador" 
          component={adicionarJogador} 
        />
        <Stack.Screen 
          name="editarJogador" 
          component={editarJogador} 
        />
        <Stack.Screen 
        name="listarImagem" 
        component={listarImagem} 
      />
      <Stack.Screen
        name="cadastrarUsuario"
        component={Cadastro}
      />
      <Stack.Screen
        name="listarVideo"
        component={listarVideo}
      />
      <Stack.Screen
        name="uploadImg"
        component={uploadImg}
      />
      <Stack.Screen
        name="uploadVideo"
        component={uploadVideo}
      />
      


    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

