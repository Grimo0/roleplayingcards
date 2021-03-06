// (?: ?=.)? to remove space if not in front of a dot
// [ ]? to remove a space

export const I18N = {
	CLASSES: {
		BARBARIAN: 'Barbare',
		BARD: 'Barde',
		CLERIC: 'Clerc',
		DRUID: 'Druide',
		FIGHTER: 'Guerrier',
		MONK: 'Moine',
		PALADIN: 'Paladin',
		RANGER: 'Rôdeur',
		ROGUE: 'Voleur',
		SORCERER: 'Ensorceleur',
		WARLOCK: 'Sorcier',
		WIZARD: 'Mage',
		SCHOLAR: 'Lettré'
	},

	CREATURE: {
		CR: 'FP',
		AC: 'CA',
		HP: 'PV',
		PERCEPTION: 'Perception',
		SPEED: 'VD',
		RESISTANCES: 'Résistances',
		VULNERABILITIES: 'Vulnérabilités',
		IMMUNITIES: 'Immunités',

		STRENGTH: 'FOR',
		DEXTERITY: 'DEX',
		CONSTITUTION: 'CON',
		INTELLIGENCE: 'INT',
		WISDOM: 'SAG',
		CHARISMA: 'CHA',

		MAGICAL_CARAC: 'CM',
		SAVING_THROW: 'JS',

		ALIGNMENTS: {
			UNALIGNED: 'Sans alignement',
			ANY_ALIGNMENT: 'Tout alignement',
			GOOD: 'Bon',
			BAD: 'Mauvais',
			NEUTRAL: 'Neutre',
			NEUTRAL_GOOD: 'Neutre bon',
			NEUTRAL_EVIL: 'Neutre mauvais',
			CHAOTIC: 'Chaotique',
			CHAOTIC_NEUTRAL: 'Chaotique neutre',
			CHAOTIC_GOOD: 'Chaotique bon',
			CHAOTIC_EVIL: 'Chaotique mauvais',
			LOYAL: 'Loyal',
			LOYAL_NEUTRAL: 'Loyal neutre',
			LOYAL_GOOD: 'Loyal bon',
			LOYAL_EVIL: 'Loyal mauvais'
		}
	},

	SPELL: {
		LEVEL: 'Niveau',
		CASTING_TIME: 'Incantation',
		RANGE: 'Portée',
		DURATION: 'Durée',
		RITUAL: 'Rituel',
		MATERIALS: 'Matériaux',
		VERBAL: 'Verbal',
		SOMATIC: 'Gestuel',
	
		SPELL_TYPES: {
			CONJURATION: 'Abjuration',
			DIVINATION: 'Divination',
			ENCHANTMENT: 'Enchantement',
			EVOCATION: 'Évocation',
			ILLUSION: 'Illusion',
			NECROMANCY: 'Nécromancie',
			SUMMONING: 'Invocation',
			TRANSMUTATION: 'Transmutation'
		},

		AT_HIGHER_LEVELS: 'Aux niveaux supérieurs'
	},

	DAMAGE_TYPES: [
		{
			file: 'physical_not_magical', name: 'physique non magique',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}physique[s]? non magique[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'bludgeoning', name: 'contondant',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}contondant[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'piercing', name: 'perforant',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}perforant[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'slashing', name: 'tranchant',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}tranchant[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'fire', name: 'feu',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}feu[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'ice', name: 'froid',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}froid[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'lightning', name: 'foudre',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}foudre[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'acid', name: 'acide',
			regex: new RegExp('(?:([ ([0-9]| |[\'’])|^){1}acide[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'poison', name: 'poison',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}poison[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'necrotic', name: 'nécrotique',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}nécrotique[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'thunder', name: 'tonnerre',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}tonnerre[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'force', name: 'force',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}force[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'psychic', name: 'psychique',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}psychique[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'radiant', name: 'radiant',
			regex: new RegExp('(?:([ ([0-9]| )|^){1}radiant[s]?([^a-zA-Z]{1}|$)', 'gi')
		}
	],
	CONDITION: [
		{
			file: 'blinded', name: 'aveuglé',
			regex: new RegExp('([ ([>\']|^){1}aveuglé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'charmed', name: 'charmé',
			regex: new RegExp('([ ([>]|^){1}charmé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'deafened', name: 'assourdi',
			regex: new RegExp('([ ([>\']|^){1}assourdi[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'exhaustion', name: 'épuisé',
			regex: new RegExp('([ ([>\']|^){1}épuisé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'frightened', name: 'effrayé',
			regex: new RegExp('([ ([>\']|^){1}effrayé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'grappled', name: 'agrippé',
			regex: new RegExp('([ ([>\']|^){1}agrippé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'incapacitated', name: 'neutralisé',
			regex: new RegExp('([ ([>]|^){1}neutralisé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'invisible', name: 'invisible',
			regex: new RegExp('([ ([>\']|^){1}invisible[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'paralyzed', name: 'paralysé',
			regex: new RegExp('([ ([>]|^){1}paralysé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'petrified', name: 'pétrifié',
			regex: new RegExp('([ ([>]|^){1}pétrifié[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'poisoned', name: 'empoisonné',
			regex: new RegExp('([ ([>\']|^){1}empoisonné[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'prone', name: 'à terre',
			regex: new RegExp('([ ([>]|^){1}à terre[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'restrained', name: 'entravé',
			regex: new RegExp('([ ([>\']|^){1}entravé[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'stunned', name: 'étourdi',
			regex: new RegExp('([ ([>\']|^){1}étourdi[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			file: 'unconscious', name: 'inconscient',
			regex: new RegExp('([ ([>\']|^){1}inconscient[e]?[s]?([^a-zA-Z]{1}|$)', 'gi')
		}
	],

	FAIL: 'Échec',
	SUCCESS: 'Réussite',

	CUSTOM_ICONS: [
		{
			file: 'creature', name: 'créature',
			regex: new RegExp('(?:([([>])|^| ){1}cr[ée]ature[s]?[ ]?([^a-zA-Z]?|$)', 'gi')
		}, {
			file: 'ac', name: 'CA',
			regex: new RegExp('(?:([ ([>0-9])|^){1}CA([^a-zA-Z]|$)', 'gi')
		}, {
			file: 'hp', name: 'PV temporaire',
			regex: new RegExp('(?:([ ([>0-9])|^){1}PV[s]? temporaire[s]?([^a-zA-Z]|$)', 'gi')
		}, {
			file: 'hp', name: 'PV',
			regex: new RegExp('(?:([ ([>0-9])|^){1}PV[s]?([^a-zA-Z]|$)', 'gi')
		}, {
			file: 'gp', name: 'PO',
			regex: new RegExp('(?:([([>])|^| ){1}po[s]?([^a-zA-Z]|$)', 'gi')
		}, {
			file: 'action_bonus', name: 'action bonus',
			regex: new RegExp('(?:([ ([>])|^){1}action[s]? bonus(?: ?=.)?([^a-zA-Z]?|$)', 'gi')
		}, {
			file: 'action', name: 'action',
			regex: new RegExp('(?:([ ([>])|^){1}action[s]?(?: ?=.)?([^a-zA-Z]?|$)', 'gi')
		}
	],

	ABREVIATIONS: [
		{
			name: 'JS', meaning: 'Jet de sauvegarde',
			regex: new RegExp('((?:[([>])|^| ){1}(JS)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'JA', meaning: 'Jet d\'attaque',
			regex: new RegExp('((?:[([>])|^| ){1}(JA)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'JC', meaning: 'Jet de caractéristique',
			regex: new RegExp('((?:[([>])|^| ){1}(JC)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'CA', meaning: 'Classe d\'armure',
			regex: new RegExp('((?:[([>])|^| ){1}(CA)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'VD', meaning: 'Vitesse de déplacement',
			regex: new RegExp('((?:[([>])|^| ){1}(VD)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'PP', meaning: 'Perception passive',
			regex: new RegExp('((?:[([>])|^| ){1}(pp)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'CM', meaning: 'Caractéristique magique',
			regex: new RegExp('((?:[([>])|^| ){1}(CM)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'av', meaning: 'Avantage (sur 2d20, garder le meilleur)',
			regex: new RegExp('((?:[([>])|^| ){1}(av)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'dav', meaning: 'Désavantage (sur 2d20, garder le moins bon)',
			regex: new RegExp('((?:[([>])|^| ){1}(dav)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'FP', meaning: 'Facteur de puissance',
			regex: new RegExp('((?:[([>])|^| ){1}(FP)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}, {
			name: 'DD', meaning: 'Degré de difficulté',
			regex: new RegExp('((?:[([>])|^| ){1}(DD)[ ]?([^a-zA-Z]{1}|$)', 'g')
		}
	],

	COMMON_RULES: [
		{
			name: 'Obstacles', meaning: 'Le sort est capable de pénétrer la plupart des \\obstacles, mais 90 cm de bois ou de terre, 30 cm de pierre, 2,5 cm de la plupart des métaux ou une mince feuille de plomb le bloquent. Les frontières éthérées (cf. chapitre « Utiliser la magie ») peuvent mettre le sort en échec.',
			regex: new RegExp('((?:[([>\'])|^| ){1}(obstacles)[ ]?([^a-zA-Z]{1}|$)', 'gi')
		}, {
			name: 'Arrêt', meaning: 'Par défaut, un sort ayant une durée de plus d\'un round peut être interrompu par le lanceur au prix d\'une action.',
			regex: null
		}
	],

	PICTO: 'Picto',
	ABREVIATIONS_TITLE: 'Lexique',
	COMMON_RULES_TITLE: 'Règles courantes',

	UI: {
		HELP: 'Aide',
		LANGUAGE: 'Langage',
		LOCAL_LANGUAGE: 'Français',
		DECKS_LIST: 'Decks',
		SORT: 'Trier',
		FILTER: 'Filtrer',
		SAMPLE: 'Exemples',
		LEXICAL: 'Lexique',
		IMPORT: 'Charger',
		SAVE: 'Enregistrer',
		GENERATE: 'Générer',
		LOAD_ALL: 'Charger rpc',
		SAVE_ALL: 'Enregistrer rpc',
		GENERATE_ALL: 'Générer tout',
		FILE: 'Fichier',
		DECK_SETTINGS: 'Paramètres',
		DECK_NAME: 'Nom',
		PAGE: 'Page',
		CARDS_PAGE: 'Cartes/page',
		ROWS: 'Lignes',
		COLUMNS: 'Colonnes',
		CARD: 'Carte',
		CARDS: 'Cartes',
		DOUBLESIDED: 'Recto+Verso',
		FRONT_ONLY: 'Recto',
		SIDE_BY_SIDE: 'Côte à côte',
		ROUND_CORNERS: 'Bords arrondis',
		SMALL_ICONS: 'Petites icônes',
		SPELL_CLASSES: 'Classes du sort',
		COUNT: 'Compte',
		DEFAULT_VALUES: 'Valeur par défaut',
		GENERIC: 'Generique',
		CREATURE: 'Créature',
		ITEM: 'Objet',
		SPELL: 'Sort',
		POWER: 'Abilité',
		CONTENT: 'Contenu',
		FRONT: 'Recto',
		BACK: 'Verso',
		COLOR: 'Couleur',
		ICON_NAME: 'Nom d\'icône',
		UNIQUE: 'unique',
		DELETE: 'Suppr',
		COPY: 'Copier',
		MOVE_TO: 'Déplacer',
		NEW: 'Nouveau',
		TITLE: 'Titre',
		MULTILINE: 'sur 2 lignes',
		SUBTITLE: 'Sous-titre',
		FRONT_ICON: 'Icône recto',
		DEFAULT: 'Défaut',
		BACK_ICON: 'Icône verso',
		SAME_AS_FRONT: 'Comme le recto',
		BACKGROUND: 'Image de fond',
		BACK_DESCRIPTION: 'Description verso',
		SIZE: 'Taille',
		ALIGNMENT: 'Alignement',
		TYPE: 'Type',
		CONTENTS: 'Contenus',
		CLASSES: 'Classes',
		TAGS: 'Tags',
		REFERENCE: 'Reférence',
		COMPACT: 'Compacte',
		OK: 'Ok',
		CANCEL: 'Annuler',
	
		PROJECT_TITLE: 'RPG Deck',
		PROJECT_DESCRIPTION: [
			'<p>Certains jeux sont protégés par copyright. Même si certains éléments comme les objets, les sorts, sont accessibles gratuitement, <b>vérifiez que vous disposez du droit de les redistribuer</b> avant de les partager.</p>',
			'<h2>État du projet</h2>',
			'<p>Ce site est toujours en cours de dévelopement. Si vous trouvez un bug ou souhaitez voir implémenter un nouvel élément vous pouvez poster sur la page du <a href="https://github.com/grimo0/rpg-deck/issues">projet Github</a> ou m\'envoyer un mp <a href="https://twitter.com/Grimo_">@Grimo_</a>.</p>',
			'<h2>Usage</h2>',
			'<p>Pour utiliser ce générateur vous pouvez démarrer avec le deck d\'<i>Exemples</i>. Vous pouvez aussi en créer un <i>Nouveau</i> et ajouter des cartes manuellement. Quand vous voulez imprimer votre deck, cliquez sur <i>Générer</i>.</p>'
		],
		CONTENTS_ELEMENTS_DESCRIPTION: [
			'<h2>Balises de contenus</h2>',
			'<p>À placer dans la zone de <i>Contenus</i> de la manière suivante : <code><b>balise</b> | <i>param1</i> | param2</code>. Les paramètres en italiques sont à remplacer et les autres à laisser tel quel.</p>',
			'<p>Des <code>/</code> séparent plusieurs options.<br/>Les <code>[]</code> entourent des paramètres optionnels.<br/>Les <code>...</code> indiquent qu\'il est possible de mettre une autre balise à la suite.<br/>Un <code>=</code> précède la valeur par défaut du paramètre.</p>',
			'<p>Enfin, les textes sont parsés par défaut et certaines chaînes de caractères sont remplacées par des icônes ou mis en page différemment. Pour voir la liste des éléments concernés, consultez le deck <i>Lexique</i>.</p>',
			'<ul>',
			'<li><code><b>text</b> | <i>texte</i></code></li>',
			'<li><code><b>right</b> | <i>texte</i></code></li>',
			'<li><code><b>center</b> | <i>texte</i></code></li>',
			'<li><code><b>justify</b> | <i>texte</i></code></li>',
			'<li><code><b>section</b> | <i>titre</i> [| ... ]</code></li>',
			'<li><code><b>property</b> | <i>nom</i> [| <i>texte</i> | ... ]</code></li>',
			'<li><code><b>description</b> | <i>texte</i></code> Le texte n\'est pas parsé.</li>',
			'<li><code><b>line</b> [| <i>hauteur=1</i> | dash ]</code>Avec <code>dash</code> la ligne est en pointillé.</li>',
			'<li><code><b>ruler</b></code></li>',
			'<li><code><b>fill</b> [| <i>poids=1</i> ]</code></li>',
			'<li><code><b>space</b> [| <i>hauteur=1</i> ]</code></li>',
			'<li><code><b>boxes</b> [| <i>nombre=1</i> | <i>taille=1</i> | dash center/right double | ... ]</code></li>',
			'<li><code><b>circles</b> [| <i>nombre=1</i> | <i>taille=1</i> | dash center/right | ... ]</code></li>',
			'<li><code><b>bullet</b> | <i>texte</i></code></li>',
			'<li><code><b>fail</b> [| [<i>texte</i>] | ... ]</code></li>',
			'<li><code><b>success</b> [| [<i>texte</i>] | ... ]</code></li>',
			'<li><code><b>icon</b> [| <i>nom</i> | <i>taille=40</i> | background center | ... ]</code></li>',
			'<li><code><b>picture</b> | <i>url</i> [| <i>hauteur</i>X<i>largeur</i>/<i>taille</i> | invert ]</code></li>',
			'<li><code><b>table_header</b> | <i>texte</i> [| <i>texte</i> ]</code> Une case par paramètre.</li>',
			'<li><code><b>table_line</b> | <i>texte</i> [| <i>texte</i> ]</code> Une case par paramètre.</li>',
			'<li><code><b>table_line_c</b> | <i>texte</i> [| <i>texte</i> ]</code> Une case par paramètre.</li>',
			'<li><code><b>comment</b> | <i>texte</i></code> Sert à rajouter des commentaires qui ne seront pas affiché.</li>',
			'</ul>'
		],
		SHORTCUTS: [
			'<h2>Raccourcis</h2>',
			'<ul>',
			'<li><b>Ctrl+S:</b> Enregistrer le deck courrant</li>',
			'<li><b>Ctrl+G:</b> Générer le deck courrant</li>',
			'<li><b>Maj+Pg Up:</b> Deck précédent</li>',
			'<li><b>Maj+Pg Down:</b> Deck suivant</li>',
			'<li><b>Pg Up:</b> Carte précédente</li>',
			'<li><b>Pg Down:</b> Carte suivante</li>',
			'<li><b>²:</b> Affiche cette aide</li>',
			'</ul>',
			'<p>Dans la zone <i>Contenus</i> :</p>',
			'<ul>',
			'<li><b>Maj+Suppr:</b> Supprime la ligne</li>',
			'<li><b>Alt+i:</b> Insère des balises italiques</li>',
			'<li><b>Alt+b:</b> Insère des balises grasses</li>',
			'</ul>'
		],
		LICENSES: [
			'<h2>Licences</h2>',
			'<p>Ce générateur est fourni sous licence MIT et se base sur celui de Robert <a herf="https://github.com/crobi">\'crobi\'</a> Autenrieth disponible sur <a herf="https://github.com/crobi/rpg-cards">https://github.com/crobi/rpg-cards</a>.</p>',
			'<p>Les icônes sont faites par plusieurs artistes et sont disponibles sur <a href="https://game-icons.net/">https://game-icons.net</a>. Elles sont fournis sous licence Creative Commons 3.0 BY.</p>',
			'<p>Site non-officiel pour Dragons créé par Grégoire André. Utilise des contenus protégés par la propriété intellectuelle © Agate RPG, avec l’aimable permission de l’éditeur dans le cadre de la licence CUVD. Rejoignez la communauté : www.dragons-rpg.com/</p>'
		],

		PRINT_MODAL_TITLE: 'Impression des cartes générées',
		PRINT_MODAL: [
			'<ul>',
			'<li>Un nouvel onglet contient les cartes générés. Si vous ne le voyez pas, vérifiez vos bloqueur de scripts et de popup. Si cela n\'aide pas, essayez de désactiver les extensions.</li>',
			'<li>Dans la fenêre d\'impression, assurez-vous d\'avoir activé les graphiques d\'arrière-plan.</li>',
			'<li>Vérifiez bien la taille du papier d\'impression qui doit être la même que dans l\'éditeur.</li>',
			'<li>Activez le recto verso (retournez sur le côté long) si vous l\'avez fait dans l\'éditeur.</li>',
			'<li>Ne mettez pas d\'échelle, conservez la taille original.</li>',
			'<li>Certaines imprimantes ne sont pas très précises (les pages se décalent ou tournent un peu) et les faces des carte ne s\'aligneront pas parfaitement avec le dos. Si c\'est votre cas, vous pouvez utiliser l\'option "Bordure épaissi". Si cela n\'aide pas, essayez une autre imprimante ou n\'imprimez qu\'une face.</li>',
			'</ul>'
		],
		
		DELETE_MODAL_TITLE: 'Confirmez la suppression',
		DELETE_MODAL: [
			'<p>Le deck et toutes ses cartes vont être supprimées.<br/>Il ne sera pas possible de revenir en arrière.<br/>Êtes-vous sûr.e ?</p>'
		],
		DELETE_MODAL_CONFIRMATION: 'Supprimer',
		
		MOVE_TO_MODAL_TITLE: 'Déplacer vers'
	},
};
