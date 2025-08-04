document.addEventListener('DOMContentLoaded', () => {
    const planetData = {
        sun: { name: "Sun", diameter: 1392684 },
        mercury: { name: "Mercury", diameter: 4879 },
        venus: { name: "Venus", diameter: 12104 },
        earth: { name: "Earth", diameter: 12756 },
        mars: { name: "Mars", diameter: 6792 },
        jupiter: { name: "Jupiter", diameter: 142984 },
        saturn: { name: "Saturn", diameter: 120536 },
        uranus: { name: "Uranus", diameter: 51118 },
        neptune: { name: "Neptune", diameter: 49528 }
    };

    const planetElements = document.querySelectorAll('.planet-grid a[data-planet]');
    const sunDiameter = planetData.sun.diameter;

    // Set a base width for the sun in vw units.
    const sunVw = 20; // 20% of the viewport width

    planetElements.forEach(planetElement => {
        const planetKey = planetElement.dataset.planet;
        const planet = planetData[planetKey];
        if (planet) {
            const planetImage = planetElement.querySelector('img');
            const scaleFactor = planet.diameter / sunDiameter;
            const scaledVw = sunVw * scaleFactor;

            planetImage.style.width = `${Math.max(scaledVw, 1)}vw`;
            // Also set a max-width in px to prevent images from becoming too large on wide screens
            planetImage.style.maxWidth = `${Math.max(scaleFactor * 200, 20)}px`;
        }
    });
});
