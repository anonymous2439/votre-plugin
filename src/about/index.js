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
		"imageId": {
			"type": "number"
		},
		"imageUrl": {
			"type": "string",
			"default": ""
		},
		"imageAlt": {
			"type": "string",
			"default": ""
		},
		"header": {
			"type": "string",
			"default": "About Us"
		},
		"info": {
			"type": "string",
			"default": `At our salon, we believe in helping you look and feel your best. Our dedicated team of professionals is committed to providing high quality beauty and 
    wellness services in a welcoming and relaxing environment. Whether you're 
    here for a quick haircut or a full 
    pampering session, we strive to make 
    every visit enjoyable and tailored to your needs. Your comfort and satisfaction are always our top priorities.`,
		},
		"link" : {
			"type": "string",
			"default": "#!"
		},
		"btnText": {
			"type": "string",
			"default": "Read More"
		}
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
