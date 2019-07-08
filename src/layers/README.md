<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## RouteLayer

Layer for visualizing fare networks.

### Parameters

-   `options` **[Object][1]?** Layer options.
    -   `options.token` **[string][2]** Access token for geOps services.
    -   `options.name` **[string][2]?** Layer name.
    -   `options.url` **[string][2]?** Url of the geOps route backend.
    -   `options.visible` **[boolean][3]?** Visibility of the layer.
          Default is true.
-   `projection` **[string][2]?** Layer projection.
      Default is webmercator ('EPSG:3857')

### getRoute

Generate the route for a given configuration.

#### Parameters

-   `sequences` **[Array][4]&lt;[Object][1]>** Route sequences.
    -   `sequences[].uicFrom` **[number][5]** UIC number of start station.
    -   `sequences[].uicTo` **[number][5]** UIC number of end station.
    -   `sequences[].mot` **[string][2]** Method of transportation.
          Allowed values are "rail", "bus", "tram", "subway", "gondola",
          "funicular" and "ferry"

Returns **[Promise][6]&lt;Feature>** an OpenLayers feature.
  See [https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html][7].

## VerbundLayer

Layer for visualizing fare networks.

### Parameters

-   `options` **[Object][1]** Layer options.
    -   `options.visible` **[boolean][3]** Visibility of the layer.
    -   `options.url` **[string][2]** Url of the geOps fare network backend.
-   `null`  (number} options.labelOptimizationMinResolution Minimum resolution for
      using optimized label placement based on the current extent. Default is 100.

### selectZonesByConfig

Select zones by a given configuration.

#### Parameters

-   `config` **[Array][4]&lt;[Object][1]>** Array of objects defining selected zones.
    -   `config[].partnerCode` **[number][5]** Partner code.
    -   `config[].zones` **[Array][4]&lt;[Object][1]>** Array of zones to select.
-   `number` **[number][5]** \[].zoneCode] Code of zone to select.
-   `string` **[string][2]** \[].zoneName] Name of zone to select.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[7]: https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html