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
	// const { btnText, imageUrl, imageId, imageAlt, title, subtitle } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			
			<div id="section-reviews" class="section">
				<div class="wrapper">
					<div class="container">
						<div class="header">
							<h2>What Our Clients Say</h2>
						</div>
						<div class="body">
							<div class="boxes">
								<section>
									<figure>
										{/* <img src="images/profile.jpg" alt="profile picture placeholder"> */}
									</figure>
									<h4>Jesie Ola</h4>
									<p>Absolutely loved my experience at the salon! The staff were friendly, the place was spotless, and my hai rcut turned out exactly how I wanted. Highly recommend!</p>
								</section>
								<section>
									<figure>
										{/* <img src="images/profile.jpg" alt="profile picture placeholder"> */}
									</figure>
									<h4>Jesie Ola</h4>
									<p>Absolutely loved my experience at the salon! The staff were friendly, the place was spotless, and my hai rcut turned out exactly how I wanted. Highly recommend!</p>
								</section>
								<section>
									<figure>
										{/* <img src="images/profile.jpg" alt="profile picture placeholder"> */}
									</figure>
									<h4>Jesie Ola</h4>
									<p>Absolutely loved my experience at the salon! The staff were friendly, the place was spotless, and my hai rcut turned out exactly how I wanted. Highly recommend!</p>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</p>
	);
}
