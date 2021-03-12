import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

let charset = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%&*';

export default function App() {

  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);

  function generatePass() {
    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor={'#ff0000'}
          maximumTrackTintColor={'#000'}
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={generatePass}
      >
        <Text style={styles.btnTxt}>Gerar Senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.areaPass}>
          <Text style={styles.password}>{password}</Text>
          <TouchableOpacity 
            style={{ position: 'absolute', right: 5 }}
            onPress={copyPass}
          >
            <Ionicons name="copy" size={25} color={'#000'}/>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    height: 50,
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  area: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7,
  },
  areaPass: {
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25,
    marginTop: 25,
  },
  btnTxt: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  password: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  }
});
