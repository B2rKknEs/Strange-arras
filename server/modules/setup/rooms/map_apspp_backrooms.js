let { wall, gunWall: dgwl, normal: ____, nest, dangerNestNoBoss: ness, crasherNestNoBoss: cras,  crasherNest: crah} = require('../tiles/misc.js'),
	{ atmg, outside: outs } = require('../tiles/siege.js'),

room = [
	[atmg,outs,atmg,outs,atmg,outs,outs,atmg,outs,atmg,outs,atmg,outs,atmg,outs,atmg,outs,outs,atmg,outs,atmg,outs,atmg],
	[outs,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,outs],
	[atmg,wall,ness,wall,____,____,____,____,____,wall,____,____,____,____,____,wall,____,____,____,cras,ness,wall,atmg],
	[outs,wall,cras,wall,wall,wall,____,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,wall,wall,wall,wall,outs],
	[atmg,wall,____,____,____,____,____,wall,____,____,____,____,____,wall,____,wall,____,____,____,____,____,wall,atmg],
	[outs,wall,____,wall,wall,wall,wall,wall,____,wall,wall,wall,____,wall,____,wall,wall,wall,____,wall,____,wall,outs],
	[outs,wall,____,____,____,wall,____,____,____,____,____,wall,____,____,____,____,____,____,____,wall,____,wall,outs],
	[atmg,wall,wall,wall,____,wall,____,wall,dgwl,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,____,wall,atmg],
	[outs,wall,____,____,____,____,____,____,____,____,____,wall,____,____,____,wall,____,wall,____,____,____,wall,outs],
	[atmg,wall,wall,wall,wall,wall,____,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,atmg],
	[outs,wall,____,____,____,____,____,wall,____,wall,nest,nest,nest,wall,____,____,____,wall,____,____,____,wall,outs],
	[atmg,wall,____,wall,wall,wall,wall,wall,____,wall,nest,crah,nest,wall,____,wall,wall,wall,____,wall,wall,wall,atmg],
	[outs,wall,____,____,____,wall,____,____,____,____,nest,nest,nest,____,____,____,____,wall,____,____,____,wall,outs],
	[atmg,wall,wall,wall,____,wall,wall,wall,____,wall,____,wall,wall,wall,____,wall,____,wall,wall,wall,____,wall,atmg],
	[outs,wall,____,____,____,____,____,wall,____,wall,____,____,____,wall,____,wall,____,____,____,wall,____,wall,outs],
	[atmg,wall,____,wall,____,wall,____,wall,____,wall,wall,wall,____,wall,wall,wall,wall,wall,____,wall,wall,wall,atmg],
	[outs,wall,____,wall,____,wall,____,____,____,____,____,wall,____,____,____,wall,____,____,____,____,____,wall,outs],
	[outs,wall,____,wall,wall,wall,wall,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,wall,wall,____,wall,outs],
	[atmg,wall,____,____,____,wall,____,____,____,wall,____,wall,____,____,____,____,____,____,____,wall,____,wall,atmg],
	[outs,wall,cras,wall,wall,wall,____,wall,wall,wall,____,wall,____,wall,____,wall,wall,wall,____,wall,cras,wall,outs],
	[atmg,wall,ness,cras,____,wall,____,____,____,____,____,____,____,wall,____,____,____,wall,____,cras,ness,wall,atmg],
	[outs,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,outs],
	[atmg,outs,atmg,outs,atmg,outs,outs,atmg,outs,atmg,outs,atmg,outs,atmg,outs,atmg,outs,outs,atmg,outs,atmg,outs,atmg]
];

module.exports = room;