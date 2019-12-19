import HandicapLayer from '../../../../layers/HandicapLayer';
import { setClickedFeatureInfo } from '../../../../model/app/actions';
import StopFinder from '../StopFinder';

const findHandicapLayers = l => l instanceof HandicapLayer;
const getHandicapFeatures = layer =>
  layer.olLayer
    .getSource()
    .getFeatures()
    .map(feature => ({ didok: feature.getProperties().didok, feature, layer }));

class HandicapStopFinder extends StopFinder {
  constructor() {
    super();
    this.placeholder = 'Suche nach Stationen';
  }

  search(value) {
    const handicapFeatures = this.props.layerService
      .getLayers()
      .filter(findHandicapLayers)
      .map(getHandicapFeatures)
      .flat();
    return super.search(value).then(features =>
      features
        ? features
            .map(f => ({
              ...f,
              handicap: handicapFeatures.find(
                hf => hf.didok === f.properties.id,
              ),
            }))
            .filter(f => f.handicap)
        : [],
    );
  }

  select(item) {
    window.clearTimeout(this.selectTimeout);
    this.selectTimeout = window.setTimeout(() => {
      this.props.dispatch(
        setClickedFeatureInfo([
          { features: [item.handicap.feature], layer: item.handicap.layer },
        ]),
      );
    }, 200);
  }
}

export default HandicapStopFinder;
