const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


let robot = {
    x: null,
    y: null,
    direction: null
};


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Toy Robot Simulation!');
});


app.post('/command', (req, res) => {
    const { command } = req.body;
    const [commandType, params] = command.split(' ');

    switch (commandType.toUpperCase()) {
        case 'PLACE':
            handlePlaceCommand(params);
            break;
        case 'MOVE':
            handleMoveCommand();
            break;
        case 'LEFT':
            handleLeftCommand();
            break;
        case 'RIGHT':
            handleRightCommand();
            break;
        case 'REPORT':
            handleReportCommand(res);
            break;
        default:
            res.status(400).json({ error: 'Invalid command' });
    }
});


function handlePlaceCommand(params) {
    const [x, y, direction] = params.split(',');
    if (isValidPosition(parseInt(x), parseInt(y)) && isValidDirection(direction)) {
        robot.x = parseInt(x);
        robot.y = parseInt(y);
        robot.direction = direction;
    }
}

function handleMoveCommand() {
    if (!robot.direction) return;
    let { x, y, direction } = robot;
    switch (direction) {
        case 'NORTH':
            y = Math.min(y + 1, 4);
            break;
        case 'SOUTH':
            y = Math.max(y - 1, 0);
            break;
        case 'EAST':
            x = Math.min(x + 1, 4);
            break;
        case 'WEST':
            x = Math.max(x - 1, 0);
            break;
    }
    if (isValidPosition(x, y)) {
        robot.x = x;
        robot.y = y;
    }
}

function handleLeftCommand() {
    if (!robot.direction) return;
    const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const currentIdx = directions.indexOf(robot.direction);
    const newDirection = directions[(currentIdx + 1) % 4];
    robot.direction = newDirection;
}

function handleRightCommand() {
    if (!robot.direction) return;
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentIdx = directions.indexOf(robot.direction);
    const newDirection = directions[(currentIdx + 3) % 4];
    robot.direction = newDirection;
}

function handleReportCommand(res) {
    res.json(robot);
}
function isValidPosition(x, y) {
    return Number.isInteger(x) && x >= 0 && x < 5 && Number.isInteger(y) && y >= 0 && y < 5;
}

function isValidDirection(direction) {
    return ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
