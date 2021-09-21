import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height,


  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  scrollView: {
    width: '100%',
    maxHeight: 200,

  },
  card: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: 'rgb(229, 242, 245)',
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
  },
  textLocal: {
    paddingTop: 5,
  },
  containerMarker: {

    width: 70,
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',

  }
})