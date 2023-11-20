import { StatusBar, View, StyleSheet, Text, ScrollView, Image, ImageBackground } from 'react-native';
import React, {useState } from 'react';



export default function Home() {

  // handleLogin(dados);
  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar barStyle="light-content"/>

        <View style={styles.card_exercices} >
          <View style={styles.card_header}>
            <ImageBackground source={require('../../../assets/meu_treino.png')}style={styles.imageBackground}> 
              <Text style={styles.text_img}>Treino Personalizado</Text>
            </ImageBackground> 
          </View>
        </View>
        
        <Text style={styles.separator}></Text>
        
        <View style={styles.card_exercices} >
          <View style={styles.card_header}>
            <ImageBackground source={require('../../../assets/meu_treino.png')}style={styles.imageBackground}> 
              <Text style={styles.text_img}>Meus Treinos</Text>
            </ImageBackground> 
          </View>
        </View>
        <Text style={styles.separator}></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  scrollView:{
    backgroundColor:'#FAFAFA',
    flex: 1,
    marginBottom: 60,
  },
  separator: {
    margin: '1%',
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  card_exercices: {
    backgroundColor: '#FAFAFA',
    width:  '90%',
    height: 200,
    // padding: '3%',
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '5%',
    elevation: 10,
  },

  text_img: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center"
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
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
});



