import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { Ionicons } from  '@expo/vector-icons';


export default function Workouts() {
// função que traz os exercicios
const navigation = useNavigation();



const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

const route = useRoute();
const { user } = route.params;
const idUser = user;


useEffect(() => {
  const fetchExercices = async () => {
    try {
      const response = await axios.post('http://gym-dev.com/back-end-academia/API_APP/fichas.php', {
        idUser,
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  fetchExercices();
  }, []);
  
  




const detailFicha = async (id, instructor) => {
  const ficha = {
    id_ficha: id,
    instructor:instructor,
    idUser: idUser,
  }
  navigation.navigate('Detail', {ficha});
}

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
            <View style={styles.card}>
              {data.map((item, index) => (
                <View style={styles.card_exercices} >
                    <Text  style={styles.title_ficha} key={item} > <Ionicons name="md-newspaper-outline" size={width} color={primaryColor}/> Treino: {item.num_ficha} </Text>
                    <Text  style={styles.title_ficha} > <Ionicons name="body-outline" size={width} color={primaryColor}/> Instrutor: {item.instructor} </Text>
                    <Text  style={styles.title_ficha} > <Ionicons name="md-calendar-outline" size={width} color={primaryColor}/> Inicio: {item.dt_created} </Text>
                    <TouchableOpacity 
                      style={styles.buttonDetail}
                      onPress={() => detailFicha(item.num_ficha, item.instructor)}
                    >
                      <Text style={styles.btn_txtLight} >VEJA SEU TREINO</Text>
                    </TouchableOpacity>
                </View>
              ))}
              <Text style={styles.separator}></Text>
            </View>
        )}
      </View>

    </ScrollView>  
  );
}

const styles = StyleSheet.create({

  scrollView:{
    backgroundColor:'#FAFAFA',
    flex: 1,
    marginBottom: 60,
  },
  card: {
    marginTop: '10%',
  },
  card_exercices: {
    backgroundColor: '#FAFAFA',
    width:  '90%',
    padding: '3%',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '5%',
    elevation: 10,
  },
  title_ficha: {
    // fontWeight: 'bold',
    fontSize: 20,
  },
  buttonDetail: {
    backgroundColor: '#055B8D',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_txtLight: {
    color: '#fff',
    fontSize: 20,
  }
});
