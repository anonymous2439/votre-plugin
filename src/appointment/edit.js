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
	const { btnText, imageUrl, imageId, imageAlt, intro, intro2 } = props.attributes;

	function getLocalDateTimeString(daysToAdd = 0, date = new Date()) {
		date.setDate(date.getDate() + daysToAdd);
		const pad = (n) => String(n).padStart(2, "0");
		return (
			date.getFullYear() +
			"-" +
			pad(date.getMonth() + 1) +
			"-" +
			pad(date.getDate()) +
			"T" +
			pad(date.getHours()) +
			":" +
			pad(date.getMinutes())
		);
	}

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
								<h4>
									<RichText
										tagName="span"
										value={intro}
										onChange={(value) => setAttributes({ intro: value })}
										placeholder="Enter text..."
									/>
									<RichText
										tagName="span"
										value={intro2}
										onChange={(value) => setAttributes({ intro2: value })}
										placeholder="Enter text..."
									/>
								</h4>
							</figcaption>
						</figure>

						<form action="">
							<input placeholder="First Name" />
							<input placeholder="Last Name" />

							<input placeholder="Phone Number" />
							<input placeholder="Email" />

							<div className='datetime_con'>
								<input
									id="datetime"
									className="datetime"
									type="datetime-local"
									required
									name="datetime"
									value={getLocalDateTimeString(1)}
								/>
							</div>

							<textarea placeholder="Write a short note"></textarea>

							<button type="button">
								<RichText
									tagName="span"
									value={btnText}
									onChange={(value) => setAttributes({ btnText: value })}
									placeholder="Enter text..."
								/>
							</button>
						</form>

					</div>
				</div>
			</div>

		</div>
	);
}
