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
	const { btnText, imageUrl, imageId, imageAlt, title, subtitle } = props.attributes;

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


			<div id="section-appointment" class="section">
				<div class="wrapper">
					<div class="container">

						<figure>
							<div className='img-wrapper'>
								{imageUrl && (
									<img src={imageUrl} alt={imageAlt || ''} />
								)}
								{imageUrl && (
									<img class="img-curve" src={imageUrl} alt={imageAlt || ''} />
								)}
							</div>
							<figcaption>
								<div className='bg-bullet'></div>
								<h4>Schedule Your <span>Salon Experience</span></h4>
							</figcaption>
						</figure>

						<form action="">
							<input placeholder="First Name" />
							<input placeholder="Last Name" />

							<input placeholder="Phone Number" />
							<input placeholder="Email" />

							<input class="datetime" placeholder="Date & Time" />

							<textarea placeholder="Write a short note"></textarea>

							<button type="submit">
								BOOK APPOINTMENT
							</button>
						</form>

					</div>
				</div>
			</div>

		</div>
	);
}
