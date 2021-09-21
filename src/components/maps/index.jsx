import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, View, Dimensions, ScrollView, Animated } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { locais, meuLocal, image } from '../../data'
import { style } from './style'

export default function Maps() {


  const [local, setLocal] = useState(meuLocal);
  const _map = useRef(null)
  const { width, height } = Dimensions.get('window');
  let mapIndex = 0
  let mapAnimation = new Animated.Value(0);
  const CARD_HEIGHT = 220;
  const CARD_WIDTH = width;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  console.log(width)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 1 });
      setLocal({
        latitude: location.coords.latitude,
        latitudeDelta: 0.0090,
        longitude: location.coords.longitude,
        longitudeDelta: 0.0090,
      });

    })();
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= locais.length) {
        index = locais.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }


      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordenates } = locais[index];
          _map.current.animateToRegion(
            {
              ...coordenates,
              latitudeDelta: local.latitudeDelta,
              longitudeDelta: local.longitudeDelta
            },
            500
          );

        }
      }, 30);
    });
  });

  const interpolations = locais.map((local, index) => {

    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'

    });

    return { scale };
  });




  return (
    <View
      style={style.container}
    >
      <MapView
        ref={_map}
        style={style.mapView}
        initialRegion={local}
        showsUserLocation={true}


      >

        <Marker

          coordinate={local}
        >
          <Animated.Image
            style={style.image}
            source={image}
          />
          <Text>Meu Local</Text>
        </Marker>



        {
          locais.map((local, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                },
              ],

            };
            return (
              <MarkerAnimated
                key={index}
                coordinate={local.coordenates}
                style={scaleStyle}
              >
                <Animated.View style={style.containerMarker} >
                  <Animated.Image
                    style={[style.image, scaleStyle]}
                    source={local.image}
                  />
                  <Animated.Text
                    style={[style.textLocal, scaleStyle]}
                  >{local.title}</Animated.Text>
                </Animated.View>
              </MarkerAnimated>
            )
          })

        }
      </MapView>
      <Animated.ScrollView
        style={style.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true },
        )}
      >{
          locais.map((local, index) => (

            <View
              key={index}
              style={style.card}
            >
              <Text
                style={style.title}
              >{local.title}</Text>
              <Text
                style={style.description}
              >{local.description}</Text>
            </View>

          ))
        }

      </Animated.ScrollView>
    </View >
  );
}