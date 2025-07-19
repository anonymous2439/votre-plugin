/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks  } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { select } from '@wordpress/data';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { setAttributes, isSelected } = props
	const { selectedPageId, logoUrl, logoId, logoAlt, } = props.attributes;

	const pages = useSelect((select) =>
		select('core').getEntityRecords('postType', 'page', { per_page: -1 })
	);

	const onSelectLogo = (media) => {
		setAttributes({
			logoUrl: media.url,
			logoId: media.id,
			logoAlt: media.alt,
		});
	};

	const options = [
		{ label: 'Select a page...', value: '' },
		...(pages
		? pages.map((page) => ({
			label: page.title.rendered,
			value: page.id
			}))
		: [])
	];

	const onChangePage = (value) => {
		const pageId = parseInt(value);
		const page = pages?.find((p) => p.id === pageId);
		setAttributes({
		selectedPageId: pageId,
		selectedPageUrl: page?.link || ''
		});
	};
	

	return (
		<div { ...useBlockProps() }>

			<InspectorControls>
				<PanelBody title="Logo Settings" initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectLogo}
							allowedTypes={['image']}
							value={logoId}
							render={({ open }) => (
								<Button onClick={open} isSecondary>
									{logoUrl ? 'Replace Image' : 'Upload Image'}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<InspectorControls>
				<PanelBody title="Page Selector" initialOpen={true}>
				<SelectControl
					label="Link to Page"
					value={selectedPageId}
					options={options}
					onChange={onChangePage}
				/>
				</PanelBody>
			</InspectorControls>


			<div id="section-header" class="section">
				<div class="wrapper">
					<div class="container">

						<header style={{position:'relative',zIndex:1}}>
							<div class="main-logo">
								<a href="/">
									<figure>
										{logoUrl && (
											<img src={logoUrl} alt={logoAlt || ''} />
										)}
									</figure>
								</a>
							</div>
							<InnerBlocks
								allowedBlocks={['core/navigation']}
								template={[['core/navigation']]}
								templateId="navigation"
							/>
						</header>
						
					</div>
				</div>
			</div>
		</div>
	);
}
