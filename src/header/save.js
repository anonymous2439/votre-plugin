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
	const { selectedPageUrl, logoUrl, logoId, logoAlt, } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			<div id="section-header" class="section">
				<div class="wrapper">
					<div class="container">
						<header style={{position:'relative',zIndex:1}}>
							<div class="main-logo">
								<a href="/votre">
									<figure>
										{logoUrl && (
											<img src={logoUrl} alt={logoAlt || ''} />
										)}
									</figure>
								</a>
							</div>
							<InnerBlocks.Content templateId="navigation" />
						</header>
						
					</div>
				</div>
			</div>
		</p>
	);
}
