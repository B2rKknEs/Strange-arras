let pickFromChanceSet = set => {
    while (Array.isArray(set)) {
        set = set[ran.chooseChance(...set.map(e => e[0]))][1];
    }
    return set;
},

spawnNatural = (tile, layeredSet, kind, bounds) => {
    if (!Config.ENABLE_FOOD) return;
    let o = new Entity(tile.randomInside());
    o.define(pickFromChanceSet(layeredSet));
    o.facing = ran.randomAngle();
    o.team = TEAM_ENEMIES;
    o.on('dead', () => tile.data[kind + 'Count']--);
    tile.data[kind + 'Count']++;
    o.confinement = bounds;
    return o;
},

labyrinthFoodTypes = [
    [32, [
        [1, 'egg'], [5, 'square'], [25, 'triangle'], [125, 'pentagon'], [56, 'betaPentagon'], [25, 'alphaPentagon']
    ]],
    [1, [
        [1, 'gem'], [1.5, 'shinyEgg'], [3, 'shinySquare'], [9, 'shinyTriangle'], [9, 'shinyPentagon'], [5, 'shinyBetaPentagon'], [3, 'shinyAlphaPentagon']
    ]],
    [Math.pow(4, -1), [
        [1, 'jewel'], [1.5, 'legendaryEgg'], [3, 'legendarySquare'], [9, 'legendaryTriangle'], [9, 'legendaryPentagon'], [5, 'legendaryBetaPentagon'], [3, 'legendaryAlphaPentagon']
    ]],
    [Math.pow(4, -2), [
        [1, 'shadowEgg'], [3, 'shadowSquare'], [9, 'shadowTriangle'], [9, 'shadowPentagon'], [5, 'shadowBetaPentagon'], [3, 'shadowAlphaPentagon']
    ]],
    [Math.pow(4, -3), [
        [1, 'rainbowEgg'], [9, 'rainbowSquare'], [27, 'rainbowTriangle'], [9, 'rainbowPentagon'], [3, 'rainbowBetaPentagon'], [1, 'rainbowAlphaPentagon']
    ]],
    [Math.pow(4, -4), [
        [1, 'transEgg'], [9, 'transSquare'], [27, 'transTriangle'], [9, 'transPentagon'], [3, 'transBetaPentagon'], [1, 'transAlphaPentagon']
    ]],
    [Math.pow(4, -5), [
        [1, 'albinoEgg'], [9, 'albinoSquare'], [27, 'albinoTriangle'], [9, 'albinoPentagon'], [3, 'albinoBetaPentagon'], [1, 'albinoAlphaPentagon']
    ]],
    [Math.pow(4, -6), [
        [6, 'sphere'], [5, 'cube'], [4, 'tetrahedron'], [3, 'octahedron'], [2, 'dodecahedron'], [1, 'icosahedron']
    ]],
    [Math.pow(4, -7), [
        [1, 'epilepsyEgg'], [9, 'epilepsySquare'], [27, 'epilepsyTriangle'], [9, 'epilepsyPentagon'], [3, 'epilepsyBetaPentagon'], [1, 'epilepsyAlphaPentagon']
    ]],
    [Math.pow(4, -8), [
        [1, 'blackEgg'], [9, 'blackSquare'], [27, 'blackTriangle'], [9, 'blackPentagon'], [3, 'blackBetaPentagon'], [1, 'blackAlphaPentagon']
    ]]
],

labyrinthConfinement = {
    xMin: 0,
    xMax: 9000,
    yMin: 0,
    yMax: 9000
},
openConfinement = {
    xMin: 18000,
    xMax: 27000,
    yMin: 0,
    yMax: 9000
},

open = new Tile({
    color: "white",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0
    },
    init: tile => room.spawnableDefault.push(tile),
    tick: tile => {
        if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN) {
            tile.data.foodSpawnCooldown = 0;
            if (tile.data.foodCount < Config.FOOD_CAP && Math.random() < Config.FOOD_SPAWN_CHANCE) {
                spawnNatural(tile, Config.FOOD_TYPES, 'food', openConfinement);
            }
        }
    }
}),

labyrinth = new Tile({
    color: "white",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0
    },
    init: tile => room.spawnableDefault.push(tile),
    tick: tile => {
        if (++tile.data.foodSpawnCooldown > Config.FOOD_SPAWN_COOLDOWN * 5) {
            tile.data.foodSpawnCooldown = 0;
            if (tile.data.foodCount < (Config.FOOD_CAP - 1) && Math.random() < Config.FOOD_SPAWN_CHANCE) {
                spawnNatural(tile, labyrinthFoodTypes, 'food', labyrinthConfinement);
            }
        }
    }
}),

forge = new Tile({
    color: "white",
}),

outOfBounds = new Tile({
    color: 'none'
});

module.exports = { open, labyrinth, forge, outOfBounds };