'use strict'

var CardType = {
	CREATURE: "creature",
	ITEM: "item",
	SPELL: "spell",
	POWER: "power"
};

// ============================================================================
// Card definition related functions
// ============================================================================

function card_default_options() {
	return {
		foreground_color: "white",
		background_color: "black",
		default: {
			color: "black",
			icon: "",
			title_size: "13"
		},
		page_size: "A4",
		page_rows: 3,
		page_columns: 3,
		card_arrangement: "front_only",
		card_size: "25x35",
		card_count: null,
		icon_inline: true,
		rounded_corners: true
	};
}

function card_creature_default_data(creature_data) {
	var data = creature_data || {};
	data.cr = data.cr || "1/2";
	data.size = data.size || "M";
	data.alignment = data.alignment || I18N.ALIGNMENTS.UNALIGNED;
	data.type = data.type || "";
	data.ac = data.ac || "10";
	data.hp = data.hp || "3 (1d6)";
	data.perception = data.perception || "10";
	data.speed = data.speed || "9 m";
	data.stats = data.stats || ["10", "10", "10", "10", "10", "10"];
	return data;
}

function card_item_default_data(item_data) {
	var data = item_data || {};
	return data;
}

function card_spell_default_data(spell_data) {
	var data = spell_data || {};
	data.level = data.level || 1;
	data.ritual = data.ritual || false;
	data.casting_time = data.casting_time || "1 action";
	data.range = data.range || "18 m";
	data.verbal = data.verbal || false;
	data.somatic = data.somatic || false;
	data.material = data.material || "";
	data.duration = data.duration || "1 round";
	data.type = data.type || "";
	data.classes = data.classes || "";
	return data;
}

function card_power_default_data(power_data) {
	var data = power_data || {};
	return data;
}


function card_init(card) {
	card.title = card.title || "";
	if (card.type == CardType.CREATURE) {
		if (card.subtitle)
			delete card.subtitle;
		card.creature = card_creature_default_data(card.creature);
		card.color = card.color || "black";
	} else if (card.type == CardType.ITEM) {
		card.item = card_item_default_data(card.item);
		card.color = card.color || "dimgray";
		card.icon = card.icon || "swap-bag";
	} else if (card.type == CardType.SPELL) {
		card.spell = card_spell_default_data(card.spell);
		card.color = card.color || "maroon";
		card.icon = card.icon || "magic-swirl";
	} else if (card.type == CardType.POWER) {
		card.power = card_power_default_data(card.power);
		card.color = card.color || "DarkSlateGray";
		card.icon = card.icon || "lob-arrow";
	}
	card.contents = card.contents || [];
	card_update(card);
}

function card_update(card) {
	var removeIndexes = [];
	card.contents.map(function(value, index) {
		var parts = card_data_split_params(value);
		if (parts[0] == "subtitle")
		{
			removeIndexes.push(index);
			card.subtitle = parts[1];
		}
		else if (parts[0] == "creature")
		{
			removeIndexes.push(index);
			card.creature.cr = parts[1];
			card.creature.size = parts[3];
			card.creature.alignment = parts[4];
			card.creature.type = parts[2];
		}
		else if (parts[0] == "ac_hp_pp_spd")
		{
			removeIndexes.push(index);
			removeIndexes.push(index + 1);
			card.creature.ac = parts[1];
			card.creature.hp = parts[2];
			card.creature.perception = parts[3];
			card.creature.speed = parts[4];
		}
		else if (parts[0] == "dndstats")
		{
			removeIndexes.push(index);
			removeIndexes.push(index + 1);
			card.creature.stats = [];
			card.creature.stats[0] = parts[1];
			card.creature.stats[1] = parts[2];
			card.creature.stats[2] = parts[3];
			card.creature.stats[3] = parts[4];
			card.creature.stats[4] = parts[5];
			card.creature.stats[5] = parts[6];
		}
		else if (parts[0] == "vulnerabilities")
		{
			removeIndexes.push(index);
			card.creature.vulnerabilities = parts[1];
		}
		else if (parts[0] == "resistances")
		{
			removeIndexes.push(index);
			card.creature.resistances = parts[1];
		}
		else if (parts[0] == "immunities")
		{
			removeIndexes.push(index);
			card.creature.immunities = parts[1];
		}
	});

	while (removeIndexes.length > 0)
		card.contents.splice(removeIndexes[removeIndexes.pop()], 1);

	if (card.type == CardType.CREATURE) {
		update_from_cr(card);
	}
}

function card_has_tag(card, tag) {
	if (!tag || !card.tags)
		return false;
	tag = tag.trim().toLowerCase();
	var index = card.tags.indexOf(tag);
	return index > -1;
}

function card_add_tag(card, tag) {
	if (!tag || !card.tags)
		return;
	tag = tag.trim();
	var index = card.tags.indexOf(tag);
	if (index === -1) {
		card.tags.push(tag);
	}
}

function card_remove_tag(card, tag) {
	if (!tag || !card.tags)
		return;
	tag = tag.trim().toLowerCase();
	card.tags = card.tags.filter(function (t) {
		return tag !== t;
	});

	if (card.tags.length == 0)
		delete card.tags;
}

var pxByCR = [
	10,
	200,
	450,
	700,
	1100,
	1800,
	2300,
	2900,
	3900,
	5000,
	5900,
	7200,
	8400,
	10000,
	11500,
	13000,
	15000,
	18000,
	20000,
	22000,
	25000,
	33000,
	41000,
	50000,
	62000,
	75000,
	90000,
	105000,
	120000,
	135000,
	155000
];

function update_from_cr(card) {
	var cr = card.creature.cr;
	if (cr === "1/8") {
		cr = 1/8;
		card.creature.xp = 25;
	} else if (cr === "1/4") {
		cr = 1/4;
		card.creature.xp = 50;
	} else if (cr === "1/2") {
		cr = 1/2;
		card.creature.xp = 100;
	} else
		card.creature.xp = pxByCR[cr];
	card.creature.proficiency = Math.floor(cr / 4) + 2;
}

function card_data_color_front(card_data, options) {
	return card_data.color_front || card_data.color || options.default.color || "black";
}

function card_data_color_back(card_data, options) {
	return card_data.color_back || card_data.color || options.default.color || "black";
}

function card_data_icon_front(card_data, options) {
	return card_data.icon_front || card_data.icon || options.default.icon || "";
}

function card_data_icon_back(card_data, options) {
	return card_data.icon_back || card_data.icon || options.default.icon || "";
}

function card_data_split_params(value) {
	return value.split("|").map(function (str) { return str.trim(); });
}

function card_data_parse_damage_type_params(value) {
	return value
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.ACID + "[s]?", 'g'),					'$1<span class="card-inlineicon icon-type-acid"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.BLUDGEONING + "[s]?", 'g'),			'$1<span class="card-inlineicon icon-type-bludgeoning"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.FIRE + "[s]?", 'g'),					'$1<span class="card-inlineicon icon-type-fire"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.FORCE + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-force"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.ICE + "[s]?", 'g'),					'$1<span class="card-inlineicon icon-type-ice"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.LIGHTNING + "[s]?", 'g'),			'$1<span class="card-inlineicon icon-type-lightning"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.NECROTIC + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-necrotic"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.PIERCING + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-piercing"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.POISON + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-poison"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.PSYCHIC + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-psychic"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.RADIANT + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-radiant"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.SLASHING + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-slashing"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.THUNDER + "[s]?", 'g'),				'$1<span class="card-inlineicon icon-type-thunder"></span>')
	.replace(new RegExp("([ ([]|^){1}[ ]?" + I18N.DAMAGE_TYPES.PHYSICAL + "[s]? " + I18N.DAMAGE_TYPES.NOT_MAGICAL + "[s]?[ ]?" ,'g'), '<span class="card-inlineicon icon-type-non-magical"></span>')
	;
}

function card_data_parse_condition_params(value) {
	return value
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.BLINDED + "[es]?", 'gi'),					'$1<span class="card-inlineicon icon-condition-blinded"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.CHARMED + "[es]?", 'gi'),					'$1<span class="card-inlineicon icon-condition-charmed"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.DEAFENED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-deafened"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.EXHAUSTION + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-exhaustion"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.FRIGHTENED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-frightened"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.GRAPPLED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-grappled"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.INCAPACITATED + "[es]?", 'gi'),			'$1<span class="card-inlineicon icon-condition-incapacitated"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.INVISIBLE + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-invisible"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.PARALYZED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-paralyzed"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.PETRIFIED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-petrified"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.POISONED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-poisoned"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.PRONE + "[es]?", 'gi'),					'$1<span class="card-inlineicon icon-condition-prone"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.RESTRAINED + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-restrained"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.STUNNED + "[es]?", 'gi'),					'$1<span class="card-inlineicon icon-condition-stunned"></span>')
	.replace(new RegExp("([ ]|^){1}" + I18N.CONDITION.UNCONSCIOUS + "[es]?", 'gi'),				'$1<span class="card-inlineicon icon-condition-unconscious"></span>')
	;
}

function card_data_parse_icons_params(value) {
	if (!value)
		return value;
	value = card_data_parse_damage_type_params(value);
	value = card_data_parse_condition_params(value);
	return value
	.replace(/\\/gi, '')
	.replace(new RegExp("([ \(\[]|^){1}" + I18N.AC + "[ ]", 'gi'),						'$1<span class="card-inlineicon icon-custom-ac"></span>')
	.replace(new RegExp("(([\(\[])| |^){1}" + I18N.HP + "[s]?", 'gi'),					'$2<span class="card-inlineicon icon-custom-hp"></span>')
	.replace(new RegExp("(([\(\[^a-zA-Z])| |^){1}" + I18N.GP + "([^a-zA-Z]+|$)", 'gi'),	'$2<span class="card-inlineicon icon-custom-gp"></span>')
	.replace(/[ ]?cr[ée]ature[s]?[ ]?/gi,					'<span class="card-inlineicon icon-custom-creature"></span>')
	.replace(/prochain[s]? tour[s]?/gi,					'<span class="card-inlineicon icon-custom-timer"></span>')
	// .replace(/([ ]|^){1}tour[s]?[ ]?/g,       			'$1<span class="card-inlineicon icon-custom-round"></span>')
	// .replace(/ comme /g,       							' ĉ ')
	;
}

// ============================================================================
// Card element generating functions
// ============================================================================

function card_element_title(card_data, options) {
	var title = card_data.title || "";
	var title_size = card_data.title_size || options.default.title_size || 'normal';
	return '<div class="card-title card-title-' + title_size + '">' + title + '</div>';
}

function card_element_icon(card_data, options) {
	var icon = card_data_icon_front(card_data, options);
	var classname = "icon";
	if (options.icon_inline) {
		classname = "inlineicon";
	}

	var result = "";
	result += '<div class="card-title-' + classname + '-container">';
	result += 	'<div class="card-title-' + classname + ' icon-' + icon + '"></div>';
	result += '</div>';
	return result;
}

function card_element_subtitle(card_data, options) {
	var result = "";
	if (card_data.subtitle)
		result += '<div class="card-element card-subtitle">' + card_data.subtitle + '</div>';
	return result;
}

function card_element_header_creature(card_data, options) {
	var result = "";
	result += '<div class="card-title-cr-container">';
	result += 	'<p class="card-title-cr">' + card_data.creature.cr + '</p>';
	result += 	'<p class="card-title-proficiency">(+' + card_data.creature.proficiency + ')</p>';
	if (card_data.creature.xp > 1000) {
		var thousands = Math.floor(card_data.creature.xp / 1000);
		var rest = (card_data.creature.xp - thousands * 1000);
		if (rest == 0)
			result += '<p class="card-title-xp">' + thousands + ' 000px</p>';
		else if (rest < 10)
			result += '<p class="card-title-xp">' + thousands + ' 00' + rest + 'px</p>';
		else if (rest < 100)
			result += '<p class="card-title-xp">' + thousands + ' 0' + rest + 'px</p>';
		else 
			result += '<p class="card-title-xp">' + thousands + ' ' + rest + 'px</p>';
	} else
		result += '    <p class="card-title-xp">' + card_data.creature.xp + 'px</p>';
	result += '</div>';
	result += '<div class="card-element card-subtitle card-creature-subtitle">' + card_data.creature.type + ", taille " + card_data.creature.size;
	if (card_data.creature.alignment)
		result += '<div style="float:right">' + card_data.creature.alignment + '</div>';
	result += '</div>';
	return result;
}

function card_element_base_creature(card_data, options) {
	var result = "";
	result += '<div class="card-creature-base">';
	result += '<div class="card-element">';
	result += 	'<h4 class="card-inlineicon icon-custom-ac"></h4>';
	result += 	'<p class="card-property-text">' + card_data.creature.ac + '</p>';
	result += 	'<div style="float:right">';
	result += 		'<h4 class="card-property-name">' + I18N.PERCEPTION + '</h4>';
	result += 		'<p class="card-property-text">' + card_data.creature.perception + '</p>';
	result += 	'</div>';
	result += '</div>';
	result += '<div class="card-element">';
	result += 	'<h4 class="card-inlineicon icon-custom-hp"></h4>';
	result += 	'<p class="card-property-text">' + card_data.creature.hp + '</p>';
	result += 	'<div style="float:right">';
	result += 		'<h4 class="card-property-name">' + I18N.SPEED + '</h4>';
	result += 		'<p class="card-property-text">' + card_data.creature.speed + '</p>';
	result += 	'</div>';
	result += '</div>';
	result += card_element_ruler(null, card_data, options);

	var stats = ["", "", "", "", "", ""];
	var spellcasting = ["", "", "", "", "", ""];
	var saving = ["", "", "", "", "", ""];
	for (var i = 0; i < 6; ++i) {
		stats[i] = card_data.creature.stats[i];
		if (stats[i].includes("M")) {
			stats[i] = stats[i].replace("M", "");
			spellcasting[i] = '<span class="card-stats-header-spellcasting">★</span>';
		}

		if (stats[i].includes("S")) {
			stats[i] = stats[i].replace("S", "");
			saving[i] = '<span class="card-stats-header-saving">•</span>';
		}

		stats[i] = parseInt(stats[i], 10) || 0;
		var mod = Math.floor((stats[i] - 10) / 2);
		if (mod >= 0)
			mod = "+" + mod;
		else
			mod = "" + mod;
		stats[i] += " (" + mod + ")";
	}

	result += '<table class="card-stats">';
	result += 	'<tbody>';
	result += 		'<tr>';
	result += 			'<th class="card-stats-header">' + I18N.STRENGTH 		+ spellcasting[0] + saving[0] + '</th>';
	result += 			'<th class="card-stats-header">' + I18N.DEXTERITY 		+ spellcasting[1] + saving[1] + '</th>';
	result += 			'<th class="card-stats-header">' + I18N.CONSTITUTION 	+ spellcasting[2] + saving[2] + '</th>';
	result += 			'<th class="card-stats-header">' + I18N.INTELLIGENCE 	+ spellcasting[3] + saving[3] + '</th>';
	result += 			'<th class="card-stats-header">' + I18N.WISDOM 			+ spellcasting[4] + saving[4] + '</th>';
	result += 			'<th class="card-stats-header">' + I18N.CHARISMA 		+ spellcasting[5] + saving[5] + '</th>';
	result += 		'</tr>';
	result += 		'<tr>';
	result += 			'<td class="card-stats-cell">' + stats[0] + '</td>';
	result += 			'<td class="card-stats-cell">' + stats[1] + '</td>';
	result += 			'<td class="card-stats-cell">' + stats[2] + '</td>';
	result += 			'<td class="card-stats-cell">' + stats[3] + '</td>';
	result += 			'<td class="card-stats-cell">' + stats[4] + '</td>';
	result += 			'<td class="card-stats-cell">' + stats[5] + '</td>';
	result += 		'</tr>';
	result += 	'</tbody>';
	result += '</table>';
	result += '</div>';
	result += card_element_ruler(null, card_data, options);
	return result;
}

function card_element_header_spell(card_data, options) {
	var result = "";
	result += '<div class="card-title-inlineicon-container">';
	if (card_data.spell.level)
		result += '<div class="card-title-spellicon icon-spell-level-' + card_data.spell.level + '"></div>';
	else {
		var title_size = card_data.title_size || options.default.title_size || 'normal';
		var color = card_data_color_front(card_data, options);
		result += '<svg class="card-title-spell" height="1" width="100" viewbox="0 0 100 1" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg">';
		result += 	'<line x1="0" y1="0" x2="100" y2="0" stroke="white" stroke-dasharray="5,5" />';
		result += '</svg>';		
	}
	result += '</div>';
	result += '<div class="card-element card-subtitle card-spell-subtitle">' + card_data.spell.type + '</div>';
	return result;
}

function card_element_base_spell(card_data, options) {
	var color = card_data_color_front(card_data, options);
	var result = "";
	result += '<div class="card-spell-base">';
	result +=	'<div class="card-spell-base-texts">';
	result +=		'<div>';
	result += 			'<h4>' + I18N.CASTING_TIME + ':</h4>';
	result += 			'<p>' + card_data.spell.casting_time + '</p>';
	result +=		'</div>';
	result +=		'<div>';
	result += 			'<h4>' + I18N.RANGE + ':</h4>';
	result += 			'<p>' + card_data.spell.range + '</p>';
	result +=		'</div>';
	result +=		'<div>';
	result += 			'<h4>' + I18N.DURATION + ':</h4>';
	result += 			'<p>' + card_data.spell.duration + '</p>';
	result +=		'</div>';
	result +=	'</div>';
	result += 	'<div class="card-spell-components">';
	var colorStyle = 'style="invert(89%) sepia(57%) saturate(5177%) hue-rotate(353deg) brightness(87%) contrast(114%);"';
	result += 	'<span class="card-inlineicon icon-spell-verbal"' + (card_data.spell.verbal ? '' : ' style="opacity:0.4"') + '></span>';
	result += 	'<span class="card-inlineicon icon-spell-somatic"' + (card_data.spell.somatic ? '' : ' style="opacity:0.4"') + '></span>';
	result += 	'<span class="card-inlineicon icon-spell-material"' + (card_data.spell.materials ? '' : ' style="opacity:0.4"') + '></span>';
	if (card_data.spell.materials) {
		result += 	'<span class="card-inlineicon icon-custom-arrow-down"></span>';
		result += 	'<p class="card-spell-materials">' + card_data.spell.materials + '</p>';
	}
	result += 	'</div>';
	result += '</div>'
	result += card_element_ruler(null, card_data, options);
	return result;
}

function card_element_footer_spell(card_data, options) {
	var result = "";
	result += '<div class="card-spell-classes">';
	var classesKeys = Object.keys(I18N.CLASSES);
	for (var i = 0; i < classesKeys.length; i++) {
		var isForClass = card_data.spell.classes.search(new RegExp(I18N.CLASSES[classesKeys[i]], 'gi')) != -1;
		result += '<span class="card-class-inlineicon icon-class-' + classesKeys[i].toLowerCase() + (isForClass ? '' : ' card-class-hidden') + '""></span>';
	}
	result += '</div>';
	return result;
}


function card_element_inline_icon(params, card_data, options) {
	var icon = params[0] || "";
	var size = params[1] || "40";
	var align = params[2] || "center";
	var color = card_data_color_front(card_data, options);
	return '<div class="card-element card-inline-icon align-' + align + ' icon-' + icon + '" style="height:' + size + 'px;min-height:' + size + 'px;width:' + size + 'px;background-color:' + color + '"></div>';
}

function card_element_picture(params, card_data, options) {
	var url = params[0] || "";
	var height = params[1] || "";
	var width = params[2] || height || "";
	var color = card_data_color_front(card_data, options);
	return '<div class="card-element card-picture" style ="background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center;background-repeat: no-repeat;height:' + height + 'px;width:' + width + 'px;background-color: ' + color + '"></div>';
}

function card_element_ruler(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var fill = 'fill="' + color + '"';
	var stroke = 'stroke="' + color + '"';

	var result = "";
	result += '<svg class="card-ruler" height="1" width="100" viewbox="0 0 100 1" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg">';
	result += 	'<polyline points="0,0 100,0.5 0,1" ' + fill + '></polyline>';
	result += '</svg>';
	return result;
}

function card_element_fill(params, card_data, options) {
	var flex = params[0] || "1";
	return '<span class="card-fill" style="flex:' + flex + '"></span>';
}

function card_element_boxes(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var count = params[0] || 1;
	var size = params[1] || 3;
	var dash = params[2] === 'true' ? ' stroke-dasharray="10,10"' : "";
	var center = params[3] === 'true' ? 'text-align:center;' : "";

	var result = "";
	result += '<div class="card-element" style="' + center + '">';
	for (var i = 0; i < count; ++i) {
		result += '<svg class="card-box" height="100" width="100" viewbox="0 0 100 100" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg" style="width:' + size + 'em;height:' + size + 'em;">';
		result += 	'<rect x="0" y="0" width="100" height="100" fill="none" stroke="' + color + '"' + dash + '>';
		result += '</svg>';
	}
	result += '</div>';
	return result;
}

function card_element_property(params, card_data, options) {
	var result = "";
	result += '<div class="card-element card-property-line">';
	result += 	'<h4 class="card-property-name">' + params[0] + '.</h4>';
	result += 	'<p class="card-property-text">' + card_data_parse_icons_params(params[1]) + '</p>';
	if (params[2])
	{
		result += 	'<div style="float:right">';
		result += 		'<h4 class="card-property-name">' + params[2] + '.</h4>';
		result += 		'<p class="card-property-text">' + card_data_parse_icons_params(params[3]) + '</p>';
		result += 	'</div>';
	}
	result += '</div>';
	return result;
}

function card_element_description(params, card_data, options) {
	var result = "";
	result += 	'<p class="card-element card-description-text">' + params[0] + '</p>';
	return result;
}

function card_element_text(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<div class="card-element">';
	result += 	'<p>' + params[0] + '</p>';
	result += '</div>';
	return result;
}

function card_element_right(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<div class="card-element" style="text-align: right">';
	result += 	'<p>' + params[0] + '</p>';
	result += '</div>';
	return result;
}

function card_element_center(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<div class="card-element" style="text-align: center">';
	result += 	'<p>' + params[0] + '</p>';
	result += '</div>';
	return result;
}

function card_element_justify(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<div class="card-element" style="text-align: justify; hyphens: auto">';
	result += 	'<p>' + params[0] + '</p>';
	result += '</div>';
	return result;
}

function card_element_section(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var section = params[0] || "";
	return '<h3 class="card-section" style="color:' + color + '">' + section + '</h3>';
}

function card_element_bullet(params, card_data, options) {
	var result = "";
	result += '<ul class="card-element card-bullet-line">';
	result += 	'<li class="card-bullet">' + params[0] + '</li>';
	result += '</ul>';
	return result;
}

var card_table_previous_line_colored = true;
function card_element_table_header(params, card_data, options) {
	card_table_previous_line_colored = true;
	var result = "";
	result += '<table class="card-element card-table card-table-header" style="background-color:' + card_data_color_front(card_data, options) + '88;">';
	result += 	'<tr>';
	for (var i = 0; i < params.length; i++) {
		result += 		'<th>' + params[i] + '</th>';
	}
	result += 	'</tr>';
	result += '</table>';
	return result;
}

function card_element_table_line(params, card_data, options) {
	var result = "";
	if (card_table_previous_line_colored)
		result += '<table class="card-element card-table card-table-line">';
	else 
		result += '<table class="card-element card-table card-table-line" style="background-color:' + card_data_color_front(card_data, options) + '33;">';
	card_table_previous_line_colored = !card_table_previous_line_colored;
	result += 	'<tr>';
	for (var i = 0; i < params.length; i++) {
		result += 		'<td>' + params[i] + '</td>';
	}
	result += 	'</tr>';
	result += '</table>';
	return result;
}

function card_element_empty(params, card_data, options) {
	return '';
}

function card_element_unknown(params, card_data, options) {
	return '<div>Unknown element: ' + params.join('<br />') + '</div>';
}

function card_element_spells(params, card_data, options) {
	var result = "";
	result += '<div class="card-element card-spells-line">';
	if (params[0])
		result += 	'<h4 class="card-inlineicon icon-spell-caster-' + params[0] + '"></h4>';
	else
		result += 	'<h4 class="card-inlineicon icon-spell-caster"></h4>';
	result += 	'<p class="card-spells-ability">' + params[1] + '</p>';
	if (params.length == 3) {
			result += 	'<p class="card-spells-level"><span class="card-inlineicon icon-spell-level"></span></p>';
			result += 	'<p class="card-spells-list">' + params[2] + '</p>';
	} else {
		if (params[2]) {
			result += 	'<p class="card-spells-level"><span class="card-inlineicon icon-spell-level-0"></span></p>';
			result += 	'<p class="card-spells-list">' + params[2] + '</p>';   
		}
		var last = params.length - 1;
		for (var i = 1; i < 9; i++) {
			var level = 2 * i + 1;
			if (params[level] && params[level + 1]) {
				last = level + 2;

				result += 	'<p class="card-spells-level"><span class="card-inlineicon icon-spell-level-' + i + '"></span>(' + params[level] + ')</p>';
				result += 	'<p class="card-spells-list">' + params[level + 1] + '</p>';
			}
		}
		if (last > 2 && params[last])
			result += '<p class="card-spells-text">' + card_data_parse_icons_params(params[last]) + '</p>';
	}
	result += '</div>';
	return result;
}

function card_element_attack(params, card_data, options) {
	var result = "";
	result += '<div class="card-element card-attack-line">';
	result += 	'<h4 class="card-attack-name">' + params[0] + ':</h4>';
	result += 	'<p class="card-attack-hit">' + params[1] + ',</p>';
	result += 	'<p class="card-attack-damages">' + card_data_parse_icons_params(params[2]) + '</p>';
	result += '</div>';
	return result;
}

var card_element_generators = {
	icon: card_element_inline_icon,
	picture: card_element_picture,
	rule: card_element_ruler,
	ruler: card_element_ruler,
	fill: card_element_fill,
	boxes: card_element_boxes,
	property: card_element_property,
	description: card_element_description,
	text: card_element_text,
	right: card_element_right,
	center: card_element_center,
	justify: card_element_justify,
	section: card_element_section,
	bullet: card_element_bullet,
	table_header: card_element_table_header,
	table_line: card_element_table_line,
	disabled: card_element_empty,
	comment: card_element_empty,
	spells: card_element_spells,
	attack: card_element_attack,
};

// ============================================================================
// Card generating functions
// ============================================================================

function card_generate_contents(contents, card_data, options) {
	var result = "";
	result += contents.map(function (value) {
		var parts = card_data_split_params(value);
		var element_name = parts[0];
		var element_params = parts.splice(1);
		var element_generator = card_element_generators[element_name];
		if (element_generator) {
			return element_generator(element_params, card_data, options);
		} else if (element_name.length > 0) {
			return card_element_unknown(element_params, card_data, options);
		}
	}).join("\n");
	return result;
}

function card_generate_color_style(color, options) {
	return 'style="color:' + color + '; border-color:' + color + '; background-color:' + color + '"';
}

function card_generate_color_gradient_style(color, options) {
	return 'style="background: radial-gradient(ellipse at center, white 20%, ' + color + ' 120%)"';
}

function card_generate_front(card_data, options) {
	var color = card_data_color_front(card_data, options);
	var style_color = card_generate_color_style(color, options);

	var result = "";
	result += '<div class="card card-size-' + options.card_size + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + '">';
	result += 	'<div class="card-border" ' + style_color + '>';
	result += 		card_element_title(card_data, options);

	if (card_data.type == CardType.CREATURE) {
		result += 	card_element_header_creature(card_data, options);
		result += 	'<div class="card-content-container">';
		result += 		card_element_base_creature(card_data, options);
		if (card_data.creature.vulnerabilities)
			result += 	card_element_property([I18N.VULNERABILITIES, card_data.creature.vulnerabilities], card_data, options);
		if (card_data.creature.resistances)
			result += 	card_element_property([I18N.RESISTANCES, card_data.creature.resistances], card_data, options);
		if (card_data.creature.immunities)
			result += 	card_element_property([I18N.IMMUNITIES, card_data.creature.immunities], card_data, options);
	} 
	else if (card_data.type == CardType.ITEM) {
		result += 	card_element_icon(card_data, options);
		result += 	'<div class="card-content-container">';
		result += 		card_element_subtitle(card_data, options);
	} 
	else if (card_data.type == CardType.SPELL) {
		result += 	card_element_header_spell(card_data, options);
		result += 	'<div class="card-content-container">';
		result += 		card_element_base_spell(card_data, options);
	} 
	else if (card_data.type == CardType.POWER) {
		result += 	card_element_icon(card_data, options);
		result += 	'<div class="card-content-container">';
		result += 		card_element_subtitle(card_data, options);
	}
	 else {
		result += 	card_element_icon(card_data, options);
		result += 	'<div class="card-content-container">';
		result += 		card_element_subtitle(card_data, options);
	}

	result += 			card_generate_contents(card_data.contents, card_data, options);
	result += 		'</div>';
	result += 	'</div>';

	if (card_data.type == CardType.SPELL) {
		result += card_element_footer_spell(card_data, options);
	}

	if (card_data.reference)
		result += '<p class="card-reference">' + card_data.reference + '</p>';
	result += '</div>';
	return result;
}

function card_generate_back(card_data, options) {
	var color = card_data_color_back(card_data, options);
	var style_color = card_generate_color_style(color, options);
	var url = card_data.background_image;
	var description = card_data.description;
	var back_color = options.background_color || color;
	var background_style = "";
	if (description) {
		background_style = card_generate_color_gradient_style(back_color, options);
	} else if (url) {
		background_style = 'style = "background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center; background-repeat: no-repeat;"';
	} else {
		background_style = card_generate_color_gradient_style(back_color, options);
	}

	var result = "";
	result += '<div class="card card-size-' + options.card_size + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + '">';
	result += 	'<div class="card-border" ' + style_color + '>';
	result += 		'<div class="card-back" ' + background_style + '>';
	if (description) {
		result += 	'<div class="card-back-inner card-back-inner-description" style="background: radial-gradient(ellipse at center, #fff 85%, #ddd 94%, ' + back_color + ' 98%);">';
		result += 		'<div class="card-back-description" style="background-image: -webkit-linear-gradient(top, ' + back_color + ', transparent), -webkit-linear-gradient(right, ' + back_color + ', transparent), -webkit-linear-gradient(bottom, ' + back_color + ', transparent), -webkit-linear-gradient(left, ' + back_color + ', transparent);';
		result += 		'background-size: 100% 1mm, 1mm 100%, 100% 1mm, 1mm 100%; background-position: 0 0, 100% 0, 0 100%, 0 0; background-repeat: no-repeat;">';
		result +=			card_element_title(card_data, options);
		result += 			'<p class="card-back-description-text">' + description + '</p>';
		result += 		'</div>';
		result += 	'</div>';
	} else if (!url) {
		var icon = 	card_data_icon_back(card_data, options);
		result += 	'<div class="card-back-inner">';
		result += 		'<div class="card-back-icon icon-' + icon + '" ' + style_color + '></div>';
		result += 	'</div>';
	}
	result += 		'</div>';
	result += 	'</div>';
	result += '</div>';

	return result;
}

function card_generate_empty(options) {
	var style_color = card_generate_color_style("white");

	var result = "";
	result += '<div class="card card-size-' + options.card_size + '" ' + style_color + '>';
	result += '</div>';
	return result;
}

// ============================================================================
// Functions that generate pages of cards
// ============================================================================

function card_repeat(card, count) {
	var result = [];
	for (var i = 0; i < count; ++i) {
		result.push(card);
	}
	return result;
}

function card_pages_split(data, rows, cols) {
	var cards_per_page = rows * cols;
	var result = [];
	for (var i = 0; i < data.length; i += cards_per_page) {
		var page = data.slice(i, i + cards_per_page);
		result.push(page);
	}
	return result;
}

function card_pages_merge(front_pages, back_pages) {
	var result = [];
	for (var i = 0; i < front_pages.length; ++i) {
		result.push(front_pages[i]);
		result.push(back_pages[i]);
	}
	return result;
}

function card_pages_flip_left_right(cards, rows, cols) {
	var result = [];
	for (var r = 0; r < rows; ++r) {
		for (var c = 0; c < cols; ++c) {
			var i = r*cols + (cols-1-c);
			result.push(cards[i]);
		}
	}
	return result;
}

function card_pages_add_padding(cards, options) {
	var cards_per_page = options.page_rows * options.page_columns;
	var last_page_cards = cards.length % cards_per_page;
	if (last_page_cards !== 0) {
		return cards.concat(card_repeat(card_generate_empty(options), cards_per_page - last_page_cards));
	} else {
		return cards;
	}
}

function card_pages_interleave_cards(front_cards, back_cards, options) {
	var result = [];
	var i = 0;
	while (i < front_cards.length) {
		result.push(front_cards[i]);
		result.push(back_cards[i]);
		if (options.page_columns > 2) {
			result.push(card_repeat(card_generate_empty(options), options.page_columns - 2));
		}
		++i;
	}
	return result;
}

function card_pages_wrap(pages, options) {
	var size = options.page_size || "A4";

	var result = "";
	for (var i = 0; i < pages.length; ++i) {
		var style = "";
		if ((options.card_arrangement === "doublesided") &&  (i % 2 === 1)) {
			style += 'style="background-color:white"';
		} else {
			style += 'style="background-color:white"';
		}
		result += '<page class="page page-preview" size="' + size + '" ' + style + '>\n';
		result += pages[i].join("\n");
		result += '</page>\n';
	}
	return result;
}

function card_pages_generate_style(options) {
	var size = "a4";
	switch (options.page_size) {
		case "A3": size = "A3 portrait"; break;
		case "A4": size = "210mm 297mm"; break;
		case "A5": size = "A5 portrait"; break;
		case "Letter": size = "letter portrait"; break;
		case "25x35": size = "2.5in 3.5in"; break;
		default: size = "auto";
	}

	var result = "";
	result += "<style>\n";
	result += "@page {\n";
	result += "    margin: 0;\n";
	result += "    size:" + size + ";\n";
	result += "    -webkit-print-color-adjust: exact;\n";
	result += "}\n";
	result += "</style>\n";
	return result;
}

function card_pages_generate_html(card_data, options) {
	options = options || card_default_options();
	var rows = options.page_rows || 3;
	var cols = options.page_columns || 3;

	// Generate the HTML for each card
	var front_cards = [];
	var back_cards = [];
	card_data.forEach(function (data) {
		var count = options.card_count || data.count || 1;
		var front = card_generate_front(data, options);
		var back = card_generate_back(data, options);
		front_cards = front_cards.concat(card_repeat(front, count));
		back_cards = back_cards.concat(card_repeat(back, count));
	});

	var pages = [];
	if (options.card_arrangement === "doublesided") {
		// Add padding cards so that the last page is full of cards
		front_cards = card_pages_add_padding(front_cards, options);
		back_cards = card_pages_add_padding(back_cards, options);

		// Split cards to pages
		var front_pages = card_pages_split(front_cards, rows, cols);
		var back_pages = card_pages_split(back_cards, rows, cols);

		// Shuffle back cards so that they line up with their corresponding front cards
		back_pages = back_pages.map(function (page) {
			return card_pages_flip_left_right(page, rows, cols);
		});

		// Interleave front and back pages so that we can print double-sided
		pages = card_pages_merge(front_pages, back_pages);
	} else if (options.card_arrangement === "front_only") {
		var cards = card_pages_add_padding(front_cards, options);
		pages = card_pages_split(cards, rows, cols);
	} else if (options.card_arrangement === "side_by_side") {
		var cards = card_pages_interleave_cards(front_cards, back_cards, options);
		cards = card_pages_add_padding(cards, options);
		pages = card_pages_split(cards, rows, cols);
	}

	// Wrap all pages in a <page> element and add CSS for the page size
	var result = "";
	result += card_pages_generate_style(options);
	result += card_pages_wrap(pages, options);

	return result;
}

function card_pages_insert_into(card_data, container) {
	// Clear the previous content of the document
	while (container.hasChildNodes()) {
		container.removeChild(container.lastChild);
	}

	// Insert the HTML
	var html = card_pages_generate_html(card_data);
	container.innerHTML = html;
}