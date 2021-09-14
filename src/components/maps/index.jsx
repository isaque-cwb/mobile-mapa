import React, { useState, useEffect } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { locais, meuLocal, image } from '../../data'

export default function Maps() {


  const [local, setLocal] = useState(meuLocal);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setLocal({
        latitude: location.coords.latitude,
        latitudeDelta: 0.0090,
        longitude: location.coords.longitude,
        longitudeDelta: 0.0090,
      });
    })();
  }, []);



  return (
    <View>
      <MapView
        style={{
          marginTop: 30,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,

        }}
        initialRegion={local}
        showsUserLocation={true}
        mapType='standard'

      >
        <Marker

          coordinate={local}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={image}
          />
          <Text>Meu Local</Text>
        </Marker>
        {
          locais.map((local, index) => {
            return (
              <Marker
                key={index}
                coordinate={local.coordeinates}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                  source={local.image}
                />
                <Text>{local.title}</Text>
              </Marker>
            )
          })
        }
      </MapView>
    </View>
  );
}