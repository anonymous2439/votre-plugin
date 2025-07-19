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

    const { setAttributes } = props;
    const { images } = props.attributes;

    const onAddImage = (media) => {
        setAttributes({
            images: [...images, media]
        });
    };

	return (
		<div { ...useBlockProps() }>

            <InspectorControls>
                <PanelBody title="Image Settings" initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({
                                    images: [...images, {
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt,
                                        caption: media.caption || ''
                                    }]
                                });
                            }}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} isSecondary>
                                    Add Image
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    {/* Image list preview with remove option */}
                    {images?.length > 0 && (
                        <ul style={{ marginTop: '1rem' }}>
                            {images.map((img, index) => (
                                <li key={img.id || index} style={{ marginBottom: '1rem' }}>
                                    <img src={img.url} alt={img.alt} style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }} />
                                    <Button
                                        isLink
                                        isDestructive
                                        onClick={() => {
                                            const newImages = [...images];
                                            newImages.splice(index, 1);
                                            setAttributes({ images: newImages });
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </PanelBody>
            </InspectorControls>

			<div id="section-services" class="section">
				<div class="wrapper">
					<div class="container">
						<div class="info">
							<h2>Services</h2>
						</div>
						<div class="boxes">
                            <section>
                                <figure>
                                    {(images?.length > 0) && 
                                        <img src={images[0].url} />
                                    }
                                    <figcaption>
                                        <p>Facial Treatments</p>
                                    </figcaption>
                                </figure>
                                <a href="/votre/?page_id=212"></a>
                            </section>
                            <section>
                                <figure>
                                    {(images?.length > 1) && 
                                        <img src={images[1].url} />
                                    }
                                    <figcaption>
                                        <p>Nail Treatments</p>
                                    </figcaption>
                                </figure>
                                <a href="/votre/?page_id=219"></a>
                            </section>
                            <section>
                                <figure>
                                    {(images?.length > 2) && 
                                        <img src={images[2].url} />
                                    }
                                    <figcaption>
                                        <p>Massage Therapies</p>
                                    </figcaption>
                                </figure>
                                <a href="/votre/?page_id=216"></a>
                            </section>
                            <section>
                                <figure>
                                    {(images?.length > 3) && 
                                        <img src={images[3].url} />
                                    }
                                    <figcaption>
                                        <p>More</p>
                                    </figcaption>
                                </figure>
                                <a href="/votre/?page_id=234"></a>
                            </section>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
}
