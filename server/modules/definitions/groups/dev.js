const { combineStats, menu, addAura, addShield, makeDeco, LayeredBoss, newWeapon, weaponArray, makeRadialAuto, makeTurret } = require('../facilitators.js');
const { base, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');
require('./tanks.js');
require('./food.js');

// Menus
Class.developer = {
    PARENT: "genericTank",
    LABEL: "Developer",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    CAN_GO_OUTSIDE_ROOM: false,
    IS_IMMUNE_TO_TILES: false,
    DRAW_HEALTH: true,
    ARENA_CLOSER: true,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    NECRO: false,
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
        {
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet"
            }
        }
    ]
}
Class.developer.UPGRADE_COLOR = "trans"
Class.spectator = {
    PARENT: "genericTank",
    LABEL: "Spectator",
    ALPHA: 0,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    IGNORED_BY_AI: true,
    ARENA_CLOSER: true,
    IS_IMMUNE_TO_TILES: true,
    TOOLTIP: "Left click to teleport, Right click above or below the screen to change FOV",
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        PUSHABILITY: 0,
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
    GUNS: [{
        POSITION: [0,0,0,0,0,0,0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.2}, g.fake]),
            TYPE: "bullet",
            ALPHA: 0
        }
    }, {
        POSITION: [0, 0, 0, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.25 }, g.fake]),
            TYPE: "bullet",
            ALPHA: 0,
            ALT_FIRE: true,
        }
    }],
    ON: [{
        event: "fire",
        handler: ({ body }) => {
            body.x = body.x + body.control.target.x
            body.y = body.y + body.control.target.y
        }
    }, {
        event: "altFire",
        handler: ({ body }) => body.FOV = body.y + body.control.target.y < body.y ? body.FOV + 0.5 : Math.max(body.FOV - 0.5, 0.2)
    }]
}
Class.blackHole = {
    PARENT: "genericTank",
    LABEL: "Blackhole",
    COLOR: "black",
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    IGNORED_BY_AI: true,
    ARENA_CLOSER: true,
    IS_IMMUNE_TO_TILES: true,
	SKILL_CAP: [0, 0, 0, 0, 0, 30, 30, 30, 30, 30],
    BODY: {
        PUSHABILITY: 0,
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 1e100,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
    ON: [
        {
            event: "tick",
            handler: ({ body }) => {
                for (let instance of entities) {
                    let diffX = instance.x - body.x,
                        diffY = instance.y - body.y,
                        dist2 = diffX ** 2 + diffY ** 2;
                    if (dist2 <= ((body.size / 12)*250) ** 1.9) {
                    if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                    if (instance.type == "undertowEffect") {
                       forceMulti = 1
                    }
                    else if (instance.type == "food") {
                       forceMulti = (6 / instance.size)
                    }      
                    else {
                       forceMulti = (2 / instance.size)
                    }           
                       instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * forceMulti;//0.05
                       instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * forceMulti;//0.05
                       if (instance.type != "undertowEffect" && instance.type != "bullet" && instance.type != "swarm" && instance.type != "drone" && instance.type != "trap" && instance.type != "dominator") {
                               let o = new Entity({x: instance.x, y: instance.y})
                               o.define('undertowEffect')
                               o.team = body.team;
                               o.color = instance.color;
                               o.alpha = 0.3;
                               o.master = body.master;
                    }
				}
            }
                if (dist2 < body.size ** 3 + instance.size ** 3) {
                    if (instance.master.id == body.master.id) {
                        if (instance.type == "undertowEffect")
                        {
                           instance.kill();
                        }
                        }
                    }
                }
            }
        }
    ]
}

Class.generatorBase = {
    PARENT: "genericTank",
    LABEL: "Generator",
    ALPHA: 0,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    IS_IMMUNE_TO_TILES: true,
    SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
}

Class.bosses = menu("Bosses")
Class.bosses.REROOT_UPGRADE_TREE = "bosses"
Class.bbosses = menu("Bosses")
Class.bbosses.REROOT_UPGRADE_TREE = "bbosses"
Class.projectiles = menu("Projectiles")
Class.projectiles.REROOT_UPGRADE_TREE = "projectiles"
Class.missiles = menu("Missiles")
Class.bullets = menu("Bullets")
Class.minions = menu("Minions")
Class.traps = menu("Traps")
Class.sunchips = menu("Sunchips")
Class.sentries = menu("Sentries", "pink", 3.5)
Class.sentries.PROPS = [
    {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "genericEntity"
    }
]
Class.elites = menu("Elites", "pink", 3.5)
Class.mysticals = menu("Mysticals", "gold", 4)
Class.nesters = menu("Nesters", "purple", 5.5)
Class.rogues = menu("Rogues", "darkGrey", 6)
Class.rammers = menu("Rammers", "aqua")
Class.rammers.PROPS = [
    {
        POSITION: [21.5, 0, 0, 360, -1],
        TYPE: "smasherBody",
    }
]
Class.fallens = menu("Fallens", "white")
Class.terrestrials = menu("Terrestrials", "orange", 7)
Class.celestials = menu("Celestials", "lightGreen", 9)
Class.eternals = menu("Eternals", "veryLightGrey", 11)
Class.devBosses = menu("Developers", "black", 4)
Class.devBosses.UPGRADE_COLOR = "trans"

Class.tanks = menu("Tanks")
Class.fastSecrets = menu("Secrets")
Class.fastSecrets.UPGRADE_COLOR = "rainbow"
Class.dominators = menu("Dominators")
Class.dominators.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }
]
Class.sanctuaries = menu("Sanctuaries")
Class.sanctuaries.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }, {
        POSITION: [13, 0, 0, 360, 1],
        TYPE: "healerSymbol",
    }
]
Class.betaTester = menu("Beta Tester")

// Generators
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        Class[code] = matrix[y][x] = {
            PARENT: "generatorBase",
            LABEL,
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}
function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "shadowEgg"           , "rainbowEgg"           , "transEgg"           , "albinoEgg"           , "epilepsyEgg"           , "blackEgg"           , "EggRelic"           , "sphere"       ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "albinoSquare"        , "epilepsySquare"        , "blackSquare"        , "SquareRelic"        , "cube"         ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "albinoTriangle"      , "epilepsyTriangle"      , "blackTriangle"      , "TriangleRelic"      , "tetrahedron"  ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "albinoPentagon"      , "epilepsyPentagon"      , "blackPentagon"      , "PentagonRelic"      , "octahedron"   ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "albinoBetaPentagon"  , "epilepsyBetaPentagon"  , "blackBetaPentagon"  , "BetaPentagonRelic"  , "dodecahedron" ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "albinoAlphaPentagon" , "epilepsyAlphaPentagon" , "blackAlphaPentagon" , "AlphaPentagonRelic" , "icosahedron"  ],
    [ "hexagon"       , "shinyHexagon"       , "legendaryHexagon"       , "shadowHexagon"       , "rainbowHexagon"       , "transHexagon"       , "albinoHexagon"       , "epilepsyHexagon"       , "blackHexagon"       , "HexagonRelic"       , "tesseract"    ],
],
gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon", "Hexagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}
let enemyMatrix = [
	[ "crasher",     "sentryGun",    "shinySentryGun",    "sentinelCrossbow", "hexentinelCrossbow"],
	[ "sentry",      "sentrySwarm",  "shinySentrySwarm",  "sentinelLauncher", "hexentinelLauncher"],
	[ "shinySentry", "sentryTrap",   "shinySentryTrap",   "sentinelMinigun",  "hexentinelMinigun" ],
	[ "sentinel",    "sentrySniper", "shinySentrySniper", "exorcistor",       "shaman"            ],
]

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);
compileMatrix(enemyMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let poly = 0; poly < 5; poly++) {
    let row = [];
    for (let tier = 0; tier < 6; tier++) {
        let column = [];
        for (let shiny = 0; shiny < 9; shiny++) {
            let tube = [];
            for (let rank = 0; rank < 2; rank++) {
                let str = `laby_${poly}_${tier}_${shiny}_${rank}`,
                    LABEL = ensureIsClass(str).LABEL + " Generator";
                Class['generator_' + str] = {
                    PARENT: "generatorBase",
                    LABEL,
                    TURRETS: [{
                        POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                        TYPE: str,
                    }],
                    GUNS: [{
                        POSITION: [14, 12, 1, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }, g.fake]),
                            TYPE: "bullet"
                        }
                    }, {
                        POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                            INDEPENDENT_CHILDREN: true,
                            TYPE: str
                        },
                    }],
                };
                tube.push('generator_' + str);
            }
            column.push(tube);
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'generator_laby_0_0_0_0');
connectMatrix(gemRelicMatrix, 'generator_laby_0_0_0_0');
connectMatrix(enemyMatrix, 'generator_laby_0_0_0_0');

let tensorWidth = labyTensor.length,
    tensorHeight = labyTensor[0].length,
    tensorLength = labyTensor[0][0].length,
    tensorDepth = labyTensor[0][0][0].length;

for (let x = 0; x < tensorWidth; x++) {
    for (let y = 0; y < tensorHeight; y++) {
        for (let z = 0; z < tensorLength; z++) {
            for (let w = 0; w < tensorDepth; w++) {

                let left = (x + tensorWidth - 1) % tensorWidth,
                    right = (x + tensorWidth + 1) % tensorWidth,
                    top = (y + tensorHeight - 1) % tensorHeight,
                    bottom = (y + tensorHeight + 1) % tensorHeight,
                    front = (z + tensorLength - 1) % tensorLength,
                    back = (z + tensorLength + 1) % tensorLength,
                    past = (w + tensorDepth - 1) % tensorDepth,
                    future = (w + tensorDepth + 1) % tensorDepth,
            
                center = labyTensor[x    ][y     ][z    ][w     ];
                top    = labyTensor[x    ][top   ][z    ][w     ];
                bottom = labyTensor[x    ][bottom][z    ][w     ];
                left   = labyTensor[left ][y     ][z    ][w     ];
                right  = labyTensor[right][y     ][z    ][w     ];
                front  = labyTensor[x    ][y     ][front][w     ];
                back   = labyTensor[x    ][y     ][back ][w     ];
                past   = labyTensor[x    ][y     ][z    ][past  ];
                future = labyTensor[x    ][y     ][z    ][future];

                Class[labyTensor[x][y][z][w]].UPGRADES_TIER_0 = [
                    "developer"         , left  , right  ,
                    "crasherGenerator"  , top   , bottom ,
                    "eggGenerator"      , front , back   ,
                    "PowerGemGenerator" , past  , future
                ];
            }
        }
    }
}

// Testing tanks
Class.diamondShape = {
    PARENT: "basic",
    LABEL: "Rotated Body",
    SHAPE: 4.5
};

Class.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
Class.mummy = {
    PARENT: "drone",
    SHAPE: 4,
    NECRO: [4],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.mummifier = {
    PARENT: "genericTank",
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro"
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro"
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.miscTestHelper2 = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
Class.miscTestHelper = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
Class.miscTest = {
    PARENT: "genericTank",
    LABEL: "Turret Reload",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
Class.mmaTest2 = {
    PARENT: "genericTank",
    MIRROR_MASTER_ANGLE: true,
    COLOR: "grey",
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
Class.mmaTest1 = {
    PARENT: "genericTank",
    COLOR: -1,
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
Class.mmaTest = {
    PARENT: "genericTank",
    LABEL: "Mirror Master Angle",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

Class.vulnturrettest_turret = {
    PARENT: "genericTank",
    COLOR: "grey",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

Class.vulnturrettest = {
    PARENT: "genericTank",
    LABEL: "Vulnerable Turrets",
    TOOLTIP: "[DEV NOTE] Vulnerable turrets are still being worked on and may not function as intended!",
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: weaponArray({
        POSITION: {SIZE: 20, X: 40},
        TYPE: "vulnturrettest_turret",
        VULNERABLE: true
    }, 10)
};

Class.turretLayerTesting = {
    PARENT: 'genericTank',
    LABEL: 'Turret Layer Testing',
    TURRETS: [
        {
            POSITION: [20, 10, 10, 0, 0, 2],
            TYPE: ["basic", {COLOR: "lightGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 15, 5, 0, 0, 2],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 10, -5, 0, 0, 1],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, -5, 0, 0, -2],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, 5, 0, 0, -1],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
    ]
}

Class.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Translucent Guns",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

Class.radialAutoTest = makeRadialAuto("gunner", {
    count: 5,
    isTurret: false,
    extraStats: {spray: 4, speed: 1.4, maxSpeed: 1.4, recoil: 0.2},
    turretIdentifier: "radialAutoTestTurret",
    size: 8,
    x: 10,
    arc: 220,
    angle: 36,
    label: "Radial Auto Test",
    rotation: 0.04,
    danger: 10,
})
Class.makeAutoTestTurret = makeTurret("ranger", {canRepel: true, limitFov: true, extraStats: {reload: 0.5}});
Class.makeAutoTest = {
    PARENT: 'genericTank',
    LABEL: "Make Auto Test",
    TURRETS: weaponArray({
        POSITION: [8, 10, 0, 0, 180, 0],
        TYPE: 'makeAutoTestTurret'
    }, 3)
}

Class.imageShapeTest = {
    PARENT: 'genericTank',
    LABEL: "Image Shape Test",
    SHAPE: '/round.png',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ]
}

Class.strokeWidthTest = {
    PARENT: "basic",
    LABEL: "Stroke Width Test",
    STROKE_WIDTH: 2,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            STROKE_WIDTH: 0.5
        }
    }]
}

Class.onTest = {
    PARENT: 'genericTank',
    LABEL: "ON property test",
    TOOLTIP: "Refer to Class.onTest in dev.js to know more.",
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage(`I fired my main gun.`)
                    break;
                case 'secondaryGun':
                    body.sendMessage('I fired my secondary gun.')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage(`I fired my alt gun.`)
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            const killedOrDied = killers.length == 0 ? 'died.' : 'got killed.'
            body.sendMessage(`I ${killedOrDied}`)
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage(`I collided with ${other.label}.`)
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => { 
            body.sendMessage(`I got hurt`)
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}

Class.turretStatScaleTest = {
    PARENT: 'genericTank',
    LABEL: 'Turret Stat Test',
    TURRETS: Array(5).fill().map((_, i) => ({
        POSITION: [15, 0, -40 + 20 * i, 0, 360, 1],
        TYPE: ['autoTankGun', {GUN_STAT_SCALE: {speed: 1 + i / 5, maxSpeed: 1 + i / 5, reload: 1 + i / 5, recoil: 0}}]
    }))
}

Class.auraBasicGen = addAura();
Class.auraBasic = {
    PARENT: "genericTank",
    LABEL: "Aura Basic",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraBasicGen"
        }
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
//shield
Class.shielderAuraLarge = {
	PARENT: "shield",
	LAYER: 30,
	FACING_TYPE: ["spin", {speed: -0.04}],
	BORDERLESS: true,
	SHAPE: "M 1 0 L 0.988 0.156 L 0.951 0.309 L 0.891 0.454 L 0.809 0.588 L 0.707 0.707 L 0.588 0.809 L 0.454 0.891 L 0.309 0.951 L 0.156 0.988 L 0 1 L -0.156 0.988 L -0.309 0.951 L -0.454 0.891 L -0.588 0.809 L -0.707 0.707 L -0.809 0.588 L -0.891 0.454 L -0.951 0.309 L -0.988 0.156 L -1 0 L -0.988 -0.156 L -0.951 -0.309 L -0.891 -0.454 L -0.809 -0.588 L -0.707 -0.707 L -0.588 -0.809 L -0.454 -0.891 L -0.309 -0.951 L -0.156 -0.988 L 0 -1 L 0.156 -0.988 L 0.309 -0.951 L 0.454 -0.891 L 0.588 -0.809 L 0.707 -0.707 L 0.809 -0.588 L 0.891 -0.454 L 0.951 -0.309 L 0.988 -0.156 L 1 0",
    TURRETS: [{
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: 'shielderAuraLargeOutline'
    }]
}
Class.shielderAuraLargeOutline = {
    PARENT: "shield",
	MIRROR_MASTER_ANGLE: true,
    DRAW_FILL: false,
	SHAPE: "M 1 0 L 0.988 0.156 L 0.951 0.309 L 0.891 0.454 L 0.809 0.588 L 0.707 0.707 L 0.588 0.809 L 0.454 0.891 L 0.309 0.951 L 0.156 0.988 L 0 1 L -0.156 0.988 L -0.309 0.951 L -0.454 0.891 L -0.588 0.809 L -0.707 0.707 L -0.809 0.588 L -0.891 0.454 L -0.951 0.309 L -0.988 0.156 L -1 0 L -0.988 -0.156 L -0.951 -0.309 L -0.891 -0.454 L -0.809 -0.588 L -0.707 -0.707 L -0.588 -0.809 L -0.454 -0.891 L -0.309 -0.951 L -0.156 -0.988 L 0 -1 L 0.156 -0.988 L 0.309 -0.951 L 0.454 -0.891 L 0.588 -0.809 L 0.707 -0.707 L 0.809 -0.588 L 0.891 -0.454 L 0.951 -0.309 L 0.988 -0.156 L 1 0" + 
        "M 0.988 -0.156 L 0.988 0.156 L 0.891 0.454 L 0.707 0.707 L 0.454 0.891 L 0.156 0.988 L -0.156 0.988 L -0.454 0.891 L -0.707 0.707 L -0.891 0.454 L -0.988 0.156 L -0.988 -0.156 L -0.891 -0.454 L -0.707 -0.707 L -0.454 -0.891 L -0.156 -0.988 L 0.156 -0.988 L 0.454 -0.891 L 0.707 -0.707 L 0.891 -0.454 L 0.988 -0.156 L 0.949 0" + 
        "L 0.988 0.156 L 0.891 0.256 L 0.891 0.454 L 0.739 0.537 L 0.707 0.707 L 0.519 0.769 L 0.454 0.891 L 0.293 0.902 L 0.156 0.988 L 0.032 0.927 L -0.156 0.988 L -0.282 0.869 L -0.454 0.891 L -0.571 0.731 L -0.707 0.707 L -0.768 0.558 L -0.891 0.454 L -0.871 0.317 L -0.988 0.156 L -0.914 0 L -0.988 -0.156 L -0.871 -0.317 L -0.891 -0.454 L -0.768 -0.558 L -0.707 -0.707 L -0.571 -0.731 L -0.454 -0.891 L -0.282 -0.869 L -0.156 -0.988 L 0.032 -0.927 L 0.156 -0.988 L 0.293 -0.902 L 0.454 -0.891 L 0.519 -0.769 L 0.707 -0.707 L 0.739 -0.537 L 0.891 -0.454 L 0.891 -0.256 L 0.988 -0.156 L 0.949 0" + 
        "L 0.891 0.256 L 0.739 0.537 L 0.519 0.769 L 0.293 0.902 L 0.032 0.927 L -0.282 0.869 L -0.571 0.731 L -0.768 0.558 L -0.871 0.317 L -0.914 0 L -0.871 -0.317 L -0.768 -0.558 L -0.571 -0.731 L -0.282 -0.869 L 0.032 -0.927 L 0.293 -0.902 L 0.519 -0.769 L 0.739 -0.537 L 0.891 -0.256 L 0.949 0" + 
        "M 0.834 0 L 0.891 0.256 L 0.704 0.291 L 0.739 0.537 L 0.495 0.579 L 0.519 0.769 L 0.258 0.793 L 0.032 0.927 L -0.06 0.759 L -0.282 0.869 L -0.398 0.649 L -0.571 0.731 L -0.674 0.49 L -0.871 0.317 L -0.741 0.178 L -0.914 0 L -0.741 -0.178 L -0.871 -0.317 L -0.674 -0.49 L -0.571 -0.731 L -0.398 -0.649 L -0.282 -0.869 L -0.06 -0.759 L 0.032 -0.927 L 0.258 -0.793 L 0.519 -0.769 L 0.495 -0.579 L 0.739 -0.537 L 0.704 -0.291 L 0.891 -0.256 L 0.834 0" + 
        "L 0.704 0.291 L 0.495 0.579 L 0.258 0.793 L -0.06 0.759 L -0.398 0.649 L -0.674 0.49 L -0.741 0.178 L -0.741 -0.178 L -0.674 -0.49 L -0.398 -0.649 L -0.06 -0.759 L 0.258 -0.793 L 0.495 -0.579 L 0.704 -0.291 L 0.834 0" + 
        "M 0.592 0 L 0.704 0.291 L 0.413 0.3 L 0.495 0.579 L 0.183 0.563 L -0.06 0.759 L -0.158 0.485 L -0.398 0.649 L -0.479 0.348 L -0.741 0.178 L -0.51 0 L -0.741 -0.178 L -0.479 -0.348 L -0.398 -0.649 L -0.158 -0.485 L -0.06 -0.759 L 0.183 -0.563 L 0.495 -0.579 L 0.413 -0.3 L 0.704 -0.291 L 0.592 0" + 
        "L 0.413 0.3 L 0.183 0.563 L -0.158 0.485 L -0.479 0.348 L -0.51 0 L -0.479 -0.348 L -0.158 -0.485 L 0.183 -0.563 L 0.413 -0.3 L 0.592 0" + 
        "M 0.292 0 L 0.413 0.3 L 0.09 0.277 L -0.158 0.485 L -0.236 0.171 L -0.51 0 L -0.236 -0.171 L -0.158 -0.485 L 0.09 -0.277 L 0.413 -0.3 L 0.292 0 L 0.09 0.277" + 
        "L -0.236 0.171 L -0.236 -0.171 L 0.09 -0.277 L 0.292 0 M 0 0 L 0.949 0" + 
        "M 0 0 L 0.293 0.902 M 0 0 L -0.768 0.558 M 0 0 L -0.768 -0.558 M 0 0 L 0.293 -0.902",
}
Class.shieldFAuraSymbol = {
	PARENT: "genericTank",
	CONTROLLERS: [["spin", { speed: -0.04 }]],
	INDEPENDENT: true,
    BORDERLESS: true,
	COLOR: 'orange',
	SHAPE: "M 1 0 L 0.797 0.46 L 0.5 0.866 L 0 0.92 L -0.5 0.866 L -0.797 0.46 L -1 0 L -0.797 -0.46 L -0.5 -0.866 L 0 -0.92 L 0.5 -0.866 L 0.797 -0.46 L 1 0 Z",
    TURRETS: [{
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: 'shieldFAuraSymbolOutline'
    }]
};
Class.shieldFAuraSymbolOutline = {
    PARENT: "genericTank",
	MIRROR_MASTER_ANGLE: true,
    DRAW_FILL: false,
	SHAPE: "M 1 0 L 0.797 0.46 L 0.5 0.866 L 0 0.92 L -0.5 0.866 L -0.797 0.46 L -1 0 L -0.797 -0.46 L -0.5 -0.866 L 0 -0.92 L 0.5 -0.866 L 0.797 -0.46 L 1 0 Z" +
	    "M 0.52 0.3 L 0.52 -0.3 L 0.797 -0.46 M 0.52 -0.3 L 0 -0.6 L 0 -0.92 M 0 -0.6 L -0.52 -0.3 L -0.797 -0.46 M -0.52 -0.3 L -0.52 0.3 L -0.797 0.46 M -0.52 0.3 L 0 0.6 L 0 0.92 M 0 0.6 L 0.52 0.3 L 0.797 0.46"
};
function adddIcosphereAura(damageFactor = 1, sizeFactor = 1, opacity = 0.3, shieldSize = "Medium") {
	let shieldType = "shielderAura" + shieldSize;
	return {
		PARENT: "genericTank",
		INDEPENDENT: true,
		LABEL: "",
		COLOR: 'orange',
		GUNS: [
			{
				POSITION: [0, 20, 1, 0, 0, 0, 0,],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.shield, { size: sizeFactor, reload: 20, health: 10 }]),
					TYPE: [shieldType, {ALPHA: opacity}],
					MAX_CHILDREN: 1,
					AUTOFIRE: true,
					SYNCS_SKILLS: true
				}
			}
		],
		TURRETS: [
			{
				POSITION: [20, 0, 0, 0, 360, 1],
				TYPE: "shieldFAuraSymbol"
			}
		]
	}
};
Class.shieldAura = adddIcosphereAura(1.5, 1.45, 0.3, "Large");
Class.shieldBasic = {
    PARENT: "genericTank",
    LABEL: "Shield Basic",
    STAT_NAMES: statnames.shield,
    TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 360, 2],
				TYPE: "shieldAura"
		}
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet"
            }
        }
    ]
};
Class.auraHealerGen = addAura(-1);
Class.auraHealer = {
    PARENT: "genericTank",
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

Class.ghoster_ghosted = {
    PARENT: "genericTank",
    TOOLTIP: 'You are now hidden, roam around and find your next target. You will be visible again in 5 seconds',
    LABEL: 'Ghoster',
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}

Class.ghoster = {
    PARENT: "genericTank",
    LABEL: 'Ghoster',
    TOOLTIP: 'Shooting will hide you for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define("ghoster_ghosted")
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define("ghoster")
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
        }
    }],
    ALPHA: 1,
}

Class.switcheroo = {
    PARENT: "basic",
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}

Class.vanquisher = {
    PARENT: "genericTank",
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    CONTROLLERS: ['stackGuns'],
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: "setTrap",
            STAT_CALCULATOR: "block"
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]), TYPE: "minimissile", STAT_CALCULATOR: "sustained" }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0]
    }]
}
Class.armyOfOneBullet = {
    PARENT: "bullet",
    LABEL: "Unstoppable",
    TURRETS: [
        {
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        }
    ]
}
Class.armyOfOne = {
    PARENT: "genericTank",
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};
Class.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly Defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
}

Class.tooltipTank = {
    PARENT: 'genericTank',
    LABEL: "Tooltips",
    UPGRADE_TOOLTIP: "Allan please add details"
}

Class.bulletSpawnTest = {
    PARENT: 'genericTank',
    LABEL: "Bullet Spawn Position",
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }, {
            POSITION: [50, 10, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }
    ]
}

Class.propTestProp = {
    PARENT: 'genericTank',
    SHAPE: 6,
    COLOR: 0,
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, 0, 45, 0],
            PROPERTIES: {COLOR: 13},
        }, {
            POSITION: [20, 10, 1, 0, 0, -45, 0],
            PROPERTIES: {COLOR: 13},
        }
    ]
}
Class.propTest = {
    PARENT: 'genericTank',
    LABEL: 'Deco Prop Test',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ],
    PROPS: [
        {
            POSITION: [10, 0, 0, 0, 1],
            TYPE: 'propTestProp'
        }
    ]
}
Class.weaponArrayTest = {
    PARENT: 'genericTank',
    LABEL: 'Weapon Array Test',
    GUNS: weaponArray([
        {
            POSITION: [20, 8, 1, 0, 0, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 2}]),
                TYPE: 'bullet'
            }
        }, {
            POSITION: [17, 8, 1, 0, 0, 25, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 2}]),
                TYPE: 'bullet'
            }
        }
    ], 5, 0.4, false),
    TURRETS: weaponArray(
        {
            POSITION: [7, 10, 0, -11, 180, 0],
            TYPE: 'autoTankGun'
        }
    , 5),
}

Class.gunBenchmark = {
    PARENT: 'genericTank',
    LABEL: "Gun Benchmark",
    GUNS: weaponArray({
        POSITION: [60, 0.2, 0, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {size: 0, reload: 0.15, range: 0.05}]),
            TYPE: ["bullet", {DRAW_SELF: false}]
        }
    }, 720)
}

Class.levels = menu("Levels")
Class.levels.UPGRADES_TIER_0 = []
for (let i = 0; i < 16; i++) {
    let LEVEL = i * Config.TIER_MULTIPLIER;
    Class["level" + LEVEL] = {
        PARENT: "levels",
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    Class.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

Class.teams = menu("Teams")
Class.teams.UPGRADES_TIER_0 = []
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    Class["Team" + TEAM] = {
        PARENT: "teams",
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    Class.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
Class['Team' + TEAM_DREADNOUGHTS] = {
    PARENT: "teams",
    TEAM: TEAM_DREADNOUGHTS,
    COLOR: getTeamColor(TEAM_DREADNOUGHTS),
    LABEL: "Dreads Team"
};
Class['Team' + TEAM_ROOM] = {
    PARENT: "teams",
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
Class['Team' + TEAM_ENEMIES] = {
    PARENT: "teams",
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
Class.teams.UPGRADES_TIER_0.push('Team' + TEAM_DREADNOUGHTS, 'Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

Class.testing = menu("Testing")

Class.addons = menu("Addon Entities")
Class.addons.UPGRADES_TIER_0 = []

// misc tanks
Class.volute = {
    PARENT: "genericTank",
    LABEL: "Volute",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
	TOOLTIP: "What have you done...",
    GUNS: [
        {
            POSITION: [20, 13, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.destroyer]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            },
        },
        {
            POSITION: [5, 10, 2.125, 1, -6.375, 90, 0],
        },
        {
            POSITION: [5, 10, 2.125, 1, 6.375, -90, 0],
        },
    ],
}
Class.volute.UPGRADE_COLOR = "rainbow"
Class.snakeOld = {
    PARENT: "missile",
    LABEL: "Snake",
    GUNS: [
        {
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: "thruster",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake, g.snakeskin]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: "thruster",
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
    ],
}
Class.sidewinderOld = {
    PARENT: "genericTank",
    LABEL: "Sidewinder",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.3 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 11, -0.5, 14, 0, 0, 0],
        },
        {
            POSITION: [21, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
                TYPE: "snakeOld",
                STAT_CALCULATOR: "sustained",
				ALT_FIRE: false,
            },
        },
    ],
}

// secret tanks
Class.masterBullet = {
    PARENT: "missile",
    FACING_TYPE: "veryfastspin",
    MOTION_TYPE: "motor",
    HAS_NO_RECOIL: false,
    DIE_AT_RANGE: false,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Front",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
    ],
}
Class.master = {
    PARENT: "genericTank",
    LABEL: "Master",
	TOOLTIP: "Congrats! You found a secret!",
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3,
    },
    DANGER: 8,
    GUNS: [
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "masterBullet",
                MAX_CHILDREN: 4,
                DESTROY_OLDEST_CHILD: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: "thruster",
            },
        },
    ],
}
Class.master.UPGRADE_COLOR = "rainbow"

Class.jumpSmasher = {
    PARENT: "genericSmasher",
    LABEL: "Jump Smasher",
	TOOLTIP: "Congrats! You found a secret!",
    DANGER: 8,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ],
	GUNS: [{
        POSITION: [0,0,0,0,0,0,0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 10}, g.fake]),
            TYPE: "bullet",
            ALPHA: 0
        }
    }],
	ON: [{
        event: "fire",
        handler: ({ body }) => {
            body.x = body.x + (body.control.target.x / 2)
            body.y = body.y + (body.control.target.y / 2)
        }
    }]
}
Class.jumpSmasher.UPGRADE_COLOR = "rainbow"

Class.lamgSpinnerTurret = {
    PARENT: "genericTank",
    LABEL: "Spinner Turret",
    COLOR: "grey",
    FACING_TYPE: ["spin", {speed: -0.6}],
    GUNS: weaponArray({
			POSITION: [15, 3.5, 1, 0, 0, 0, 0]
    }, 10),
}
Class.literallyAMachineGun = {
    PARENT: "genericTank",
    LABEL: "Literally a Machine Gun",
	TOOLTIP: "Congrats! You found a secret!",
    DANGER: 8,
    BODY: {
        FOV: base.FOV * 1.2
    },
    TURRETS: [
        {
            POSITION: [12, 14, 0, 0, 0, 1],
            TYPE: "lamgSpinnerTurret"
        }
    ],
    GUNS: [
		{
			POSITION: [15, 3.5, 1, 0, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.basic, {reload: 0.27, damage: 0.5}]),
				TYPE: "bullet"
			}
		}, {
            POSITION: [22, 8, 1, 0, 0, 0, 0]
		}
	]
}
Class.literallyAMachineGun.UPGRADE_COLOR = "rainbow"

Class.hexaFlail = {
    PARENT: "genericFlail",
    LABEL: "Deconstruction",
	TOOLTIP: "Congrats! You found a secret!",
    DANGER: 8,
    TURRETS: [
	...weaponArray({
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["afBolt3", {
            INDEPENDENT: true
        }]
    }, 3),
	...weaponArray({
        POSITION: [6, 10, 0, 180, 190, 0],
        TYPE: ["gladiusBolt4", {
            INDEPENDENT: true
        }]
    }, 3)
	]
}
Class.hexaFlail.UPGRADE_COLOR = "rainbow"

Class.trooster = {
    PARENT: "genericTank",
    LABEL: "Trooster",
	TOOLTIP: "Congrats! You found a secret!",
	DANGER: 8,
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 15
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "trap",
				LABEL: "Front",
                STAT_CALCULATOR: "trap"
            }
        },
		{
            POSITION: [13, 7, 1, 0, -1, 140, 0.6],
        },
		{
            POSITION: [3, 8, 1.7, 13, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "trap",
                LABEL: "thruster",
				STAT_CALCULATOR: "trap"
            }
        },
		{
            POSITION: [13, 7, 1, 0, 1, -140, 0.6],
        },
        {
            POSITION: [3, 8, 1.7, 13, 1, -140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "trap",
                LABEL: "thruster",
				STAT_CALCULATOR: "trap"
            }
        },
		{
            POSITION: [16, 7, 1, 0, 0, 150, 0.1],
        },
        {
            POSITION: [3, 8, 1.7, 15, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "trap",
                LABEL: "thruster",
				STAT_CALCULATOR: "trap"
            }
        },
				{
            POSITION: [16, 7, 1, 0, 0, -150, 0.1],
        },
        {
            POSITION: [3, 8, 1.7, 15, 0, -150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "trap",
                LABEL: "thruster",
				STAT_CALCULATOR: "trap"
            }
        }
    ],
	TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
}
Class.trooster.UPGRADE_COLOR = "rainbow"

Class.cruisership = {
    PARENT: "genericTank",
    LABEL: "Cruisership",
    DANGER: 8,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: weaponArray([
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ], 10, 1/5),
}
Class.cruisership.UPGRADE_COLOR = "rainbow"

Class.tripleMini = {
    PARENT: "genericTank",
    LABEL: "Triple Minigun",
    DANGER: 8,
    BODY: {
        SPEED: base.SPEED * 0.9
    },
    GUNS: [
		{
            POSITION: [18, 8, 1, 0, 2, 17.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, 2, 17.5, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 8, 1, 0, 2, 17.5, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
		{
            POSITION: [18, 8, 1, 0, -2, -17.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, -2, -17.5, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -2, -17.5, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
		{
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.tripleMini.UPGRADE_COLOR = "rainbow"

// literally a tank
class io_turretWithMotion extends IO {
    constructor(b, opts = {}) {
        super(b)
    }
    think(input) {
        return {
            target: this.body.master.velocity,
            main: true,
        };
    }
}
ioTypes.turretWithMotion = io_turretWithMotion
Class.latTop = makeDeco(0)
Class.latDeco1 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
    FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#5C533F",
    SHAPE: "M -1 -2 C -1 -2 -1 -3 0 -3 C 1 -3 1 -2 1 -2 V 2 C 1 2 1 3 0 3 C -1 3 -1 2 -1 2 V -2",
    MIRROR_MASTER_ANGLE: true,
}
Class.latDeco2 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
    FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#5C533F",
    SHAPE: "M -2 0 H 2 L 0 1 L -2 0",
    MIRROR_MASTER_ANGLE: true,
}
Class.latDeco3 = {
    PARENT: "genericTank",
    LABEL: "Tank Deco",
    FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#3F3B2D",
    SHAPE: "M -10 -1 L 10 -1 L 10 1 L -10 1 L -10 -1",
    MIRROR_MASTER_ANGLE: true,
}
Class.latRight = {
    PARENT: "genericTank",
    LABEL: "Tank Side",
    FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#96794E",
    SHAPE: "M -6 0 H 5 V 1 C 5 2 4 2 4 2 H -5 C -6 2 -6 1 -6 1 V 0",
    MIRROR_MASTER_ANGLE: true,
    TURRETS: [
        {
            POSITION: [4.8, 31, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 24, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 17, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -42, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -35, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -28, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [18, -5, 0, 0, 0, 1],
            TYPE: "latDeco2",
        },
    ]
}
Class.latLeft = {
    PARENT: "genericTank",
    LABEL: "Tank Side",
    FACING_TYPE: ["turnWithSpeed"],
    COLOR: "#96794E",
    SHAPE: "M -5 0 H 6 V 1 C 6 2 5 2 5 2 H -4 C -5 2 -5 1 -5 1 V 0",
    MIRROR_MASTER_ANGLE: true,
    TURRETS: [
        {
            POSITION: [4.8, -31, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -24, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, -17, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 42, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 35, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [4.8, 28, 10, 0, 0, 1],
            TYPE: "latDeco1",
        },
        {
            POSITION: [18, 5, 0, 0, 0, 1],
            TYPE: "latDeco2",
        },
    ]
}
Class.latBase = {
    PARENT: "genericTank",
    LABEL: "Tank Base",
    CONTROLLERS: ["turretWithMotion"],
    COLOR: "#96794E",
    SHAPE: [
        [1.1, 1],
        [1.4, 0],
        [1.1, -1],
        [-1.1, -1],
        [-0.8, 0],
        [-1.1, 1]
    ],
    GUNS: [
        {
            POSITION: [16, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [14.5, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, 6.5, 0, 0]
        },
        {
            POSITION: [16, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [14.5, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, -6.5, 0, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [11.5, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [10, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [8.5, 5.5, 1, 1, 6.5, 180, 0]
        },
        {
            POSITION: [13, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [11.5, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [10, 5.5, 1, 1, -6.5, 180, 0]
        },
        {
            POSITION: [8.5, 5.5, 1, 1, -6.5, 180, 0]
        },
    ],
    TURRETS: [
        {
            POSITION: [5.3, 0, -10, 0, 0, 1],
            TYPE: "latLeft",
        },
        {
            POSITION: [5.3, 0, -10, 180, 0, 1],
            TYPE: "latRight",
        },
        {
            POSITION: [2, 0, -1.4, 90, 0, 1],
            TYPE: "latDeco3",
        },
    ]
}
Class.literallyATank = {
    PARENT: "genericTank",
    DANGER: 8,
	TOOLTIP: "Congrats! You found a secret!",
    BODY: {
        HEALTH: base.HEALTH * 1.2,
    },
    LABEL: "Literally a Tank",
    SHAPE: "M -1 -1 H 0 C 1 -1 1 0 1 0 C 1 0 1 1 0 1 H -1 V -1",
    GUNS: [
        {
            POSITION: [30, 8, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [4, 8, -1.4, 8, 0, 0, 0]
        },
        {
            POSITION: [12, 8, 1.3, 30, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { reload: 3, damage: 1.2, shudder: 0.5 }]),
                TYPE: "developerBullet"
            }
        },
        {
            POSITION: [2, 11, 1, 34, 0, 0, 0]
        }
    ],
    TURRETS: [
        {
            POSITION: [15, 0, 0, 0, 360, 1],
            TYPE: [ "latTop", { COLOR: "#5C533F" } ],
        },
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: [ "latTop", { COLOR: "#736245" } ],
        },
        {
            POSITION: [35, 0, 0, 0, 360, 0],
            TYPE: [ "latBase", { COLOR: "#96794E" } ],
        },
    ]
}
Class.literallyATank.UPGRADE_COLOR = "rainbow"

let testLayeredBoss = new LayeredBoss("testLayeredBoss", "Test Layered Boss", "terrestrial", 7, 3, "terrestrialTrapTurret", 5, 7, {SPEED: 10});
testLayeredBoss.addLayer({gun: {
    POSITION: [3.6, 7, -1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", {INDEPENDENT: true}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
testLayeredBoss.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "crowbarTurret",
}}, true);

Class.betaTester.UPGRADES_TIER_0 = ["tanks", "bbosses", "spectator", "levels", "teams", "projectiles", "addons"]
Class.developer.UPGRADES_TIER_0 = ["tanks", "bosses", "spectator", "levels", "teams", "projectiles", "generator_laby_0_0_0_0", "testing", "addons"]
    Class.tanks.UPGRADES_TIER_0 = ["basic", "fastSecrets", "arenaCloser", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun", "tracker3", "blackHole"]
        Class.fastSecrets.UPGRADES_TIER_0 = ["jumpSmasher", "literallyAMachineGun", "literallyATank", "master", "volute", "cataclysm", "hexaFlail", "trooster", "cruisership", "tripleMini"]
        Class.dominators.UPGRADES_TIER_0 = ["destroyerDominator", "gunnerDominator", "trapperDominator", "fortressDominator", "overDominator", "swarmerDominator"]
		Class.sanctuaries.UPGRADES_TIER_0 = ["sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"]

    Class.bosses.UPGRADES_TIER_0 = ["sentries", "elites", "fallens", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses"]
	    Class.bbosses.UPGRADES_TIER_0 = ["sentries", "elites", "fallens", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals"]
        Class.sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "sentrySniper", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "shinySentrySniper", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow", "hexentinelMinigun", "hexentinelLauncher", "hexentinelCrossbow"]
        Class.elites.UPGRADES_TIER_0 = ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion"]
        Class.mysticals.UPGRADES_TIER_0 = ["AKEE87", "sorcerer", "summoner", "enchantress", "exorcistor", "shaman"]
        Class.nesters.UPGRADES_TIER_0 = ["nestKeeper", "nestWarden", "nestGuardian"]
        Class.rogues.UPGRADES_TIER_0 = ["roguePalisade", "rogueArmada", "julius", "genghis", "napoleon"]
	    Class.rammers.UPGRADES_TIER_0 = ["bob", "nemesis", "corruption"]
		Class.fallens.UPGRADES_TIER_0 = ["fallenAutoSmasher", "fallenBooster", "fallenOverlord", "fallenFortress", "fallenFocal", "fallenBarricade", "fallenNecromancer", "fallenAssembler"]
        Class.terrestrials.UPGRADES_TIER_0 = ["ares", "gersemi", "ezekiel", "eris", "selene"]
        Class.celestials.UPGRADES_TIER_0 = ["paladin", "freyja", "zaphkiel", "nyx", "theia", "odin", "atlas", "rhea", "julius", "genghis", "napoleon"]
        Class.eternals.UPGRADES_TIER_0 = ["ragnarok", "kronos", "zeus"]
        Class.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zephiBoss", "dogeiscutBoss", "trplnrBoss", "frostBoss", "toothlessBoss", "AEMKShipBoss"]

	Class.projectiles.UPGRADES_TIER_0 = ["missiles", "bullets", "minions", "traps", "sunchips"]
		Class.missiles.UPGRADES_TIER_0 = ["missile", "hypermissile", "minimissile", "spinmissile", "hyperspinmissile", "hive", "protoHive", "rocketeerMissile", "sentinelMissile", "hexentinelMissile", "autoSmasherMissile", "autoSpikeMissile", "kronosMissile", "zeusMissile"]
		Class.bullets.UPGRADES_TIER_0 = ["bullet", "splitterBullet", "superSplitterBullet", "turretedBullet", "speedBullet", "growBullet", "flare", "developerBullet", "casing"]
		Class.minions.UPGRADES_TIER_0 = ["minion", "desmosMinion", "tinyMinion", "sentrySwarmMinion", "sentryGunMinion", "sentryTrapMinion", "zeusMinion"]
		Class.traps.UPGRADES_TIER_0 = ["trap", "setTrap", "unsetTrap", "boomerang", "assemblerTrap", "shotTrapBox", "pillbox", "unsetPillbox", "legionaryPillbox"]
		Class.sunchips.UPGRADES_TIER_0 = ["sunchip", "sunchip", "eggchip", "minichip", "autosunchip", "autoeggchip", "summonerDrone", "trichip", "dorito", "pentachip", "demonchip", "realchip", "superchip"]

    Class.testing.UPGRADES_TIER_0 = ["diamondShape", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "strokeWidthTest", "testLayeredBoss", "tooltipTank", "turretLayerTesting", "bulletSpawnTest", "propTest", "weaponArrayTest", "radialAutoTest", "makeAutoTest", "imageShapeTest", "turretStatScaleTest", "auraBasic", "weirdAutoBasic", "ghoster", "gunBenchmark", "switcheroo", ["developer", "developer"], ["developer", "developer", "developer"], "armyOfOne", "vanquisher", "mummifier", "shieldBasic"]
