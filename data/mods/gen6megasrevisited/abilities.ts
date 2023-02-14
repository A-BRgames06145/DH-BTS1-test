export const Abilities: {[k: string]: ModdedAbilityData} = {
// Old Abilities
	aerilate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted && !target.hasAbility('neutralizinggas')) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	aftermath: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !target.hp) {
				this.damage(source.baseMaxhp / 4, source, target, null, true);
			}
		},
	},
	anticipation: {
		inherit: true,
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Natural Gift, Techno Blast, and Weather Ball are considered Normal-type moves.",
	},
	contrary: {
		inherit: true,
		desc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower' && !this.field.getPseudoWeather('neutralizinggas')) return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
	},
	damp: {
		inherit: true,
		desc: "While this Pokemon is active, Explosion, Self-Destruct, and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents Explosion/Self-Destruct/Aftermath while this Pokemon is active.",
	},
	galewings: {
		inherit: true,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying' && !target.hasAbility('neutralizinggas')) return priority + 1;
		},
		rating: 4,
	},
	infiltrator: {
		inherit: true,
		desc: "This Pokemon's moves ignore substitutes and the opposing side's Reflect, Light Screen, Safeguard, and Mist.",
		shortDesc: "Moves ignore substitutes and the foe's Reflect, Light Screen, Safeguard, and Mist.",
	},
	ironbarbs: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target, null, true);
			}
		},
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage, null, null, null, true);
				return 0;
			}
		},
	},
	magicguard: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') return false;
		},
	},
	multitype: {
		inherit: true,
		shortDesc: "If this Pokemon is an Arceus, its type changes to match its held Plate.",
	},
	mummy: {
		inherit: true,
		desc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect the Multitype or Stance Change Abilities.",
	},
	normalize: {
		inherit: true,
		desc: "This Pokemon's moves are changed to be Normal type. This effect comes before other effects that change a move's type.",
		shortDesc: "This Pokemon's moves are changed to be Normal type.",
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.id !== 'struggle' && this.dex.getMove(move.id).type !== 'Normal' && !this.field.getPseudoWeather('neutralizinggas')) {
				move.type = 'Normal';
			}
		},
		rating: -1,
	},
	parentalbond: {
		inherit: true,
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage halved. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage halved.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1  && !target.hasAbility('neutralizinggas')) return this.chainModify(0.5);
		},
		rating: 5,
	},
	pixilate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Fairy-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.pixilateBoosted && !target.hasAbility('neutralizinggas')) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	prankster: {
		inherit: true,
		shortDesc: "This Pokemon's non-damaging moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status' && !target.hasAbility('neutralizinggas')) {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Prankster",
		rating: 4,
		num: 158,
	},
	refrigerate: {
		inherit: true,
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.refrigerateBoosted && !target.hasAbility('neutralizinggas')) return this.chainModify([0x14CD, 0x1000]);
		},
		rating: 4.5,
	},
	roughskin: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target, null, true);
			}
		},
	},
	simple: {
		inherit: true,
		desc: "When this Pokemon's stat stages are raised or lowered, the effect is doubled instead.",
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower' && !this.field.getPseudoWeather('neutralizinggas')) return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
	},
	stancechange: {
		inherit: true,
		onBeforeMovePriority: 11,
	},
	weakarmor: {
		inherit: true,
		desc: "If a physical attack hits this Pokemon, its Defense is lowered by 1 stage and its Speed is raised by 1 stage.",
		shortDesc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 1.",
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 1}, target, target);
			}
		},
		rating: 0.5,
	},
	zenmode: {
		inherit: true,
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode, it reverts to Standard Mode immediately.",
	},
	
// New Abilities	
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'frz', 'slp', 'par'].includes(target.status) && !target.hasAbility('neutralizinggas')) return 5;
		},
		name: "Merciless",
		rating: 1.5,
		num: 196,
		gen: 6,
	},
	pocketdimension: {
	  shortDesc: "This Pokemon switches out after using a status move.",
	  onModifyMove(move, pokemon) {
			if (move.category === 'Status' && !this.field.getPseudoWeather('neutralizinggas')) {
			  move.selfSwitch = true;
			  this.add('-ability', pokemon, 'Pocket Dimension');
			}
	  },
	  name: "Pocket Dimension",
	  rating: 4.5,
    },
	grassysurge: {
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		name: "Grassy Surge",
		rating: 4,
		num: 229,
		gen: 6,
	},
	mistysurge: {
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		name: "Misty Surge",
		rating: 3.5,
		num: 228,
		gen: 6,
	},
	neutralizinggas: {
		// let's get silly
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			this.field.addPseudoWeather('neutralizinggas', pokemon, pokemon.ability);
			this.add('-message', `Neutralizing gas filled the area!`);			
		},
		// actual effects are coded into other abilities themselves
		name: "Neutralizing Gas",
		rating: 4,
		num: 256,
		gen: 6,
	},
	
// ngas is so cringe
	analytic: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target) || this.field.getPseudoWeather('neutralizinggas')) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Analytic",
		rating: 2.5,
		num: 148,
	},	
	compoundeyes: {
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number' || this.field.getPseudoWeather('neutralizinggas')) return;
			this.debug('compoundeyes - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Compound Eyes",
		rating: 3,
		num: 14,
	},
	guts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status  && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Guts",
		rating: 3,
		num: 62,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch'] && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type && !this.field.getPseudoWeather('neutralizinggas')) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		name: "Protean",
		rating: 4.5,
		num: 168,
	},
	magician: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && !this.field.getPseudoWeather('neutralizinggas')) {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
			}
		},
	megalauncher: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Mega Launcher",
		rating: 3,
		num: 178,
	},
	noguard: {
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target) && !this.field.getPseudoWeather('neutralizinggas')) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target) && !this.field.getPseudoWeather('neutralizinggas')) {
				return true;
			}
			return accuracy;
		},
		name: "No Guard",
		rating: 4,
		num: 99,
	},
	blaze: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	overgrow: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		name: "Overgrow",
		rating: 2,
		num: 65,
	},
	swarm: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
	torrent: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	reckless: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if ((move.recoil || move.hasCrashDamage) && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Reckless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		name: "Reckless",
		rating: 3,
		num: 120,
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender && !this.field.getPseudoWeather('neutralizinggas')) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm') && !this.field.getPseudoWeather('neutralizinggas')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	scrappy: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true && !this.field.getPseudoWeather('neutralizinggas')) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	serenegrace: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		name: "Serene Grace",
		rating: 3.5,
		num: 32,
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries && !this.field.getPseudoWeather('neutralizinggas')) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce && !this.field.getPseudoWeather('neutralizinggas')) return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Sheer Force",
		rating: 3.5,
		num: 125,
	},
	skilllink: {
		onModifyMove(move) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length && !this.field.getPseudoWeather('neutralizinggas')) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy && !this.field.getPseudoWeather('neutralizinggas')) {
				delete move.multiaccuracy;
			}
		},
		name: "Skill Link",
		rating: 3,
		num: 92,
	},
	sniper: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sniper",
		rating: 2,
		num: 97,
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (this.field.getPseudoWeather('neutralizinggas')) return;
			if ((effect.id === 'sunnyday' || effect.id === 'desolateland') && !this.field.getPseudoWeather('neutralizinggas')) {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Solar Power",
		rating: 2,
		num: 94,
	},
	strongjaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Strong Jaw",
		rating: 3,
		num: 173,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	tintedlens: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0 && !this.field.getPseudoWeather('neutralizinggas')) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		name: "Tinted Lens",
		rating: 4,
		num: 110,
	},
	toughclaws: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact'] && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Tough Claws",
		rating: 3.5,
		num: 181,
	},
	toxicboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical' && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
	},
	flareboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special' && !this.field.getPseudoWeather('neutralizinggas')) {
				return this.chainModify(1.5);
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
};
