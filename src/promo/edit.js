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
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';

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
	const { imageUrl1, imageId1, imageAlt1, imageUrl2, imageId2, imageAlt2 } = props.attributes;

	const onSelectImage1 = (media) => {
		setAttributes({
			imageUrl1: media.url,
			imageId1: media.id,
			imageAlt1: media.alt,
		});
	};

	const onSelectImage2 = (media) => {
		setAttributes({
			imageUrl2: media.url,
			imageId2: media.id,
			imageAlt2: media.alt,
		});
	};

	return (
		<div { ...useBlockProps() }>

			<InspectorControls>
				<PanelBody title="Image Settings" initialOpen={true}>
					
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage1}
							allowedTypes={['image']}
							value={imageId1}
							render={({ open }) => (
								<Button onClick={open} isSecondary>
									{imageUrl1 ? 'Replace Image 1' : 'Upload Image 1'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage2}
							allowedTypes={['image']}
							value={imageId2}
							render={({ open }) => (
								<Button onClick={open} isSecondary>
									{imageUrl2 ? 'Replace Image 2' : 'Upload Image 2'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					
				</PanelBody>
			</InspectorControls>

			<div id="section-promo" class="section">
				<div class="wrapper">
					<div class="container">
						<figure>
							{imageUrl1 && (
								<img src={imageUrl1} alt={imageAlt1 || ''} />
							)}
						</figure>
						<figure>
							{imageUrl2 && (
								<img src={imageUrl2} alt={imageAlt2 || ''} />
							)}
						</figure>
					</div>
				</div>
			</div>

		</div>
	);
}
