import { StyleSheet, View, Text, ScrollView, StatusBar, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons3 from 'react-native-vector-icons/MaterialIcons';
import Circle from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from  '@expo/vector-icons';

export default function Detail() {
  const navigation = useNavigation();
  
  // função que traz os exercicios
  const route = useRoute();

    if (route.params){
    }else{
      alert('Selecione uma ficha');
      navigation.navigate('Workouts');
      return(
        <View style={styles.alertMsg}>
          <Text style={styles.txtError}>Selecione uma ficha!</Text>
        </View>
      );
    }

  
  
  const { ficha } = route.params;

  const num_ficha = ficha.id_ficha;
  const instructor = ficha.instructor;
  const id_user = ficha.idUser;


  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);



  useEffect(() => {
    if (ficha) {
      setIsLoading(true);
      fetchData();
    }
  }, [ficha]);


  const fetchData = async () => {
    try {
      const response = await axios.post('http://gym-dev.com/back-end-academia/API_APP/exercices.php', {
        num_ficha,
        id_user,
      });
      console.log('Usuario ', id_user, 'acessou a ficha detalahada ', num_ficha);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };



  
  // variaveis uteis para estilizar
  const primaryColor = '#055B8D';
  const width = 30;
  
  return (
    <ScrollView style={styles.scrollView}>

        
      
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.header_text} > <Ionicons name="body-outline" size={width} color={primaryColor}/> Instrutor: {instructor} </Text>
          <Text style={styles.header_text} > <Ionicons name="md-newspaper-outline" size={width} color={primaryColor}/> Treino: {num_ficha} </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={primaryColor}/>
          ) : (
            <View >
              {data.map((item, index) => (
                <View style={styles.card_exercices} >
                  <View style={styles.card_header}>
                    <ImageBackground source={require('../../../assets/halters.jpg')} style={styles.imageBackground}> 
                      {/* <Image source={require('../assets/halter.jpg')} style={styles.imageForeground}/>  */}
                        <Text style={styles.text_img} key={item.key} >{item.exercice} </Text>
                    </ImageBackground> 
                  </View>
                  <View style={styles.card_content}>
                    
                    <Text style={styles.item} key={item} ><Icon name="reorder-four-outline" size={width} color={primaryColor} /> Série: {item.serie} </Text>
                    <Text style={styles.item} ><Circle name="cycle" size={width} color={primaryColor} /> Repetição: {item.repetition} </Text>
                    <Text style={styles.item} ><Icons name="weight-kilogram" size={width} color={primaryColor} /> Peso: {item.weight} </Text>
                    <Text style={styles.item} ><Icons name="timer-sand" size={width} color={primaryColor} /> Descanso: {item.rest} </Text>
                    <Text style={styles.item} ><Icon name="barbell-sharp" size={width} color={primaryColor} /> Equipamento: {item.equipment} </Text>
                  </View>
                  {/* view dos botoes  */}
                  <View style={styles.button_actions} >
                  {/* futuro botao que adiciona comentario do aluno */}
                  <TouchableOpacity>
                    <Text style={styles.add_comment} ><Icon name="eye" size={30} color={primaryColor} /></Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.add_comment} ><Icons3 name="add-comment" size={30} color='green' /></Text>
                  </TouchableOpacity>
                  {/* futuro botao de pre visualizar */}

                  </View>
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
  txtError:{
    textAlign: 'center',
  },
  alertMsg:{
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    height: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '60%',
    justifyContent: 'center',
    borderColor: '#fb5b6a',
    borderWidth: 1,
  },
  button_actions:{
    flex:1,
    flexDirection: 'row',
    justifyContent:  'flex-end',
  },
  add_comment:{
    // textAlign: 'center',
  },
  item: {
    margin: '1%',
    fontSize: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text_img: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center"
  },
  scrollView:{
    backgroundColor:'#FAFAFA',
    flex: 1,
    marginBottom: 60,
  },
  header:{
    marginLeft: '5%',
    marginTop: '5%',
  },
  header_text:{
    fontSize: 20,
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
  card_content:{
    backgroundColor: '#FAFAFA',
    padding: '3%',
    marginTop: '5%',
  },
  card_header: {
    backgroundColor: '#D9D9D9',
    borderRadius: 3,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    // marginLeft: '5%',
    // marginTop: '1%',
  },

  separator: {
    margin: '1%',
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  accordion_button: {
    backgroundColor: '#1D1919',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
