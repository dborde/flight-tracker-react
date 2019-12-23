export default () => {
  // check if map tiles are on plane only once per session
  if (!this._promise) {
    this._promise = new Promise((resolve) => {
      let img = new Image();
      img.src = `${config.get('flightTracker.ACPUTileCheck')}${new Date().getTime()}`;

      // Detect timeout without error or load event handlers being called.
      let imageReadFailureTimeout = setTimeout(function () {
        trackerState.set('hasPlaneTiles', false);
        let errCode = config.get('flightTracker.ftLogs.' + ['FTAPP-8100']);
        util.doLog(errCode, this.model);
        resolve(trackerState.hasPlaneTiles);
      }, 5000);

      img.onload = () => {
        clearTimeout(imageReadFailureTimeout);
        trackerState.set('hasPlaneTiles', true);
        resolve(trackerState.hasPlaneTiles);
      };
      
      img.onerror = () => {
        clearTimeout(imageReadFailureTimeout);
        trackerState.set('hasPlaneTiles', false);
        let errCode = config.get('flightTracker.ftLogs.' + ['FTAPP-8100']);
        util.doLog(errCode, this.model);
        resolve(trackerState.hasPlaneTiles);
      };
    });
  }
};
