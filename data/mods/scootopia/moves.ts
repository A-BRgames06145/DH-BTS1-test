export const Moves: {[moveid: string]: ModdedMoveData} = {
	darkfang: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once",
		isViable: true,
		name: "Dark Fang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bite", target);
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		maxMove: {basePower: 130},
	},
	piercinggaze: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Piercing Gaze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	dreadwing: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "Uses target's SpA stat in damage calculation.",
		isViable: true,
		name: "Dread Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Oblivion Wing", target);
		},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	photongeyser: {
		inherit: true,
		category: "Physical",
	},
	energysiphon: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Energy Siphon",
		shortDesc: "Drains target's HP for 3 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, contact: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		volatileStatus: 'energysiphon',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fell Stinger", target);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Energy Siphon');
			},
			duration: 3,
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.effectData.source.side.active[pokemon.volatiles['energysiphon'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage / 2, target, pokemon);
				}
			},
		},
	},
	temperatureburst: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Temperature Burst",
		shortDesc: "Sets weather based on the user's type.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (source.species.id === "faerenheit"){
				this.field.setWeather('sunnyday');
			} else if (source.species.id === "cellsius"){
				this.field.setWeather('raindance');
			} else if (source.species.id === "kelven"){
				this.field.setWeather('snowscape');
			}
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	psychicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.side === source.side) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.getMove(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},
	mistyexplosion: {
		num: 802,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Misty Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		onBasePower(basePower, source) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	sheercold: {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Sheer Cold",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	reindeerdash: {
		name: "Reindeer Dash",
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Ice",
		shortDesc: "10% chance to inflict Frz. 20% chance to lower Spe 1 stage",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondaries: [
			{
				chance: 20,
				boost: {
					spe: -1,
				},
			}, {
				chance: 10,
				status: 'frz',
			},
		],
	},
	spore: {
		inherit: true,
		pp: 10,
	},
	sleeppowder: {
		inherit: true,
		pp: 15,
		accuracy: 90,
	},
	hypnosis: {
		inherit: true,
		pp: 20,
		accuracy: 85,
	},
	grasswhistle: {
		inherit: true,
		pp: 25,
		accuracy: 80,
	},
	crystalcutter: {
		name: "Crystal Cutter",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 15,
		type: "Crystal",
		shortDesc: "Always crits. Lowers foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, slicing: 1},
		target: "normal",
		willCrit: true,
		secondary: {
			chance: 100,
			boost: {
				atk: -1,
			},
		},
	},
	crystaltail: {
		name: "Crystal Tail",
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Crystal",
		shortDesc: "20% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boost: {
				atk: -1,
			},
		},
	},
	crystalbash: {
		name: "Crystal Bash",
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Crystal",
		shortDesc: "10% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 10,
			boost: {
				atk: -1,
			},
		},
	},
	crystalbeam: {
		name: "Crystal Beam",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Crystal",
		shortDesc: "30% to lower foe's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			boost: {
				spa: -1,
			},
		},
	},
	crystalcage: {
		name: "Crystal Cage",
		accuracy: 80,
		basePower: 85,
		category: "Special",
		pp: 10,
		type: "Crystal",
		shortDesc: "Traps and damages for 4-5 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		secondary: {
			chance: 30,
			boost: {
				spa: -1,
			},
		},
	},
	crystalburst: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Crystal Burst",
		pp: 5,
		shortDesc: "Lower's user's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Crystal",
		contestType: "Beautiful",
	},
	crystalhealing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Healing",
		pp: 5,
		priority: 0,
		shortDesc: "Cures whole team's status conditions. 1/16 residual healing at the end of each turn.",
		flags: {snatch: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Crystal Healing');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		volatileStatus: 'crystalhealing',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Crystal Healing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		target: "allyTeam",
		type: "Crystal",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	crystalfortification: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Fortification",
		pp: 20,
		priority: 0,
		shortDesc: "+1 Def, +1 SpD. Clears negative stat changes.",
		flags: {snatch: 1},
		onHit(pokemon, source) {
			let b: BoostName;
			let negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(source, negBoosts);
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	crystalshard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Shard",
		shortDesc: "Sets a layer of Spikes. (Not a new kind of hazard)",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		onHit(pokemon, source) {
			source.side.foe.addSideCondition("spikes");
		},
		secondary: null,
		target: "foeSide",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	feralbite: {
		name: "Feral Bite",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "20% to lower foe's Def by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boost: {
				def: -1,
			},
		},
	},
	feralshred: {
		name: "Feral Shred",
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "Hits twice. Lowers foe's Def by 1 on each hit",
		priority: 0,
		multihit: 2,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boost: {
				def: -1,
			},
		},
	},
	feralrush: {
		name: "Feral Rush",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Feral",
		shortDesc: "User takes 1/3 recoil damage. 20% to lower foe's Def by 1",
		priority: 0,
		recoil: [33,100],
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boost: {
				def: -1,
			},
		},
	},
	feralshriek: {
		name: "Feral Shriek",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Feral",
		shortDesc: "20% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 20,
			boost: {
				spd: -1,
			},
		},
	},
	feralpower: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Feral Power",
		pp: 5,
		priority: 0,
		shortDesc: "Lowers user's Def by 1",
		flags: {protect: 1, mirror: 1, authentic: 1},
		selfBoost: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Feral",
		contestType: "Tough",
	},
	feralbreath: {
		name: "Feral Breath",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 15,
		type: "Feral",
		shortDesc: "50% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 50,
			boost: {
				spd: -1,
			},
		},
	},
	feralroar: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feral Roar",
		pp: 15,
		shortDesc: "Forces the foe to switch to a random ally. +1 Atk, +1 SpA. -6 Priority",
		priority: -6,
		flags: {reflectable: 1, mirror: 1, sound: 1, authentic: 1, mystery: 1},
		forceSwitch: true,
		secondary: null,
		selfBoost: {
			boosts: {
				atk: 1,
				spa: 1,
			},
		},
		target: "normal",
		type: "Feral",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	feralspray: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Feral Spray",
		pp: 25,
		priority: 0,
		shortDesc: "+1 Atk, +1 SpA. Poisons the foe.",
		flags: {protect: 1, reflectable: 1, mirror: 1},
		selfBoost: {
			boosts: {
				atk: 1,
				spa: 1,
			},
		},
		status: 'psn',
		secondary: null,
		target: "normal",
		type: "Feral",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	feralresilience: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feral Resilience",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		shortDesc: "+1 Atk, +1 SpA. Cures user's status conditions.",
		onHit(pokemon) {
			if (['', 'slp'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		boosts: {
			atk: 1,
			spa: 1,
		},
		type: "Feral",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
};
