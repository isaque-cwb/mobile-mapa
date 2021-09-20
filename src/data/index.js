
import foto from '../assets/foto.jpg'


const locais = [
  {
    coordenates:
    {
      latitude: -25.41064186939657,
      longitude: -49.20734532539959,
    },
    title: 'Local 1',
    description: 'descrição do local 1',
    image: foto
  },
  {
    coordenates:
    {
      latitude: -25.414760907710576,
      longitude: -49.21088504159597
    },
    title: 'Local 2',
    description: 'descrição do local 2',
    image: foto
  },
  {
    coordenates:
    {
      latitude: -25.418046617668647,
      longitude: -49.20835641912965
    },
    title: 'Local 3',
    description: 'descrição do local 3',
    image: foto
  },
  {
    coordenates:
    {
      latitude: -25.423125289622213,
      longitude: -49.20651166472339
    },
    title: 'Local 4',
    description: 'descrição do local 4',
    image: foto
  },

]
const meuLocal = {
  "latitude": -25.4188833,
  "latitudeDelta": 0.0090,
  "longitude": -49.2002383,
  "longitudeDelta": 0.0090,
}
const image = foto

export { locais, meuLocal, image }