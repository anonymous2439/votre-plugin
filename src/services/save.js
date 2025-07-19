/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save(props) {

    const { setAttributes } = props;
    const { images } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
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
		</p>
	);
}
