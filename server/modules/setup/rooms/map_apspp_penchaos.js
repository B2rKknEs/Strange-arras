let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, dangerNestNoBoss: nesd, crasherNest: crah } = require('../tiles/misc.js'),

room = [
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,crah,crah,crah,crah,crah,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,crah,____,crah,____,crah,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,crah,crah,crah,crah,crah,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,crah,____,crah,____,crah,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,crah,crah,crah,crah,crah,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd],
    [nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd,nesd]
];

module.exports = room;