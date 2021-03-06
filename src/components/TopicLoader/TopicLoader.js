import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { compose } from 'lodash/fp';
import LayerService from 'react-spatial/LayerService';
import { setLayers } from '../../model/map/actions';
import {
  setActiveTopic,
  setTopics,
  setClickedFeatureInfo,
  setSearchService,
} from '../../model/app/actions';
import SearchService from '../Search/SearchService';
import TopicElements from '../TopicElements';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  apiKey: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeTopic: PropTypes.shape(),
  layerService: PropTypes.instanceOf(LayerService).isRequired,
  cartaroUrl: PropTypes.string,
  appBaseUrl: PropTypes.string,
  vectorTilesKey: PropTypes.string,
  vectorTilesUrl: PropTypes.string,

  // mapDispatchToProps
  dispatchSetActiveTopic: PropTypes.func.isRequired,
  dispatchSetLayers: PropTypes.func.isRequired,
  dispatchSetTopics: PropTypes.func.isRequired,
  dispatchSetClickedFeatureInfo: PropTypes.func.isRequired,
  dispatchSetSearchService: PropTypes.func.isRequired,

  t: PropTypes.func.isRequired,
};

const defaultProps = {
  history: null,
  activeTopic: null,
  cartaroUrl: null,
  appBaseUrl: null,
  vectorTilesKey: null,
  vectorTilesUrl: null,
};

class TopicLoader extends Component {
  static openLinkTopic(topic) {
    window.location.href = topic.linkUrl;
  }

  componentDidMount() {
    const { dispatchSetTopics, dispatchSetActiveTopic, topics } = this.props;
    const activeTopic = topics.find(topic => topic.active) || topics[0];
    activeTopic.active = true; // in case we fall back to the first topic.
    dispatchSetTopics(topics);
    dispatchSetActiveTopic(activeTopic);
    this.updateServices(activeTopic);
  }

  componentDidUpdate(prevProps) {
    const {
      activeTopic,
      topics,
      dispatchSetActiveTopic,
      apiKey,
      cartaroUrl,
      appBaseUrl,
      vectorTilesKey,
      vectorTilesUrl,
    } = this.props;

    if (activeTopic !== prevProps.activeTopic) {
      this.updateServices(activeTopic);
    }

    if (topics !== prevProps.topics) {
      const newActiveTopic = topics.find(topic => topic.active) || topics[0];
      dispatchSetActiveTopic(newActiveTopic);
      this.updateServices(newActiveTopic);
    }

    if (
      vectorTilesUrl !== prevProps.vectorTilesUrl ||
      apiKey !== prevProps.apiKey ||
      vectorTilesKey !== prevProps.vectorTilesKey ||
      vectorTilesUrl !== prevProps.vectorTilesUrl ||
      cartaroUrl !== prevProps.cartaroUrl ||
      appBaseUrl !== prevProps.appBaseUrl
    ) {
      this.updateServices(activeTopic);
    }
  }

  updateServices(activeTopic) {
    const {
      t,
      apiKey,
      layerService,
      dispatchSetClickedFeatureInfo,
      dispatchSetSearchService,
    } = this.props;

    if (!activeTopic) {
      this.updateLayers([]);
      dispatchSetSearchService();
    }

    if (activeTopic.linkUrl) {
      TopicLoader.openLinkTopic(activeTopic);
      return;
    }

    this.updateLayers(activeTopic.layers);

    const newSearchService = new SearchService();
    newSearchService.setSearches(activeTopic.searches || []);
    newSearchService.setApiKey(apiKey);
    newSearchService.setSearchesProps({
      t,
      activeTopic,
      layerService,
      dispatchSetClickedFeatureInfo,
    });
    dispatchSetSearchService(newSearchService);
  }

  updateLayers(topicLayers) {
    const {
      layerService,
      dispatchSetLayers,
      cartaroUrl,
      appBaseUrl,
      vectorTilesKey,
      vectorTilesUrl,
    } = this.props;

    layerService.setLayers(topicLayers);
    const flatLayers = layerService.getLayersAsFlatArray();
    dispatchSetLayers(topicLayers);

    for (let i = 0; i < flatLayers.length; i += 1) {
      if (flatLayers[i].setGeoServerUrl) {
        flatLayers[i].setGeoServerUrl(`${appBaseUrl}/geoserver/trafimage/ows`);
      } else if (flatLayers[i].setGeoServerWMSUrl) {
        flatLayers[i].setGeoServerWMSUrl(
          `${appBaseUrl}/geoserver/trafimage/ows/service/wms`,
        );
      } else if (flatLayers[i].setGeoJsonUrl) {
        flatLayers[i].setGeoJsonUrl(`${appBaseUrl}/service/gjc/ows`);
      } else if (flatLayers[i].setStyleConfig) {
        flatLayers[i].setStyleConfig(vectorTilesUrl, vectorTilesKey);
      } else if (flatLayers[i].setCartaroUrl) {
        flatLayers[i].setCartaroUrl(cartaroUrl);
      }
    }
  }

  render() {
    const { history } = this.props;
    return <TopicElements history={history} />;
  }
}

const mapStateToProps = state => ({
  activeTopic: state.app.activeTopic,
  layerService: state.app.layerService,
});

const mapDispatchToProps = {
  dispatchSetActiveTopic: setActiveTopic,
  dispatchSetLayers: setLayers,
  dispatchSetTopics: setTopics,
  dispatchSetClickedFeatureInfo: setClickedFeatureInfo,
  dispatchSetSearchService: setSearchService,
};

TopicLoader.propTypes = propTypes;
TopicLoader.defaultProps = defaultProps;

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(TopicLoader);
