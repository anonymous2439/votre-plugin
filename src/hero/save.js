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
	const { btnText, imageUrl, imageId, imageAlt, title, subtitle, selectedPageUrl, logoUrl, logoId, logoAlt, } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			<div id="section-hero" class="section">
				<div class="wrapper">
					<div class="container">
						<header style={{position:'relative',zIndex:1}}>
							<div class="main-logo">
								<a href="/">
									<figure>
										{logoUrl && (
											<img src={logoUrl} alt={logoAlt || ''} />
										)}
									</figure>
								</a>
							</div>
							<InnerBlocks.Content templateId="navigation" />
						</header>

						<div class="hero-img">
							<figure>
								{imageUrl && (
									<img src={imageUrl} alt={imageAlt || ''} />
								)}
							</figure>
						</div>
						
						<div class="info">
							<h1>
								<span class="primary">{title}</span>
								<span class="secondary">{subtitle}</span>
							</h1>
							<a href={selectedPageUrl}>{btnText}</a>
						</div>
						
					</div>
				</div>
			</div>
		</p>
	);
}
