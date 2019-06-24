const _ = require("lodash");

function getMockData(){
    return {'testPlanetName': 'korg161'};
}

function getFilteredExoplanetData(planetData) {
    const orphanPlanetCount = getOrphanPlanetCount(planetData);
    const planetWithHottestStar = getPlanetWithHottestStar(planetData);
    return {orphanPlanetCount: orphanPlanetCount,
    planetWithHottestStarName: planetWithHottestStar.PlanetIdentifier}
}

function getOrphanPlanetCount(planetData) {
    // filter planets where TypeFlag = 3 (no star)
    const filteredPlanets = _.filter(planetData, function (planet) {
        return planet.TypeFlag === 3;
    });

    return filteredPlanets.length;
}

function getPlanetWithHottestStar(planetData) {
    let hottestStarTemp = 0;

    // find hottest host star
    _.forEach(planetData, function (planet) {
        if (planet.HostStarTempK > hottestStarTemp) {
            hottestStarTemp = planet.HostStarTempK;
        }
    });

    // return planet with hottest host star
    return _.find(planetData, function (planet) {
        return planet.HostStarTempK === hottestStarTemp;
    });
}

module.exports = {
    getMockData,
    getFilteredExoplanetData
};