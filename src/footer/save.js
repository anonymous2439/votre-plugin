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
	const { address, phone, header, openHours, instagramUrl, twitterUrl, facebookUrl, copyright } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			
			<footer id='section-footer'>
				<div class="wrapper">
					<div class="container">
						<div class="footer-upper">
							<div class="content">
								<ul class="contact">
									<li>
										<RichText.Content
											tagName="address"
											value={address}
										/>
									</li>
									<li>
										<RichText.Content
											tagName="phone"
											value={phone}
										/>
									</li>
								</ul>
								<RichText.Content
									tagName="h4"
									value={header}
								/>
								<div class="open">
									<RichText.Content tagName="p" value={openHours} />
								</div>
								<ul class="social">
									<li><a href={instagramUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Instagram.png" alt="Instagram logo" /></figure></a></li>
									{/* <li><a href={twitterUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Twitter.png" alt="twitter logo" /></figure></a></li> */}
									<li><a href={facebookUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Facebook.png" alt="facebook logo" /></figure></a></li>
								</ul>
							</div>
							<div className="map">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.869245102678!2d55.154188899999994!3d25.0045586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d5ea83704bd%3A0x975326b9f2d682ea!2sVotre%20Slimming%20Therapy%20Center!5e0!3m2!1sen!2sph!4v1750604681149!5m2!1sen!2sph"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Google Map"
								/>
							</div>
						</div>
						<div class="footer-lower">
							<div class="footer-nav">
								{/* <ul>
									<li class="active"><a href="#!">Home</a></li>
									<li><a href="#!">Services</a></li>
									<li><a href="#!">Contact</a></li>
									<li><a href="#!">About</a></li>
									<li><a href="#!">Gallery</a></li>
								</ul> */}
								<InnerBlocks.Content templateId="navigation" />
							</div>
							<div class="copyright">
								<RichText.Content
									tagName="p"
									value={copyright}
								/>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<a href="https://wa.me/+971505513568" class="whatsapp-float" target="_blank" aria-label="Whatsapp">
				<i class="fab fa-whatsapp"></i>
			</a>
			
		</p>
	);
}
