let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, nest, crasherNest: crah} = require('../tiles/misc.js'),

room = [
    [nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest],
    [nest,nest,nest,nest,nest,crah,crah,crah,crah,crah,nest,nest,nest,nest,nest],
    [nest,nest,nest,crah,crah,crah,____,____,____,crah,crah,crah,nest,nest,nest],
    [nest,nest,crah,crah,____,____,____,____,____,____,____,crah,crah,nest,nest],
    [nest,nest,crah,____,____,____,____,____,____,____,____,____,crah,nest,nest],
    [nest,crah,crah,____,____,____,rock,rock,rock,____,____,____,crah,crah,nest],
    [nest,crah,____,____,____,rock,rock,roid,rock,rock,____,____,____,crah,nest],
    [nest,crah,____,____,____,rock,roid,roid,roid,rock,____,____,____,crah,nest],
    [nest,crah,____,____,____,rock,rock,roid,rock,rock,____,____,____,crah,nest],
    [nest,crah,crah,____,____,____,rock,rock,rock,____,____,____,crah,crah,nest],
    [nest,nest,crah,____,____,____,____,____,____,____,____,____,crah,nest,nest],
    [nest,nest,crah,crah,____,____,____,____,____,____,____,crah,crah,nest,nest],
    [nest,nest,nest,crah,crah,crah,____,____,____,crah,crah,crah,nest,nest,nest],
    [nest,nest,nest,nest,nest,crah,crah,crah,crah,crah,nest,nest,nest,nest,nest],
    [nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest,nest]
];

module.exports = room;