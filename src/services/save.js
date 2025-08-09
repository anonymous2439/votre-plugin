/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

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
    const { title, services = [] } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			<div id="section-services" class="section">
				<div class="wrapper">
					<div class="container">
						<div class="info">
							<RichText.Content
                                tagName="h2"
                                value={title}
                            />
						</div>
						<div className="boxes">
                            {services.map((svc, i) => (
                                <section key={i}>
                                <figure>
                                    {svc.image && <img src={svc.image.url} alt={svc.image.alt || ''} />}
                                    <figcaption>
                                    <p>{svc.title || `Service ${i + 1}`}</p>
                                    </figcaption>
                                </figure>
                                {svc.link ? (
                                    <a
                                    href={svc.link}
                                    target={svc.target}
                                    rel={svc.target === '_blank' ? 'noopener noreferrer' : undefined}
                                    ></a>
                                ) : (
                                    // keep structure similar; empty anchor omitted if no link
                                    null
                                )}
                                </section>
                            ))}
                        </div>
					</div>
				</div>
			</div>
		</p>
	);
}
