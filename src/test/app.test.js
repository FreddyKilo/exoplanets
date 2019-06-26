const exoplanetsService = require('../service/exoplanets');

test('getPlanetSize', () => {
    const planetSmall = {RadiusJpt: .9999999};
    const planetMed = {RadiusJpt: 1.9999999};
    const planetLarge = {RadiusJpt: 2};
    expect(exoplanetsService.getPlanetSize(planetSmall)).toBe('small');
    expect(exoplanetsService.getPlanetSize(planetMed)).toBe('medium');
    expect(exoplanetsService.getPlanetSize(planetLarge)).toBe('large');
});