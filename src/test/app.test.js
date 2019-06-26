const service = require('../service/exoplanets');
const expect = require('chai').expect;
const _ = require('lodash');

const planets = [
    {RadiusJpt: 1.10, DiscoveryYear: 2001, TypeFlag: 0, HostStarTempK: 1000},
    {RadiusJpt: 0.99, DiscoveryYear: 2013, TypeFlag: 3, HostStarTempK: 1234},
    {RadiusJpt: 2.00, DiscoveryYear: 1996, TypeFlag: 3, HostStarTempK: 22},
    {RadiusJpt: 3.56, DiscoveryYear: 1996, TypeFlag: 1, HostStarTempK: 22397},
    {RadiusJpt: .99, DiscoveryYear: 1982, TypeFlag: 2, HostStarTempK: 2761},
    {RadiusJpt: 1.99, DiscoveryYear: 1982, TypeFlag: 2, HostStarTempK: 2761},
];

test('getPlanetSize', () => {
    expect(service.getPlanetSize(planets[1])).to.equal('small');
    expect(service.getPlanetSize(planets[0])).to.equal('medium');
    expect(service.getPlanetSize(planets[2])).to.equal('large');
    expect(service.getPlanetSize(planets[3])).to.equal('large');
});

test('getOrphanPlanetCount', () => {
    expect(service.getOrphanPlanetCount(planets)).to.equal(2);
});

test('getPlanetWithHottestStar', () => {
    expect(service.getPlanetWithHottestStar(planets)).to.equal(planets[3]);
});

test('getPlanetTimeline', () => {
    const planetData = buildBigPlanetData();
    const timeLine = service.getPlanetTimeline(planetData);
    expect(_.some(timeLine, {yearDiscovered: 1982, small: 50, medium: 50, large: 0})).to.be.true;
    expect(_.some(timeLine, {yearDiscovered: 1996, small: 0, medium: 0, large: 100})).to.be.true;
    expect(_.some(timeLine, {yearDiscovered: 2001, small: 0, medium: 50, large: 0})).to.be.true;
    expect(_.some(timeLine, {yearDiscovered: 2013, small: 50, medium: 0, large: 0})).to.be.true;
});

function buildBigPlanetData() {
    const planetData = [];
    for (let i = 0; i < 50; i++) {
        planetData.push.apply(planetData, planets);
    }
    return planetData;
}