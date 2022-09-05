import type {Dex} from '../sim/dex';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,
	init() {
		for (const i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
	},
	init: function () {
		//Slate 2 Buffs
		this.modData('Learnsets', 'jumpluff').learnset.rapidspin = ['3L1'];
		this.modData('Learnsets', 'jumpluff').learnset.batonpass = ['3L1'];
		
		this.modData('Learnsets', 'tropius').learnset.dragondance = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.outrage = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.rockslide = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.flamethrower = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.calmmind = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.refresh = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.recover = ['3L1'];
		
		this.modData('Learnsets', 'armaldo').learnset.raindance = ['3L1'];
		this.modData('Learnsets', 'armaldo').learnset.signalbeam = ['3L1'];
		
		this.modData('Learnsets', 'crawdaunt').learnset.hydropump = ['3L1'];
		this.modData('Learnsets', 'crawdaunt').learnset.agility = ['3L1'];
		
		this.modData('Learnsets', 'slowpoke').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'slowbro').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'slowking').learnset.slackoff = ['3L1'];
		
		//Slate 3 Buffs
		this.modData('Learnsets', 'piloswine').learnset.shadowball = ['3L1'];
		
		this.modData('Learnsets', 'delibird').learnset.drillpeck = ['3L1'];
		//this.modData('Learnsets', 'delibird').learnset.milkdrink = ['3L1'];
		//this.modData('Learnsets', 'delibird').learnset.spikes = ['3L1'];
		//this.modData('Learnsets', 'delibird').learnset.surf = ['3L1'];
		
		this.modData('Learnsets', 'ledian').learnset.psychic = ['3L1'];
		this.modData('Learnsets', 'ledian').learnset.firepunch = ['3L1'];
		
		this.modData('Learnsets', 'sableye').learnset.yawn = ['3L1'];
		
		this.modData('Learnsets', 'hitmonlee').learnset.submission = ['3L1'];
		
		//this.modData('Learnsets', 'roselia').learnset.sleeppowder = ['3L1'];
		this.modData('Learnsets', 'roselia').learnset.extrasensory = ['3L1'];
		//this.modData('Learnsets', 'roselia').learnset.recover = ['3L1'];
		
		this.modData('Learnsets', 'dunsparce').learnset.spikes = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.outrage = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.healbell = ['3L1'];
		
		this.modData('Learnsets', 'grumpig').learnset.thunderwave = ['3L1'];
		this.modData('Learnsets', 'grumpig').learnset.thunderbolt = ['3L1'];
		
		this.modData('Learnsets', 'volbeat').learnset.fly = ['3L1'];
		
		this.modData('Learnsets', 'cloyster').learnset.hydropump = ['3L1'];
		
		this.modData('Learnsets', 'minun').learnset.blizzard = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.icebeam = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.hail = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.acidarmor = ['3L1'];
		this.modData('Learnsets', 'minun').learnset.haze = ['3L1'];
		
		this.modData('Learnsets', 'illumise').learnset.calmmind = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.aromatherapy = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.signalbeam = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.taunt = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.destinybond = ['3L1'];
		
		this.modData('Learnsets', 'ampharos').learnset.growth = ['3L1'];
		this.modData('Learnsets', 'ampharos').learnset.dragonclaw = ['3L1'];
		this.modData('Learnsets', 'ampharos').learnset.slackoff = ['3L1'];
		
		//this.modData('Learnsets', 'plusle').learnset.willowisp = ['3L1'];
		this.modData('Learnsets', 'plusle').learnset.fireblast = ['3L1'];
		this.modData('Learnsets', 'plusle').learnset.flamethrower = ['3L1'];
		
		this.modData('Learnsets', 'lanturn').learnset.bodyslam = ['3L1'];
		
		//Slate 5 Move Additions
		//Acrobatics
		this.modData('Learnsets', 'farfetchd').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'crobat').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'jumpluff').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'gligar').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'primeape').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'scyther').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'sceptile').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'blaziken').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'ninjask').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'volbeat').learnset.acrobatics = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.acrobatics = ['3L1'];
		
		//Lunge
		this.modData('Learnsets', 'parasect').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'pinsir').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'ariados').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'beautifly').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'butterfree').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'beedrill').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'yanma').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'golem').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'golemalola').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'donphan').learnset.lunge = ['3L1'];
		
		//Foul Play
		this.modData('Learnsets', 'houndoom').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'umbreon').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'absol').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'shiftry').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'cacturne').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'sneasel').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mightyena').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'murkrow').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'slowking').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'slowbro').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'ninetales').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'porygon2').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.foulplay = ['3L1'];
		
		//Sucker Punch
		this.modData('Learnsets', 'absol').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'cacturne').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'furret').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'gengar').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'golem').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'houndoom').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'mightyena').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'nidoking').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'sableye').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'smeargle').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'umbreon').learnset.suckerpunch = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.suckerpunch = ['3L1'];
		
		//Spiky Shield
		this.modData('Learnsets', 'cacturne').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'cradily').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'tangela').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'tropius').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'omastar').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'sandslash').learnset.spikyshield = ['3L1'];
		this.modData('Learnsets', 'qwilfish').learnset.spikyshield = ['3L1'];
		
		//Slate 6
		this.modData('Learnsets', 'sunflora').learnset.weatherball = ['3L1'];
		this.modData('Learnsets', 'sunflora').learnset.stunspore = ['3L1'];
		this.modData('Learnsets', 'sunflora').learnset.batonpass = ['3L1'];
		
		this.modData('Learnsets', 'mawile').learnset.meteormash = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.thunderwave = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.foulplay = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.suckerpunch = ['3L1'];
		
		//Slate 7
		//this.modData('Learnsets', 'girafarig').learnset.willowisp = ['3L1'];
		this.modData('Learnsets', 'girafarig').learnset.trick = ['3L1'];
		
		this.modData('Learnsets', 'piloswine').learnset.slackoff = ['3L1'];
		
		//Slate 8
		this.modData('Learnsets', 'glalie').learnset.iceshard = ['3L1'];
		this.modData('Learnsets', 'regice').learnset.iceshard = ['3L1'];
		this.modData('Learnsets', 'abomasnow').learnset.iceshard = ['3L1'];
		this.modData('Learnsets', 'lapras').learnset.iceshard = ['3L1'];
		this.modData('Learnsets', 'walrein').learnset.iceshard = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.iceshard = ['3L1'];
		
		this.modData('Learnsets', 'vibrava').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'scyther').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'illumise').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'sandslash').learnset.lunge = ['3L1'];
		this.modData('Learnsets', 'ninjask').learnset.lunge = ['3L1'];
		
		this.modData('Learnsets', 'torkoal').learnset.bodypress = ['3L1'];
		this.modData('Learnsets', 'torkoal').learnset.earthquake = ['3L1'];
		this.modData('Learnsets', 'torkoal').learnset.solarbeam = ['3L1'];
		this.modData('Learnsets', 'torkoal').learnset.slackoff = ['3L1'];
		this.modData('Learnsets', 'torkoal').learnset.willowisp = ['3L1'];
		
		this.modData('Learnsets', 'delibird').learnset.taunt = ['3L1'];
		//this.modData('Learnsets', 'delibird').learnset.batonpass = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.brickbreak = ['3L1'];
		//this.modData('Learnsets', 'delibird').learnset.lowkick = ['3L1'];
		
		//Slate 9
		this.modData("Learnsets", 'dusclops').learnset.brickbreak = ['3L1'];
		this.modData("Learnsets", 'dusclops').learnset.counter = ['3L1'];
		this.modData("Learnsets", 'dusclops').learnset.suckerpunch = ['3L1'];
		this.modData("Learnsets", 'dusclops').learnset.haze = ['3L1'];
		
		this.modData("Learnsets", 'parasect').learnset.lunge = ['3L1'];
		this.modData("Learnsets", 'parasect').learnset.knockoff = ['3L1'];
		this.modData("Learnsets", 'parasect').learnset.shadowball = ['3L1'];
		
		//Slate 10
		//this.modData("Learnsets", 'flygon').learnset.spikes = ['3L1'];
		this.modData("Learnsets", 'flygon').learnset.morningsun = ['3L1'];
		this.modData("Learnsets", 'flygon').learnset.dragondance = ['3L1'];
		
		this.modData("Learnsets", 'exploud').learnset.boomburst = ['3L1'];
		
		//Slate 11
		this.modData("Learnsets", 'stantler').learnset.earthquake = ['3L1'];
		this.modData("Learnsets", 'stantler').learnset.icebeam = ['3L1'];
		this.modData("Learnsets", 'stantler').learnset.thunderbolt = ['3L1'];
		this.modData("Learnsets", 'stantler').learnset.psychic = ['3L1'];
		this.modData("Learnsets", 'stantler').learnset.hypnosis = ['3L1'];
		
		this.modData("Learnsets", 'lapras').learnset.dragonclaw = ['3L1'];
		this.modData("Learnsets", 'lapras').learnset.outrage = ['3L1'];
		this.modData("Learnsets", 'lapras').learnset.recover = ['3L1'];

		this.modData("Learnsets", 'arbok').learnset.brickbreak = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.crunch = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.futuresight = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.psychic = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.suckerpunch = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.curse = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.hypnosis = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.roleplay = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.skillswap = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.snatch = ['3L1'];
		this.modData("Learnsets", 'arbok').learnset.trick = ['3L1'];
		
		this.modData("Learnsets", 'relicanth').learnset.bounce = ['3L1'];
		this.modData("Learnsets", 'relicanth').learnset.flail = ['3L1'];
		this.modData("Learnsets", 'relicanth').learnset.rockblast = ['3L1'];
		this.modData("Learnsets", 'relicanth').learnset.sludgebomb = ['3L1'];
		this.modData("Learnsets", 'relicanth').learnset.superpower = ['3L1'];
		this.modData("Learnsets", 'relicanth').learnset.whirlpool = ['3L1'];
		
		this.modData('Learnsets', 'blaziken').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'donphan').learnset.knockoff = ['3L1'];
		//this.modData('Learnsets', 'dusclops').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'gardevoir').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'ludicolo').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'machamp').learnset.knockoff = ['3L1'];
		//this.modData('Learnsets', 'milotic').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'muk').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'pinsir').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'tentacruel').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'scizor').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.knockoff = ['3L1'];
		
		//this.modData('Learnsets', 'skuntank').learnset.tailglow = ['3L1'];
		//this.modData('Learnsets', 'raikou').learnset.tailglow = ['3L1'];
		
		this.modData('Learnsets', 'golem').learnset.rapidspin = ['3L1'];

		//this.modData('Learnsets', 'dragonite').learnset.softboiled = ['3L1'];

		this.modData('Learnsets', 'grumpig').learnset.whirlwind = ['3L1'];

		this.modData('Learnsets', 'heracross').learnset.spikes = ['3L1'];
		this.modData('Learnsets', 'sandslash').learnset.spikes = ['3L1'];
		
		this.modData('Learnsets', 'torkoal').learnset.rapidspin = ['3L1'];
		this.modData('Learnsets', 'spinda').learnset.rapidspin = ['3L1'];

		this.modData('Learnsets', 'entei').learnset.sacredfire = ['3L1'];
		this.modData('Learnsets', 'entei').learnset.extremespeed = ['3L1'];
		this.modData('Learnsets', 'entei').learnset.crunch = ['3L1'];
		this.modData('Learnsets', 'entei').learnset.earthquake = ['3L1'];
		this.modData('Learnsets', 'entei').learnset.rockslide = ['3L1'];
		
		//this.modData('Learnsets', 'camerupt').learnset.slackoff = ['3L1'];

		//this.modData('Learnsets', 'poliwrath').learnset.growth = ['3L1'];
		//this.modData('Learnsets', 'politoed').learnset.growth = ['3L1'];
		this.modData('Learnsets', 'poliwrath').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'politoed').learnset.lovelykiss = ['3L1'];
		
		this.modData('Learnsets', 'blastoise').learnset.zapcannon = ['3L1'];

		//this.modData('Learnsets', 'seaking').learnset.swordsdance = ['3L1'];
		
		//this.modData('Learnsets', 'bellossom').learnset.aromatherapy = ['3L1'];
		this.modData('Learnsets', 'bellossom').learnset.leechseed = ['3L1'];

		this.modData('Learnsets', 'vileplume').learnset.leechseed = ['3L1'];
		
		this.modData('Learnsets', 'rapidash').learnset.lowkick = ['3L1'];

		this.modData('Learnsets', 'tauros').learnset.quickattack = ['3L1'];

		this.modData('Learnsets', 'raichu').learnset.sing = ['3L1'];

		this.modData('Learnsets', 'eevee').learnset.growth = ['3L1'];

		//this.modData('Learnsets', 'mamoswine').learnset.superpower = ['3L1'];
		//this.modData('Learnsets', 'mamoswine').learnset.knockoff = ['3L1'];
		
		this.modData('Learnsets', 'roserade').learnset.hyperbeam = ['3L1'];

		this.modData('Learnsets', 'leafeon').learnset.gigadrain = ['3L1'];
		//this.modData('Learnsets', 'leafeon').learnset.knockoff = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.healbell = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.hypervoice = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.leafblade = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.leechseed = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.reflect = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.roar = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.swordsdance = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.synthesis = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.weatherball = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.yawn = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.aerialace = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.bide = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.bulletseed = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.covet = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.doublekick = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.faketears = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.focusenergy = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.flash = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.furycutter = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.headbutt = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.hyperbeam = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.magicalleaf = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.razorleaf = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.refresh = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.rocksmash = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.sing = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.skullbash = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.solarbeam = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.strength = ['3L1'];
		this.modData('Learnsets', 'leafeon').learnset.swift = ['3L1'];		
		this.modData('Learnsets', 'leafeon').learnset.swagger = ['3L1'];
		
		this.modData('Learnsets', 'honchkrow').learnset.superpower = ['3L1'];

		this.modData('Learnsets', 'lickilicky').learnset.explosion = ['3L1'];

		this.modData('Learnsets', 'magnezone').learnset.mirrorcoat = ['3L1'];

		this.modData('Learnsets', 'electivire').learnset.earthquake = ['3L1'];
		this.modData('Learnsets', 'electivire').learnset.rockslide = ['3L1'];
		this.modData('Learnsets', 'electivire').learnset.flamethrower = ['3L1'];
		
		this.modData('Learnsets', 'magmortar').learnset.earthquake = ['3L1'];
		this.modData('Learnsets', 'magmortar').learnset.rockslide = ['3L1'];
		this.modData('Learnsets', 'magmortar').learnset.thunderbolt = ['3L1'];
		
		this.modData('Learnsets', 'togekiss').learnset.extremespeed = ['3L1'];

		this.modData("Learnsets", 'gallade').learnset.aerialace = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.brickbreak = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.bulkup = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.focuspunch = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.leafblade = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.revenge = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.rocktomb = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.falseswipe = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.furycutter = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.reversal = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.rocksmash = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.cut = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.earthquake = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.hyperbeam = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.leer = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.lowkick = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.rockslide = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.slash = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.strength = ['3L1'];
		this.modData("Learnsets", 'gallade').learnset.swordsdance = ['3L1'];

		this.modData("Learnsets", 'froslass').learnset.iciclespear = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.imprison = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.shockwave = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.taunt = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.torment = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.trick = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.willowisp = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.charm = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.destinybond = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.mudslap = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.painsplit = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.psychup = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.confuseray = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.dreameater = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.hyperbeam = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.icepunch = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.psychic = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.reflect = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.thunder = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.thunderwave = ['3L1'];
		this.modData("Learnsets", 'froslass').learnset.thunderbolt = ['3L1'];
		
		delete this.modData('Learnsets', 'lickitung').learnset.knockoff;
		delete this.modData('Learnsets', 'deoxys').learnset.knockoff;
		
		
		//Gen 2 Event Moves
		this.modData('Learnsets', 'bulbasaur').learnset.ancientpower = ['3L1'];
		this.modData('Learnsets', 'charmander').learnset.crunch = ['3L1'];
		this.modData('Learnsets', 'squirtle').learnset.zapcannon = ['3L1'];
		this.modData('Learnsets', 'spearow').learnset.sonicboom = ['3L1'];
		this.modData('Learnsets', 'nidoranf').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'nidoranf').learnset.moonlight = ['3L1'];
		this.modData('Learnsets', 'nidoranf').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'nidoranm').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'nidoranm').learnset.morningsun = ['3L1'];
		this.modData('Learnsets', 'nidoranm').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'zubat').learnset.flail = ['3L1'];
		this.modData('Learnsets', 'oddish').learnset.leechseed = ['3L1'];
		this.modData('Learnsets', 'paras').learnset.synthesis = ['3L1'];
		this.modData('Learnsets', 'psyduck').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'psyduck').learnset.triattack = ['3L1'];
		this.modData('Learnsets', 'poliwag').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'abra').learnset.foresight = ['3L1'];
		this.modData('Learnsets', 'machop').learnset.falseswipe = ['3L1'];
		this.modData('Learnsets', 'machop').learnset.thrash = ['3L1'];
		this.modData('Learnsets', 'bellsprout').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'bellsprout').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'tentacool').learnset.confuseray = ['3L1'];
		this.modData('Learnsets', 'ponyta').learnset.lowkick = ['3L1'];
		this.modData('Learnsets', 'magnemite').learnset.agility = ['3L1'];
		this.modData('Learnsets', 'farfetchd').learnset.furycutter = ['3L1'];
		this.modData('Learnsets', 'doduo').learnset.lowkick = ['3L1'];
		this.modData('Learnsets', 'seel').learnset.flail = ['3L1'];
		this.modData('Learnsets', 'onix').learnset.sharpen = ['3L1'];
		this.modData('Learnsets', 'drowzee').learnset.amnesia = ['3L1'];
		this.modData('Learnsets', 'krabby').learnset.metalclaw = ['3L1'];
		this.modData('Learnsets', 'voltorb').learnset.agility = ['3L1'];
		this.modData('Learnsets', 'exeggcute').learnset.sweetscent = ['3L1'];
		this.modData('Learnsets', 'cubone').learnset.furyattack = ['3L1'];
		this.modData('Learnsets', 'lickitung').learnset.doubleslap = ['3L1'];
		this.modData('Learnsets', 'chansey').learnset.sweetscent = ['3L1'];
		this.modData('Learnsets', 'tangela').learnset.synthesis = ['3L1'];
		this.modData('Learnsets', 'kangaskhan').learnset.faintattack = ['3L1'];
		this.modData('Learnsets', 'horsea').learnset.haze = ['3L1'];
		this.modData('Learnsets', 'goldeen').learnset.swordsdance = ['3L1'];
		this.modData('Learnsets', 'staryu').learnset.twister = ['3L1'];
		this.modData('Learnsets', 'mrmime').learnset.mindreader = ['3L1'];
		this.modData('Learnsets', 'scyther').learnset.sonicboom = ['3L1'];
		this.modData('Learnsets', 'pinsir').learnset.rockthrow = ['3L1'];
		this.modData('Learnsets', 'tauros').learnset.quickattack = ['3L1'];
		this.modData('Learnsets', 'magikarp').learnset.bubble = ['3L1'];
		this.modData('Learnsets', 'magikarp').learnset.reversal = ['3L1'];
		this.modData('Learnsets', 'lapras').learnset.bite = ['3L1'];
		this.modData('Learnsets', 'lapras').learnset.futuresight = ['3L1'];
		this.modData('Learnsets', 'eevee').learnset.growth = ['3L1'];
		this.modData('Learnsets', 'porygon').learnset.barrier = ['3L1'];
		this.modData('Learnsets', 'omanyte').learnset.rockthrow = ['3L1'];
		this.modData('Learnsets', 'kabuto').learnset.rockthrow = ['3L1'];
		this.modData('Learnsets', 'aerodactyl').learnset.rockthrow = ['3L1'];
		this.modData('Learnsets', 'snorlax').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'snorlax').learnset.splash = ['3L1'];
		this.modData('Learnsets', 'snorlax').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'dratini').learnset.hydropump = ['3L1'];
		this.modData('Learnsets', 'dratini').learnset.extremespeed = ['3L1'];
		this.modData('Learnsets', 'chikorita').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'cyndaquil').learnset.doubleedge = ['3L1'];
		this.modData('Learnsets', 'totodile').learnset.submission = ['3L1'];
		this.modData('Learnsets', 'sentret').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'hoothoot').learnset.nightshade = ['3L1'];
		this.modData('Learnsets', 'ledyba').learnset.barrier = ['3L1'];
		this.modData('Learnsets', 'spinarak').learnset.growth = ['3L1'];
		this.modData('Learnsets', 'chinchou').learnset.lightscreen = ['3L1'];
		this.modData('Learnsets', 'pichu').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'pichu').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'pichu').learnset.scaryface = ['3L1'];
		this.modData('Learnsets', 'pichu').learnset.sing = ['3L1'];
		this.modData('Learnsets', 'cleffa').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'cleffa').learnset.scaryface = ['3L1'];
		this.modData('Learnsets', 'cleffa').learnset.swift = ['3L1'];
		this.modData('Learnsets', 'igglybuff').learnset.mimic = ['3L1'];
		this.modData('Learnsets', 'igglybuff').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'igglybuff').learnset.scaryface = ['3L1'];
		this.modData('Learnsets', 'natu').learnset.safeguard = ['3L1'];
		this.modData('Learnsets', 'marill').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'marill').learnset.hydropump = ['3L1'];
		this.modData('Learnsets', 'marill').learnset.scaryface = ['3L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.substitute = ['3L1'];
		this.modData('Learnsets', 'hoppip').learnset.agility = ['3L1'];
		this.modData('Learnsets', 'aipom').learnset.mimic = ['3L1'];
		this.modData('Learnsets', 'sunkern').learnset.splash = ['3L1'];
		this.modData('Learnsets', 'yanma').learnset.sweetkiss = ['3L1'];
		this.modData('Learnsets', 'wooper').learnset.bellydrum = ['3L1'];
		this.modData('Learnsets', 'wooper').learnset.scaryface = ['3L1'];
		this.modData('Learnsets', 'murkrow').learnset.beatup = ['3L1'];
		this.modData('Learnsets', 'misdreavus').learnset.hypnosis = ['3L1'];
		this.modData('Learnsets', 'wobbuffet').learnset.mimic = ['3L1'];
		this.modData('Learnsets', 'pineco').learnset.substitute = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.furyattack = ['3L1'];
		this.modData('Learnsets', 'dunsparce').learnset.horndrill = ['3L1'];
		this.modData('Learnsets', 'snubbull').learnset.lovelykiss = ['3L1'];
		this.modData('Learnsets', 'qwilfish').learnset.doubleedge = ['3L1'];
		this.modData('Learnsets', 'heracross').learnset.seismictoss = ['3L1'];
		this.modData('Learnsets', 'sneasel').learnset.moonlight = ['3L1'];
		this.modData('Learnsets', 'teddiursa').learnset.sweetscent = ['3L1'];
		this.modData('Learnsets', 'swinub').learnset.whirlwind = ['3L1'];
		this.modData('Learnsets', 'remoraid').learnset.amnesia = ['3L1'];
		this.modData('Learnsets', 'remoraid').learnset.mist = ['3L1'];
		this.modData('Learnsets', 'delibird').learnset.payday = ['3L1'];
		this.modData('Learnsets', 'mantine').learnset.gust = ['3L1'];
		this.modData('Learnsets', 'skarmory').learnset.furycutter = ['3L1'];
		this.modData('Learnsets', 'phanpy').learnset.absorb = ['3L1'];
		this.modData('Learnsets', 'stantler').learnset.safeguard = ['3L1'];
		this.modData('Learnsets', 'tyrogue').learnset.rage = ['3L1'];
		this.modData('Learnsets', 'smoochum').learnset.metronome = ['3L1'];
		this.modData('Learnsets', 'smoochum').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'smoochum').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'elekid').learnset.petaldance = ['3L1'];
		this.modData('Learnsets', 'elekid').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'elekid').learnset.pursuit = ['3L1'];
		this.modData('Learnsets', 'magby').learnset.faintattack = ['3L1'];
		this.modData('Learnsets', 'magby').learnset.dizzypunch = ['3L1'];
		this.modData('Learnsets', 'miltank').learnset.megakick = ['3L1'];
		this.modData('Learnsets', 'larvitar').learnset.rage = ['3L1'];
		
		//Circle Throw
		this.modData('Learnsets', 'nidoqueen').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'poliwrath').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'kangaskhan').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'azumarill').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'heracross').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'hitmontop').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'exploud').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'hariyama').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'mawile').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'spinda').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'kecleon').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'dusclops').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'toxicroak').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'chesnaught').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'crabominable').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'grimmsnarl').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'nidoking').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'granbull').learnset.circlethrow = ['3L1'];
		this.modData('Learnsets', 'machamp').learnset.circlethrow = ['3L1'];
		
		this.modData('Learnsets', 'kleavor').learnset.rockslide = ['3L1'];
		
		this.modData("Learnsets", "slowkinggalar").learnset.counter = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.doubleteam = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.doubleedge = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.dreameater = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.dynamicpunch = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.focuspunch = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.frustration = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.furycutter = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.mimic = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.mudsport = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.mudslap = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.nightmare = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.return = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.secretpower = ["3L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.seismictoss = ["3L1"];
		this.modData("Learnsets", "marowakalola").learnset.sing = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.bodyslam = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.counter = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.dynamicpunch = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.furycutter = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.megakick = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.metronome = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.mimic = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.mudslap = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.secretpower = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.rocksmash = ["3L1"];
		this.modData("Learnsets", "golemalola").learnset.strength = ["3L1"];
	},
};
