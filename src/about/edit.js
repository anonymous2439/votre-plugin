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
	const { imageUrl, imageAlt, imageId, header, info } = props.attributes;

	const onSelectImage = (media) => {
		setAttributes({
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt,
		});
	};

	return (
		<div { ...useBlockProps() }>

			<InspectorControls>
				<PanelBody title="Image Settings" initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={imageId}
							render={({ open }) => (
								<Button onClick={open} isSecondary>
									{imageUrl ? 'Replace Image' : 'Upload Image'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					
				</PanelBody>
			</InspectorControls>

			<div id="section-about" class="section">
				<div class="wrapper">
					<div class="container">
						<section>
							<RichText
								tagName="h2"
								value={header}
								onChange={(value) => setAttributes({ header: value })}
								placeholder="Enter text..."
							/>
							<p>
								<RichText
									tagName="span"
									value={info}
									onChange={(value) => setAttributes({ info: value })}
									placeholder="Enter text..."
								/>
								<a href="#!">Read more</a>
							</p>
						</section>
						<section>
							<figure>
								{imageUrl && (
									<img src={imageUrl} alt={imageAlt || ''} />
								)}
							</figure>
						</section>
					</div>
				</div>
			</div>

		</div>
	);
}
