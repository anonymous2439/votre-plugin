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
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck, URLInputButton  } from '@wordpress/block-editor';
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

import { useSelect } from '@wordpress/data';

export default function Edit(props) {

	const { setAttributes, isSelected } = props
	const { imageUrl, imageAlt, imageId, header, info, link, btnText } = props.attributes;

	const onSelectImage = (media) => {
		setAttributes({
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt,
		});
	};

	// Get all published pages
    const pages = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'page', { per_page: -1 });
    }, []);

    const options = [
        { label: __('Select a page', 'your-text-domain'), value: '' },
        ...(pages
            ? pages.map((page) => ({
                  label: page.title.rendered,
                  value: page.link, // permalink
              }))
            : [])
    ];

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

				<PanelBody title={__('Button Link', 'your-text-domain')} initialOpen={true}>
                    <SelectControl
                        label={__('Choose a page', 'your-text-domain')}
                        value={link}
                        options={options}
                        onChange={(newLink) => setAttributes({ link: newLink })}
                        disabled={!pages}
                    />
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
							<main>
								<RichText
									tagName="p"
									value={info}
									onChange={(value) => setAttributes({ info: value })}
									placeholder="Enter text..."
								/>
								<a>
									<RichText
										tagName="span"
										value={btnText}
										onChange={(value) => setAttributes({ btnText: value })}
										placeholder="Enter Button text..."
									/>
								</a>							
							</main>
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
