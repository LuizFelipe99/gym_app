import { StatusBar, StyleSheet, View, Text, ScrollView, Image,ActivityIndicator, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from  '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';


export default function Profile() {
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
// função que traz os exercicios

// recebendo o id que foi passado por paramentro no arquivo MAIN.JS
const route = useRoute();
  const { user } = route.params;
  const idUser = user;

// função para buscar os dados do aluno logado
useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await axios.post('http://gym-dev.com/back-end-academia/API_APP/detailProfile.php', {
        idUser,
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  getProfile();
}, []);

  // variaveis uteis para estilizar
  const primaryColor = '#055B8D';
  const width = 20;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {isLoading ? (
          <ActivityIndicator size="large" color={primaryColor}/>
          ) : (
            <View>
              {data.map((item, index) => (
                <View>
                  <View style={styles.profile_head} >
                    <Image source={require('../../../assets/luiz.png')} style={styles.image_profile} /> 
                    <Text  style={styles.title_ficha} key={index} >{item.name} </Text>
                    <Text  style={styles.title_ficha} >{item.email} </Text>
                  </View>
                  <View style={styles.card_detail_profile} >
                    <Text style={styles.item} ><Ionicons name="body-outline" size={width} color={primaryColor}/> Instrutor: {item.instructor}</Text>
                    <Text style={styles.item} ><Ionicons name="md-bar-chart-outline" size={width} color={primaryColor}/> Nível: {item.level}</Text>
                    <Text style={styles.item} ><Feather name="phone" size={width} color={primaryColor} /> Contato: {item.phone}</Text>
                    <Text style={styles.item} ><Ionicons name="md-calendar-outline" size={width} color={primaryColor}/> Idade: {item.age}</Text>
                    <Text style={styles.item} ><Ionicons name="map-outline" size={width} color={primaryColor}/> Endereço: {item.adress}</Text>
                  </View>
                  {/* card de financeiro */}
                </View>
              ))}
              {/* adicionar botao para ver historico de pagamento */}
              <View style={styles.card_detail_profile}>
                <Text style={styles.title_ficha} >Financeiro</Text>
                <Text style={styles.separator}></Text>
                <View>
                  <Text style={styles.item} > <Ionicons name="md-cash-outline" size={width} color={primaryColor} /> Plano: XXX</Text>
                  <Text style={styles.item} > <Ionicons name="md-calendar-outline" size={width} color={primaryColor}/> Vencimento: XXX</Text>
                  <Text style={styles.item} > <Ionicons name="ios-checkmark-done-sharp" size={width} color={primaryColor}/> Início: XXX</Text>
                </View>
              </View>
            </View>
        )}
        </View>
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  item: {
    margin: '1%',
    fontSize: 20,
  },
  scrollView:{
    backgroundColor:'#FAFAFA',
    flex: 1,
    marginBottom: 60,
  },
  container: {
    flex: 1,
  },
  card_detail_profile: {
    backgroundColor: '#FAFAFA',
    width:  '90%',
    padding: '3%',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    elevation: 10,
  },
  title_ficha: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonDetail: {
    backgroundColor: '#055B8D',
    margin: '5%',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%' ,
  },
  btn_txtLight: {
    color: '#fff',
  },
  image_profile:{
    flex:1,
    width: 150,
    height:150,
    borderRadius: 100,
    margin:'10%',
  },
  profile_head:{
    flex: 1,
    alignItems: 'center',
  }
});
