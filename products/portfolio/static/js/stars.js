var sizeSlider = document.getElementById("starSize");
var outputSize = document.getElementById("starSizeOutput");
outputSize.innerHTML = sizeSlider.value; // Display the default slider value

var stepSlider = document.getElementById("starStep");
var outputStep = document.getElementById("starStepOutput");
outputStep.innerHTML = stepSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sizeSlider.oninput = function() {
    outputSize.innerHTML = sizeSlider.value;
    if (parseInt(stepSlider.value) > parseInt(sizeSlider.value))
    {
        stepSlider.value = parseInt(sizeSlider.value) - 1;
        outputStep.innerHTML = stepSlider.value;
    }
    stepSlider.max = parseInt(sizeSlider.value) - 1;
    outputStep.innerHTML = stepSlider.value;
    newStarPlot(sizeSlider.value, stepSlider.value);
}

stepSlider.oninput = function() {
    outputStep.innerHTML = this.value;
    newStarPlot(sizeSlider.value, this.value);
}

function getYCoords(starSize, starStep, angle)
{
    output_y_coords = []
    for (let i = 0; i < (starSize + 1); i++)
    {
        angle_rad = angle + i*starStep*2*Math.PI/starSize;
        output_y_coords.push(Math.cos(angle_rad));
    }
    return output_y_coords;
}

function getXCoords(starSize, starStep, angle)
{
    output_x_coords = []
    for (let i = 0; i < (starSize + 1); i++)
    {
        angle_rad = angle + i*starStep*2*Math.PI/starSize;
        output_x_coords.push(Math.sin(angle_rad));
    }
    return output_x_coords;
}

function makeTrace(starSize, starStep) {
    if (starSize%starStep != 0 || starStep==1)
    {
        return [{
            y: getYCoords(starSize, starStep, 0),
            x: getXCoords(starSize, starStep, 0),
            line: {
                color: 'black',
                width: 0.5
            },
            visible: true,
            name: 'Star',
        }];
    }
    else
    {
        data = [];
        number_of_polygons = starStep;
        for (let i = 0; i < number_of_polygons; i++)
        {
            start_angle = i*2*Math.PI/starSize;
            var trace = {
                y: getYCoords(starSize, starStep, start_angle),
                x: getXCoords(starSize, starStep, start_angle),
                line: {
                    color: 'blue',
                    width: 0.5
                },
                visible: true,
                showlegend: false,
            };
            data.push(trace);
        }
        return data;
    }
}

function newStarPlot(starSize, starStep) {
    Plotly.newPlot('graph', makeTrace(starSize, starStep), {
        xaxis: {
            range: [-1.0, 1.0],
        },
        yaxis: {
            range: [-1.0, 1.0],
            scaleanchor: 'x',
        },
    });
}