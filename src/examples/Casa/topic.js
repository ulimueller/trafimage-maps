import TrafimageMapboxLayer from '../../layers/TrafimageMapboxLayer';

const netzkarteLayer = new TrafimageMapboxLayer({
  name: 'Netzkarte',
  copyright: '© OpenStreetMap contributors, OpenMapTiles, imagico, SBB/CFF/FFS',
  visible: true,
  style: 'trafimage_perimeter_v2',
});

export default {
  name: 'CASA',
  key: 'ch.sbb.casa',
  elements: {
    menu: true,
    popup: true,
    permalink: false,
  },
  layers: [netzkarteLayer],
};