/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

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
	const { imageUrl1, imageAlt1, imageUrl2, imageAlt2 } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			<div id="section-showcase">
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
		</p>
	);
}
