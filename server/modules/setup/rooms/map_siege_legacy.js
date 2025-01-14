let { exit:   b , bossSpawn: boss , atmg:  A  , outside:   o  } = require('../tiles/siege.js'),
    { wall: WALL, nestNoBoss:  n, normal:   _  } = require('../tiles/misc.js'),
	{ base1:   s  } = require('../tiles/tdm.js'),

room = [
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,boss,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  b ,  b ,  b ,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,WALL,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  s ,  n ,  n ,  n ,  n ,  n ,  s ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,WALL,WALL,WALL,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,WALL,WALL,WALL,  o ,  o ],
    [  o ,  o ,  o ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  o ,  o ,  o ],
    [  o ,boss,  o ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  o ,boss,  o ],
    [  o ,  o ,  o ,  b ,  _ ,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,  _ ,  b ,  o ,  o ,  o ],
    [  o ,  o ,WALL,WALL,WALL,  _ ,  n ,  _ ,  _ ,  _ ,  _ ,  _ ,  n ,  _ ,WALL,WALL,WALL,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  s ,  n ,  n ,  n ,  n ,  n ,  s ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,  _ ,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,WALL,WALL,  _ ,  _ ,WALL,  _ ,  _ ,  _ ,WALL,  _ ,  _ ,WALL,WALL,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,WALL,WALL,WALL,WALL,  b ,  b ,  b ,WALL,WALL,WALL,WALL,  o ,  o ,  o ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,WALL,  o ,  o ,  o ,WALL,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
    [  o ,  A ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,boss,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  A ,  o ],
    [  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ,  o ],
];

module.exports = room;