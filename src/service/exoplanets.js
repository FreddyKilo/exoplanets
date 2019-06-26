const _ = require("lodash");

const planetTimeline = [];

/**
 *
 * @param planetData
 * @returns {{planetWithHottestStarName: *, orphanPlanetCount: number}}
 */
function getFilteredExoplanetData(planetData) {
    const orphanPlanetCount = getOrphanPlanetCount(planetData);
    const planetWithHottestStar = getPlanetWithHottestStar(planetData);
    const timeLine = getPlanetTimeline(planetData);
    return {
        orphanPlanetCount: orphanPlanetCount,
        planetNameWithHottestStar: planetWithHottestStar.PlanetIdentifier,
        timeLine: timeLine
    }
}

/**
 *
 * @param planetData
 * @returns {number}
 */
function getOrphanPlanetCount(planetData) {
    // filter planets where TypeFlag = 3 (no star)
    const filteredPlanets = _.filter(planetData, function (planet) {
        return planet.TypeFlag === 3;
    });

    return filteredPlanets.length;
}

/**
 *
 * @param planetData
 */
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

/**
 *
 * @param planetData
 */
function getPlanetTimeline(planetData) {
    buildTimeline(planetData);
    return _.orderBy(planetTimeline, ['yearDiscovered'], ['asc']);
}

function buildTimeline(planetData) {
    _.forEach(planetData, function (planet) {
        if (!planetTimeline.some(group => group.yearDiscovered === planet.DiscoveryYear)) {
            addGroup(planet);
        }
        addSize(planet)
    });
}

function addGroup(planet) {
    planetTimeline.push({
        yearDiscovered: planet.DiscoveryYear,
        small: 0,
        medium: 0,
        large: 0
    })
}

function addSize(planet) {
    const planetSize = getPlanetSize(planet);
    _.find(planetTimeline, function (group) {
        return group.yearDiscovered === planet.DiscoveryYear;
    })[planetSize]++;
}

function getPlanetSize(planet) {
    if (planet.RadiusJpt < 1) return 'small';
    if (planet.RadiusJpt < 2) return 'medium';
    return 'large';
}

module.exports = {
    getFilteredExoplanetData,
    getOrphanPlanetCount,
    getPlanetWithHottestStar,
    getPlanetSize,
    getPlanetTimeline
};