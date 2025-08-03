/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	attributes: {
		"address": {
			"type": "string",
			"default": "Shop 16 Ground Floor <br/>European Business Center - E311 - Dubai - <br/>United Arab Emirates"
		},
		"phone": {
			"type": "string",
			"default": "+971 4 567 4949",
		},
		"openHours": {
			"type": "string",
			"default": "<p><b>Monday - Saturday</b> 9 am - 8 pm<br /><b>Sunday</b> CLOSED</p>"
		},
		"header": {
			"type": "string",
			"default": "OPEN HOURS",
		},
		"instagramUrl": {
			"type": "string",
			"default": "https://www.instagram.com/votre_slimming_therapy_center/",
		},
		"twitterUrl": {
			"type": "string",
			"default": "#!",
		},
		"facebookUrl": {
			"type": "string",
			"default": "https://www.facebook.com/votreslimmingtherapycenter/",
		},
		"copyright": {
			"type": "string",
			"default": "© 2025 Votre Slimming Therapy Cente",
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
