/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
	const { imageUrl, imageId, imageAlt, header, info, link, btnText } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			
			<div id="section-about" class="section">
				<div class="wrapper">
					<div class="container">
						<section>
							<h2>{header}</h2>
							<main>
								<RichText.Content tagName="p" value={info} />
								<a href={link || '#'}>
									<RichText.Content
										tagName="span"
										value={btnText}
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

		</p>
	);
}
