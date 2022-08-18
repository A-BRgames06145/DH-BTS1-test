export const Abilities: {[abilityid: string]: AbilityData} = {
	soulreap: {
		onBasePower(basePower, attacker, defender, move) {
			if (defender.volatiles['partiallytrapped'] || defender.volatiles['trapped']) {
				return this.chainModify(1.5);
			}
		},
		name: "Soul Reap",
		shortDesc: "This Pokemon's attacks have 1.5x power against trapped targets.",
		rating: 4,
		num: -1,
	},
	immolation: {
		onModifySpDPriority: 6,
		onModifySpD(spd, source, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Immolation",
		shortDesc: "This Pokemon's Special Defense is 1.5x against burned attackers.",
		rating: 4,
		num: -2,
	},
	staccato: {
		onDamagingHit(damage, target, source, move) {
			if (!this.field.isTerrain('electricterrain')) {
				this.field.setTerrain('electricterrain');
				target.addVolatile('staccato');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Staccato');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					this.add('-start', pokemon, 'Staccato');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		name: "Staccato",
		shortDesc: "If this Pokemon is attacked, it sets Electric Terrain and grounds itself.",
		rating: 4,
		num: -3,
	},
	necrodancer: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.addVolatile('necrodancer');
			}
		},
		onAfterMove(source) {
			if (source.volatiles['necrodancer']) {
				source.removeVolatile('necrodancer');
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Necro Dancer');
			},
			onModifyPriority(priority, pokemon, target, move) {
				if (move.flags['dance'] && pokemon.hasAbility('necrodancer')) return priority + 1;
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Necro Dancer', '[silent]');
			},
		},
		name: "Necro Dancer",
		shortDesc: "This Pokemon's next dance move gains +1 priority when another Pokémon faints.",
		rating: 3.5,
		num: -4,
	},
	electricfusion: {
		onAfterBoost(boost, target, source, effect) {
			if (!boost || effect.id === 'electricfusion') return;
			let activated = false;
			const electricfusionBoost: SparseBoostsTable = {};
			if (boost.spa) {
				electricfusionBoost.spd = 1 * boost.spa;
				activated = true;
			}
			if (boost.spd) {
				electricfusionBoost.spa = 1 * boost.spd;
				activated = true;
			}
			if (activated === true) {
				this.add('-ability', target, 'Electric Fusion');
				this.boost(electricfusionBoost, target, target, null, true);
			}
		},
		name: "Electric Fusion",
		shortDesc: "This Pokemon's stat changes to Sp. Atk. are shared with Sp. Def. and vice versa.",
		rating: 4,
		num: -5,
	},
	splitsystem: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.type === "Dark") {
				move.category === 'Special';
			}
			if (move.type === "Steel") {
				move.category === 'Physical';
			}
		},
		name: "Split System",
		shortDesc: "This Pokemon's Dark-type moves are special and its Steel-type moves are physical.",
		rating: 2,
		num: -6,
	},
	surgesurfer: {
		onModifySpe(spe) {
			if (!this.field.isTerrain('')) {
				return this.chainModify(2);
			}
		},
		name: "Surge Surfer",
		shortDesc: "If any Terrain is active, this Pokemon's Speed is doubled.",
		rating: 3,
		num: 207,
	},
	rubberarmor: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Rubber Armor');
		},
		name: "Rubber Armor",
		shortDesc: "Negates opponent's abilities when targeted by an attacking move.",
		rating: 2,
		num: -7,
	},
	asoneglastrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onStart(source) {
			this.field.setWeather('hail');
		},
		onWeather(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		isPermanent: true,
		name: "As One (Glastrier)",
		shortDesc: "The combination of Ice Body and Snow Warning.",
		rating: 3.5,
		num: 266,
	},
	grimneigh: {
		onFaint(source, target) {
			for (const target of this.getAllActive()) {
				target.clearBoosts();
				this.add('-clearboost', target, '[from] ability: Grim Neigh', '[of] ' + source);
				target.cureStatus();
			}
		},
		name: "Grim Neigh",
		shortDesc: "Upon fainting, all active Pokemon have their stat changes and non-volatile status cleared.",
		rating: 3,
		num: 265,
	},
	excavate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.excavateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.excavateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Excavate",
		shortDesc: "This Pokemon's Normal-type moves become Rock type and have 1.2x power.",
		rating: 4,
		num: -8,
	},
	exoskelett: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Exoskelett boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Exoskelett boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Exoskelett weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Exoskelett weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Exoskelett",
		shortDesc: "User gains STAB on Bug moves and also gains Bug-type resistances.",
		rating: 4.5,
		num: -9,
	},
	screencleaner: {
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
				}
				if (pokemon.side.foe.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removeSideCondition(sideCondition);
				}
			}
			for (const pseudoWeather of ['wonderroom', 'trickroom', 'magicroom']) {
				if (pokemon.side.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removePseudoWeather(pseudoWeather);
				}
				if (pokemon.side.foe.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removePseudoWeather(pseudoWeather);
				}
			}
			this.field.clearTerrain();
		},
		shortDesc: "On switch-in, the effects of Screens, Terrains and Rooms end for both sides.",
		inherit: true,
	},
	lightarmor: {
		onSourceModifyDamage(damage, source, target, move) {
			if (['Dark', 'Fairy', 'Ghost'].includes(move.type)) {
				this.debug('Light Armor neutralize');
				return this.chainModify(0.67);
			}
		},
		isUnbreakable: true,
		name: "Light Armor",
		shortDesc: "This Pokemon takes 2/3 damage from Dark-, Fairy- and Ghost-moves.",
		rating: 3,
		num: -10,
	},
	neuroforce: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod === 0) {
				return this.chainModify(1.1);
			}
		},
		shortDesc: "This Pokemon does 1.1x damage on neutral targets.",
		inherit: true,
	},
	battlescarred: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1});
			}
		},
		name: "Battle-Scarred",
		shortDesc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its max HP.",
		rating: 2,
		num: -11,
	},
	grounding: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Grounding');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectData.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Grounding');
				}
				return this.effectData.target;
			}
		},
		name: "Grounding",
		shortDesc: "This Pokemon draws Ground moves to itself to raise Sp. Atk by 1; Ground immunity.",
		rating: 3,
		num: -12,
	},
};
