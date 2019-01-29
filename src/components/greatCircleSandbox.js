  import arc from '../arc';
  
  const createRoute = (start, end, style, map, fixRoute) => {
  const arcStart = {
    x: start[1],
    y: start[0]
  }
  const arcEnd = {
    x: end[1],
    y: end[0]
  }
  console.log('rgfs', start, end)
  const generator = new arc.GreatCircle(arcStart, arcEnd)

  const line = generator.Arc(100, {offset: 100});
  const data = line.json()
  
  
  updateMap(coords = {}) {
    // if difference is smaller than the correct way create copies
    this.updateCoords(coords)
    this.updateIcons();
    this.updateArc();
  }

  updateCoords(coords = {}) {
    /*eslint-disable */
    console.log(`%c rgf:  ${'coords'}`, [
      'background: linear-gradient(#D33106, #571402)'
      , 'border: 1px solid #3E0E02'
      , 'color: white'
      , 'display: block'
      , 'padding: 15px'
      , 'line-height: 40px'
    ].join(';'), coords);
    /*eslint-enable */

    this.destCoords = get(coords, 'destCoords', DEFAULT_DEST_COORDS);
    this.map.destCoords = this.destCoords;
    this.orgCoords = get(coords, 'orgCoords', DEFAULT_ORG_COORDS);
    this.map.orgCoords = this.orgCoords;
    this.planeCoords = get(coords, 'planeCoords', DEFAULT_PLANE_COORDS);
    this.map.planeCoords = this.planeCoords;
  }

 updateIcons() {
    this.destinationMarker.forEach((marker) => marker.update(this.destCoords));
    this.originMarker.forEach((marker) => marker.update(this.orgCoords));
    this.planeMarker.forEach((marker) => marker.update(this.planeCoords, this.destCoords));
  }

  createIcons() {
    const originMarker = mapPinFactory(originAirportIcon)
    this.originMarker = [originMarker(this.orgCoords).addTo(this.map), originMarker(add360(this.orgCoords)).addTo(this.map)]

    const destinationMarker = mapPinFactory(destinationAirportIcon)
    this.destinationMarker = [destinationMarker(this.destCoords).addTo(this.map), destinationMarker(add360(this.destCoords)).addTo(this.map)]
    // const planeMarker = mapPlaneFactory(airplane)
    // this.planeMarker = [planeMarker(this.planeCoords, this.destCoords).addTo(this.map), planeMarker(add360(this.planeCoords), add360(this.destCoords)).addTo(this.map)]

    this.createArc();
  }

  updateArc() {
    this.route.forEach((arc) => arc.line.removeFrom(this.map))
    // redrawing to redo arc
    this.createArc()
  }

  createArc() {
    // get starting coords?
    let start = this.orgCoords
    const end = this.planeCoords
    let start2 = add360(this.orgCoords)
    const end2 = add360(this.planeCoords)

    this.route = [
      progressFactory(start, end,
        config.get('flightMap.airplaneRouteStyle'), this.map),
      progressFactory(start2, end2,
        config.get('flightMap.airplaneRouteStyle'), this.map)
    ]
  }


function getCoords (model) {
  const state = appChannel.request('app:state').flightInfo;
  console.log('state: rgf', state, model);
  const planeCoords = [
    parseFloat(get(model, 'latitude', 0)),
    parseFloat(get(model, 'longitude', 0))
  ];
  const orgCoords = [
    parseFloat(get(state, 'departureLat', 0)),
    parseFloat(get(state, 'departureLong', 0))
  ];
  const destCoords = [
    parseFloat(get(state, 'destinationLat', 0)),
    parseFloat(get(state, 'destinationLong', 0))
  ];

  return {
    planeCoords,
    destCoords,
    orgCoords
  }
}