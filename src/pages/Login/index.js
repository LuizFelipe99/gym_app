import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import React, {useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const handleLogin = async () => {
    try{
      const response = await axios.post('http://gym-dev.com/back-end-academia/API_APP/user.php', {
        user,
        password,
      });
      if(response.data.length){
        const user = {
          userName: response.data[0].name,
          active: response.data[0].active,
          userId: response.data[0].id,
        }
        console.log(response.data[0].name,'logou');
        navigation.navigate('Main', {user});
      }else{
        alert('USUARIO / SENHA INCORRETO');
      }

    }catch(error){
      console.log(error);
    }
  };
  // handleLogin(dados);
  return (
    <View style={styles.container}>
       <Image
        source={require('../../../assets/logo_app.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
      style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.btn_txtLight} >Acessar</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>
          GYM 1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#085E90',
  },
  input: {
    width: '85%',
    height: 50,
    borderColor: '#79C8F7',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 20,
  },
  button:{
    backgroundColor: '#1D1919',
    width:'85%',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  btn_txtLight: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },

  footer:{
    // marginTop: '10%',
    fontSize: 20,
  }
  
});
