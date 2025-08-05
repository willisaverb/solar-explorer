document.addEventListener('DOMContentLoaded', () => {
    const planetData = {
        sun: { name: "Sun", diameter: 1392684, distance: 0 },
        mercury: { name: "Mercury", distance: 57.9e6, diameter: 4879 },
        venus: { name: "Venus", distance: 108.2e6, diameter: 12104 },
        earth: { name: "Earth", distance: 149.6e6, diameter: 12756 },
        mars: { name: "Mars", distance: 227.9e6, diameter: 6792 },
        jupiter: { name: "Jupiter", distance: 778.5e6, diameter: 142984 },
        saturn: { name: "Saturn", distance: 1434.0e6, diameter: 120536 },
        uranus: { name: "Uranus", distance: 2871.0e6, diameter: 51118 },
        neptune: { name: "Neptune", distance: 4495.0e6, diameter: 49528 }
    };

    // Main page logic
    if (document.querySelector('.planet-grid')) {
        const planetElements = document.querySelectorAll('.planet-grid a[data-planet]');
        const sunDiameter = planetData.sun.diameter;
        const sunVw = 30; // Use the same as the calculator page

        planetElements.forEach(planetElement => {
            const planetKey = planetElement.dataset.planet;
            const planet = planetData[planetKey];
            if (planet) {
                const planetImage = planetElement.querySelector('img');
                const scaleFactor = planet.diameter / sunDiameter;
                const scaledVw = sunVw * scaleFactor;

                planetImage.style.width = `${Math.max(scaledVw, 1.5)}vw`; // increased min width
                // Also set a max-width in px to prevent images from becoming too large on wide screens
                planetImage.style.maxWidth = `${Math.max(scaleFactor * 300, 20)}px`; // increased max width
            }
        });
    }

    // Calculator page logic
    if (document.querySelector('.calculator')) {
        const calculateScaleBtn = document.getElementById('calculateScaleBtn');
        const calculateDistanceBtn = document.getElementById('calculateDistanceBtn');

        if(calculateScaleBtn) {
            calculateScaleBtn.addEventListener('click', calculateScale);
        }
        if(calculateDistanceBtn) {
            calculateDistanceBtn.addEventListener('click', calculateDistance);
        }

        updateInstructionText();
        calculateScale();
    }

    function formatMetricUnit(valueMM) {
        if (valueMM < 1) { return `${valueMM.toFixed(3)} mm`; }
        if (valueMM < 1000) { return `${valueMM.toFixed(2)} mm`; }
        if (valueMM < 1000 * 1000) { return `${(valueMM / 1000).toFixed(2)} meters`; }
        if (valueMM < 1000 * 1000 * 1000) { return `${(valueMM / (1000 * 1000)).toFixed(2)} km`; }
        return `${(valueMM / (1000 * 1000)).toFixed(0)} km`;
    }

    function calculateScale() {
        const sunDiameterInput = parseFloat(document.getElementById('sunDiameter').value);
        if (isNaN(sunDiameterInput) || sunDiameterInput <= 0) {
            alert('Please enter a valid diameter for the Sun in millimeters.');
            return;
        }
        const actualSunDiameterMM = planetData.sun.diameter * 1e6;
        const modelSunDiameterMM = sunDiameterInput;
        const scaleFactor = actualSunDiameterMM / modelSunDiameterMM;
        let resultHTML = '<h2>Scaled Solar System Model</h2>';
        resultHTML += '<div class="scaled-planets">';
        for (const planetKey in planetData) {
            const planet = planetData[planetKey];
            const scaledDiameterMM = (planet.diameter * 1e6) / scaleFactor;
            const scaledDistanceMM = (planet.distance * 1e6) / scaleFactor;
            const formattedDiameter = formatMetricUnit(scaledDiameterMM);
            const formattedDistance = formatMetricUnit(scaledDistanceMM);
            resultHTML += `
                <div class="scaled-planet" data-planet="${planetKey}">
                    <img src="images/${planetKey}.png" alt="${planet.name}" class="planet-image">
                    <div class="planet-details">
                        <h3>${planet.name}</h3>
                        <div class="planet-info">
                            <div>Diameter: ${formattedDiameter}</div>
                            <div>Distance from Sun: ${formattedDistance}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        resultHTML += '</div>';
        document.getElementById('scaleResults').innerHTML = resultHTML;
    }

    function calculateDistance() {
        const object1Key = document.getElementById('object1').value;
        const object2Key = document.getElementById('object2').value;
        const sunDiameterInput = parseFloat(document.getElementById('sunDiameter').value);
        if (isNaN(sunDiameterInput) || sunDiameterInput <= 0) {
            alert('Please enter a valid diameter for the Sun in millimeters.');
            return;
        }
        const object1 = planetData[object1Key];
        const object2 = planetData[object2Key];
        const actualSunDiameterMM = planetData.sun.diameter * 1e6;
        const modelSunDiameterMM = sunDiameterInput;
        const scaleFactor = actualSunDiameterMM / modelSunDiameterMM;
        const distance1MM = object1.distance * 1e6;
        const distance2MM = object2.distance * 1e6;
        const scaledDistanceMM = Math.abs(distance1MM - distance2MM) / scaleFactor;
        const formattedScaledDistance = formatMetricUnit(scaledDistanceMM);
        let resultHTML = '<div class="planet-results">';
        resultHTML += `<div class="planet-result">
            <img src="images/${object1Key}.png" alt="${object1.name}" class="planet-image">
            <div>${object1.name}</div>
        </div>`;
        resultHTML += '<div style="text-align: center; padding: 1em;">↔️</div>';
        resultHTML += `<div class="planet-result">
            <img src="images/${object2Key}.png" alt="${object2.name}" class="planet-image">
            <div>${object2.name}</div>
        </div>`;
        resultHTML += '</div>';
        resultHTML += `<p><strong>Distance:</strong> ${formattedScaledDistance}</p>`;
        document.getElementById('distanceResult').innerHTML = resultHTML;
    }

    function updateInstructionText() {
        const instructionText = document.getElementById('instructionText');
        if(instructionText) {
            instructionText.textContent = `Enter the Sun's diameter in millimeters to calculate the scaled planet diameters:`;
        }
    }
});
