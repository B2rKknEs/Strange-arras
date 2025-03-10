let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, nest, crasherNest: crah } = require('../tiles/misc.js'),

room = [
	[____,____,____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____,____,____],
	[____,____,____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____,____,____],
	[____,____,rock,rock,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,rock,rock,____,____],
    [____,____,rock,rock,rock,____,____,____,____,____,____,____,____,____,____,____,rock,rock,rock,____,____],
    [____,____,____,rock,rock,____,____,____,____,____,____,____,____,____,____,____,rock,rock,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,nest,nest,nest,nest,nest,nest,nest,____,____,____,____,____,____,____],
    [roid,roid,roid,____,____,____,____,nest,crah,nest,nest,nest,crah,nest,____,____,____,____,roid,roid,roid],
    [roid,roid,roid,____,____,____,____,nest,nest,crah,nest,crah,nest,nest,____,____,____,____,roid,roid,roid],
    [roid,roid,roid,____,____,____,____,nest,nest,nest,crah,nest,nest,nest,____,____,____,____,roid,roid,roid],
    [roid,roid,roid,____,____,____,____,nest,nest,crah,nest,crah,nest,nest,____,____,____,____,roid,roid,roid],
    [roid,roid,roid,____,____,____,____,nest,crah,nest,nest,nest,crah,nest,____,____,____,____,roid,roid,roid],
    [____,____,____,____,____,____,____,nest,nest,nest,nest,nest,nest,nest,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,rock,rock,____,____,____,____,____,____,____,____,____,____,____,rock,rock,____,____,____],
    [____,____,rock,rock,rock,____,____,____,____,____,____,____,____,____,____,____,rock,rock,rock,____,____],
	[____,____,rock,rock,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,rock,rock,____,____],
	[____,____,____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____,____,____],
	[____,____,____,____,____,____,____,____,roid,roid,roid,roid,roid,____,____,____,____,____,____,____,____]
];

module.exports = room;