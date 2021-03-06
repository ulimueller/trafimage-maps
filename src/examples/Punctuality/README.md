#

This example shows how to integrate punctuality information in your map application.

The `apiKey` used here is for demonstration purposes only. Please get your own api key at https://developer.geops.io/.

```jsx
import 'trafimage-maps';
import React, { useRef, useEffect } from 'react';
import Layer from 'react-spatial/layers/Layer';
import TrajservLayer from 'react-transit/layers/TrajservLayer';
import defaultBaseLayers, { buslines } from 'trafimage-maps/examples/Punctuality/layers';

// The `apiKey` used here is for demonstration purposes only.
// Please get your own api key at https://developer.geops.io/.
const apiKey = window.apiKey;

const App = () => {
  const ref = useRef();

  useEffect(() => {
    const map = ref.current;
    map.topics =  [{
      name: 'ch.sbb.netzkarte',
      key: 'ch.sbb.netzkarte',
      layers: [
        ...defaultBaseLayers,
        new TrajservLayer({
          name: 'Zugtracker',
          key: 'ch.sbb.tracker',
          apiKey: apiKey,
        }),
        new TrajservLayer({
          name: 'ch.sbb.puenktlichkeit',
          key: 'ch.sbb.puenktlichkeit',
          apiKey: apiKey,
          visible: false,
          useDelayStyle: true,
          operator: 'SBB', // To filter operator
          publishedLineName: 's1,s2,s9,s10,s15', // To filter line number
        }),
        buslines,
      ],
      elements: {
        footer: true,
        header: true,
        mapControls: true,
        menu: true,
        popup: true,
        permalink: false,
      },
    }];

    return () => {
      map.topics = null;
    };
  }, []);

  return (
    <div className="container">
      <trafimage-maps ref={ref} zoom="14" center="[950690,6004000]" apiKey={apiKey}/>
    </div>
  );
}

<App />

```
