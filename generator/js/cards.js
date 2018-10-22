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
	data.vulnerabilities = data.vulnerabilities || "";
	data.resistances = data.resistances || "";
	data.immunities = data.immunities || "";
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


function card_create_lexicals() {
	var cards = [];
	
	// Picto
	var card = {};
	card_init(card);
	card.title = I18N.PICTO;
	card.contents = [];
	for (var i = 0; i < I18N.DAMAGE_TYPES.length; i++) {
		var line = "property | " + I18N.DAMAGE_TYPES[i].name + " | " + I18N.DAMAGE_TYPES[i].name;
		if (i < I18N.DAMAGE_TYPES.length - 1) {
			i++;
			line += " | property | " + I18N.DAMAGE_TYPES[i].name + " | " + I18N.DAMAGE_TYPES[i].name;
		}
		card.contents.push(line);
	}
	card.contents.push("ruler");
	for (var i = 0; i < I18N.CONDITION.length; i++) {
		var line = "property | " + I18N.CONDITION[i].name + " | " + I18N.CONDITION[i].name;
		if (i < I18N.CONDITION.length - 1) {
			i++;
			line += " | property | " + I18N.CONDITION[i].name + " | " + I18N.CONDITION[i].name;
		}
		card.contents.push(line);
	}
	card.contents.push("ruler");
	for (var i = 0; i < I18N.CUSTOM.length; i++) {
		var line = "property | " + I18N.CUSTOM[i].name + " | " + I18N.CUSTOM[i].name;
		if (i < I18N.CUSTOM.length - 1) {
			i++;
			line += " | property | " + I18N.CUSTOM[i].name + " | " + I18N.CUSTOM[i].name;
		}
		card.contents.push(line);
	}
	cards.push(card);

	// Lexical
	card = {};
	card_init(card);
	card.title = I18N.LEXICAL;
	card.contents = [];
	for (var i = 0; i < I18N.ABREVIATIONS.length; i++) {
		var line = "property | " + I18N.ABREVIATIONS[i].name + " | " + I18N.ABREVIATIONS[i].meaning;
		card.contents.push(line);
	}
	cards.push(card);

	return cards;
}


function card_init(card) {
	card.title = card.title || "";
	if (card.type == CardType.CREATURE) {
		if (card.subtitle)
			delete card.subtitle;
		card.creature = card_creature_default_data(card.creature);
		card.color = card.color || "#000000";
	} else if (card.type == CardType.ITEM) {
		card.item = card_item_default_data(card.item);
		card.color = card.color || "#696969";
		card.icon = card.icon || "swap-bag";
	} else if (card.type == CardType.SPELL) {
		card.spell = card_spell_default_data(card.spell);
		card.color = card.color || "#800000";
		card.icon = card.icon || "magic-swirl";
	} else if (card.type == CardType.POWER) {
		card.power = card_power_default_data(card.power);
		card.color = card.color || "#2F4F4F";
		card.icon = card.icon || "";
	} else {
		card.color = card.color || "#A9A9A9";
	}
	card.contents = card.contents || [];
	card.compact = card.compact || false;
	card_update(card);
}

// Remove this function when format is sure
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
		var cr = card.creature.cr;
		if (cr === "1/8") {
			cr = 1 / 8;
			card.creature.xp = 25;
		} else if (cr === "1/4") {
			cr = 1 / 4;
			card.creature.xp = 50;
		} else if (cr === "1/2") {
			cr = 1 / 2;
			card.creature.xp = 100;
		} else
			card.creature.xp = pxByCR[cr];
		card.creature.proficiency = Math.floor(cr / 4) + 2;
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

function card_data_parse_icons_params(value) {
	if (!value)
		return value;
	for (var i = 0; i < I18N.DAMAGE_TYPES.length; i++)
		value = value.replace(I18N.DAMAGE_TYPES[i].regex, '$1<span class="card-inlineicon icon-type-' + I18N.DAMAGE_TYPES[i].file + '"></span>');
	for (var i = 0; i < I18N.CONDITION.length; i++)
		value = value.replace(I18N.CONDITION[i].regex, '$1<span class="card-inlineicon icon-condition-' + I18N.CONDITION[i].file + '"></span>');
	for (var i = 0; i < I18N.CUSTOM.length; i++)
		value = value.replace(I18N.CUSTOM[i].regex, '$1<span class="card-inlineicon icon-custom-' + I18N.CUSTOM[i].file + '"></span>$2');
	return value
		.replace(/\\/gi, '')
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
	result += '<div class="card-subtitle card-creature-subtitle">' + card_data.creature.type + ", taille " + card_data.creature.size;
	if (card_data.creature.alignment)
		result += '<div style="float:right">' + card_data.creature.alignment + '</div>';
	result += '</div>';
	return result;
}

function card_element_base_creature(card_data, options) {
	var result = "";
	result += '<div class="card-creature-base">';
	result += '<div class="card-creature-base-element">';
	result += 	'<h4 class="card-inlineicon icon-custom-ac"></h4>';
	result += 	'<p class="card-property-text">' + card_data.creature.ac + '</p>';
	result += 	'<div class="card-creature-base-element">';
	result += 		'<h4 class="card-property-name">' + I18N.PERCEPTION + '.</h4>';
	result += 		'<p class="card-property-text">' + card_data.creature.perception + '</p>';
	result += 	'</div>';
	result += '</div>';
	result += '<div class="card-creature-base-element">';
	result += 	'<h4 class="card-inlineicon icon-custom-hp"></h4>';
	result += 	'<p class="card-property-text">' + card_data.creature.hp + '</p>';
	result += 	'<div class="card-creature-base-element">';
	result += 		'<h4 class="card-property-name">' + I18N.SPEED + '.</h4>';
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
		} else
			spellcasting[i] = '<span class="card-stats-header-spellcasting" style="opacity:0.2;">☆</span>'; 

		if (stats[i].includes("S")) {
			stats[i] = stats[i].replace("S", "");
			saving[i] = '<span class="card-stats-header-saving">●</span>';
		} else
			saving[i] = '<span class="card-stats-header-saving" style="font-size:17px;opacity:0.25;">◦</span>';//○

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
	result += '</div>'; // card-creature-base
	result += card_element_ruler(null, card_data, options);
	return result;
}

function card_element_header_spell(card_data, options) {
	var result = "";
	result += '<div class="card-title-inlineicon-container">';
	if (card_data.spell.level)
		result += '<div class="card-title-spellicon icon-spell-level_' + card_data.spell.level + '"></div>';
	result += '</div>';
	result += '<div class="card-subtitle card-spell-subtitle">' + card_data.spell.type + '</div>';
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
	if (card_data.spell.ritual)
		result += 	'<p class="card-spell-ritual">' + I18N.RITUAL + '</p>';
	result += 	'<div class="card-spell-components">';
	// var colorStyle = 'filter:sepia(1) hue-rotate(86deg) saturate(10) brightness(0.7);';
	result += 		'<span class="card-inlineicon icon-spell-verbal" style="' + (card_data.spell.verbal ? '' : 'opacity:0.4;') + '"></span>';
	result += 		'<span class="card-inlineicon icon-spell-somatic" style="' + (card_data.spell.somatic ? '' : 'opacity:0.4;') + '"></span>';
	result += 		'<span class="card-inlineicon icon-spell-material" style="' + (card_data.spell.materials ? '' : 'opacity:0.4;margin-right:10px;') + '"></span>';
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
	var result = '';
	result += '<div class="card-element card-inline-icon align-' + align + '">';
	result += '<span class="icon-' + icon + '" style="height:' + size + 'px;min-height:' + size + 'px;width:' + size + 'px;background-color:' + color + ';display:inline-block;"></span>';
	result += '</div>';
	return result;
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

function card_element_margin(params, card_data, options) {
	var height = params[0] || "1";
	return '<span style="height:' + height + 'px"></span>';
}

function card_element_boxes(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var count = params[0] || 1;
	var size = params[1] || 1;
	var styleSvg = 'width:' + size + 'em;min-width:' + size + 'em;height:' + size + 'em;';
	var styleDash = '';
	var styleInnerRect = '';
	var align = '';
	var double = false;
	if (params[2]) {
		if (params[2].indexOf("dash") > -1) {
			styleDash = 'stroke-dasharray:11,14;stroke-dashoffset:5.5;opacity:0.5;';
			styleInnerRect = 'stroke-dasharray:11,13;stroke-dashoffset:5.5;opacity:0.5;';
		}
		if (params[2].indexOf("center") > -1)
			align = 'text-align:center;';
		else if (params[2].indexOf("right") > -1)
			align = 'text-align:right;';
		double = params[2].indexOf("double") > -1;
	}

	var nextParamsNotBoxes = params[3] && params[3] != "boxes";
	if (nextParamsNotBoxes)
		styleSvg += 'top:1px;';

	var result = '';
	result += '<div class="card-element" style="' + align + (nextParamsNotBoxes ? 'display:flex;flex-direction:row;' : '') + '">';
	if (double) {
		for (var i = 0; i < count; ++i) {
			result += '<svg class="card-box" viewbox="-4 -4 108 108" preserveaspectratio="none" style="' + styleSvg + '" xmlns="http://www.w3.org/2000/svg">';
			result += '<rect x="0" y="0" width="100" height="100" fill="none" style="' + styleDash + ';stroke-width:8;stroke:' + color + '"></rect>';
			result += '<rect x="14" y="14" width="72" height="72" fill="none" style="' + styleInnerRect + ';stroke-width:6;stroke:' + color + '"></rect>';
			result += '</svg>';
		}
	} else {
		for (var i = 0; i < count; ++i) {
			result += '<svg class="card-box" viewbox="-4 -4 108 108" preserveaspectratio="none" style="' + styleSvg + '" xmlns="http://www.w3.org/2000/svg">';
			result += '<rect x="0" y="0" width="100" height="100" fill="none" style="' + styleDash + ';stroke-width:8;stroke:' + color + '"></rect>';
			result += '</svg>';
		}
	}
	if (params[3]) {
		result += card_generate_element(params.splice(3), card_data, options);
	}
	result += '</div>';
	return result;
}

function card_element_circles(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var count = params[0] || 1;
	var size = params[1] || 1;
	var styleSvg = 'width:' + size + 'em;min-width:' + size + 'em;height:' + size + 'em;';
	var styleDash = '';
	var align = '';
	if (params[2]) {
		if (params[2].indexOf("dash") > -1)
			styleDash = 'stroke-dasharray:11,14;stroke-dashoffset:5.5;opacity:0.5;';
		if (params[2].indexOf("center") > -1)
			align = 'text-align:center;';
		else if (params[2].indexOf("right") > -1)
			align = 'text-align:right;';
	}

	var nextParamsNotBoxes = params[3] && params[3] != "boxes";
	if (nextParamsNotBoxes)
		styleSvg += 'top:1px;';

	var result = '';
	result += '<div class="card-element" style="' + align + (nextParamsNotBoxes ? 'display:flex;flex-direction:row;' : '') + '">';
	for (var i = 0; i < count; ++i) {
		result += '<svg class="card-box" viewbox="-2 -2 104 104" preserveaspectratio="none" style="' + styleSvg + '" xmlns="http://www.w3.org/2000/svg">';
		result += '<circle cx="50" cy="50" r="50" width="100" height="100" fill="none" style="' + styleDash + ';stroke-width:4;stroke:' + color + '"></circle>';
		result += '</svg>';
	}
	if (params[3]) {
		result += card_generate_element(params.splice(3), card_data, options);
	}
	result += '</div>';
	return result;
}

function card_element_property(params, card_data, options) {
	var result = "";
	if (params[2])
		result += '<div class="card-element card-property-line" style="display:flex;flex-direction:row;">';
	else
		result += '<div class="card-element card-property-line">';
	result += 	'<h4 class="card-property-name">' + params[0] + '.</h4>';
	result += 	'<p class="card-property-text">' + (params[1] ? card_data_parse_icons_params(params[1]) : '') + '</p>';
	if (params[2]) {
		result += card_generate_element(params.splice(2), card_data, options);
	}
	result += '</div>';
	return result;
}

function card_element_description(params, card_data, options) {
	var result = "";
	result += '<p class="card-element card-description-text">' + params[0] + '</p>';
	return result;
}

function card_element_text(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<p class="card-element">';
	result += 	params[0];
	result += '</p>';
	return result;
}

function card_element_right(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<p class="card-element" style="text-align:right">';
	result += 	params[0];
	result += '</p>';
	return result;
}

function card_element_center(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<p class="card-element" style="text-align:center">';
	result += 	params[0];
	result += '</p>';
	return result;
}

function card_element_justify(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
	var result = "";
	result += '<p class="card-element" style="text-align:justify;hyphens:auto">';
	result += 	params[0];
	result += '</p>';
	return result;
}

function card_element_section(params, card_data, options) {
	var color = card_data_color_front(card_data, options);
	var result = '';
	result += '<div class="card-section">';
	result += 	'<h3 style="color:' + color + '">' + params[0] + '</h3>';
	if (params[1]) {
		result += card_generate_element(params.splice(1), card_data, options);
	}
	result += '</div>';
	return result;
}

function card_element_bullet(params, card_data, options) {
	if (params[1] === 'true')
		params[0] = card_data_parse_icons_params(params[0]);
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

function card_element_table_line_center(params, card_data, options) {
	var result = "";
	if (card_table_previous_line_colored)
		result += '<table class="card-element card-table card-table-line" style="text-align:center;">';
	else
		result += '<table class="card-element card-table card-table-line" style="background-color:' + card_data_color_front(card_data, options) + '33;text-align:center;">';
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
		result += 	'<h4 class="card-inlineicon icon-spell-caster_' + params[0] + '"></h4>';
	else
		result += 	'<h4 class="card-inlineicon icon-spell-caster"></h4>';
	result += 	'<p class="card-spells-ability">' + params[1] + '</p>';
	if (params.length == 3) {
		result += 	'<p class="card-spells-level"><span class="card-inlineicon icon-spell-level"></span></p>';
		result += 	'<p class="card-spells-list">' + params[2] + '</p>';
	} else {
		if (params[2]) {
			result += 	'<p class="card-spells-level"><span class="card-inlineicon icon-spell-level_0"></span></p>';
			result += 	'<p class="card-spells-list">' + params[2] + '</p>';   
		}
		var last = params.length - 1;
		for (var i = 1; i < 9; i++) {
			var level = 2 * i + 1;
			if (params[level] && params[level + 1]) {
				last = level + 2;

				result += '<p class="card-spells-level"><span class="card-inlineicon icon-spell-level_' + i + '"></span>(' + params[level] + ')</p>';
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
	margin: card_element_margin,
	boxes: card_element_boxes,
	circles: card_element_circles,
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
	table_line_c: card_element_table_line_center,
	disabled: card_element_empty,
	comment: card_element_empty,
	spells: card_element_spells,
	attack: card_element_attack,
};

// ============================================================================
// Card generating functions
// ============================================================================

function card_generate_element(parts, card_data, options) {
	var element_name = parts[0];
	var element_params = parts.splice(1);
	var element_generator = card_element_generators[element_name];
	if (element_generator) {
		return element_generator(element_params, card_data, options);
	} else if (element_name.length > 0) {
		return card_element_unknown(element_params, card_data, options);
	}
}

function card_generate_contents(contents, card_data, options) {
	card_table_previous_line_colored = true;
	var result = "";
	result += contents.map(function (value) {
		var parts = card_data_split_params(value);
		return card_generate_element(parts, card_data, options);
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
	result += '<div class="card card-size-' + options.card_size + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + ' ' + (card_data.compact ? 'card-compact' : '') + '">';
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
