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
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';

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


const normalizeUrl = (url) => {
  if (!url) return '';
  try {
    // If user omitted protocol, assume https
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);
    const normalized = new URL(hasProtocol ? url : `https://${url}`);
    return normalized.toString();
  } catch {
    return url; // leave as-is; could flag invalid separately
  }
};

export default function Edit(props) {
	const { setAttributes, isSelected } = props
	const { address, phone, header, openHours, instagramUrl, twitterUrl, facebookUrl, copyright } = props.attributes;

	return (
		<div { ...useBlockProps() }>

			<InspectorControls>
				<PanelBody title={__('Social Media Links', 'example')} initialOpen>
					<TextControl
						label="Instagram URL"
						value={instagramUrl}
						onChange={(val) => setAttributes({ instagramUrl: val })}
						placeholder="https://instagram.com/yourprofile"
					/>
					<TextControl
						label="Twitter URL"
						value={twitterUrl}
						onChange={(val) => setAttributes({ twitterUrl: val })}
						placeholder="https://twitter.com/yourhandle"
					/>
					<TextControl
						label="Facebook URL"
						value={facebookUrl}
						onChange={(val) => setAttributes({ facebookUrl: val })}
						placeholder="https://facebook.com/yourpage"
					/>
				</PanelBody>
			</InspectorControls>

			<footer>
				<div class="wrapper">
					<div class="container">
						<div class="footer-upper">
							<div class="content">
								<ul class="contact">
									<li>
										<RichText
											tagName="address"
											value={address}
											onChange={(value) => setAttributes({ address: value })}
											placeholder="Enter Address..."
										/>
									</li>
									<li>
										<RichText
											tagName="span"
											value={phone}
											onChange={(value) => setAttributes({ phone: value })}
											placeholder="Enter Phone Number..."
										/>
									</li>
								</ul>
								<RichText
									tagName="h4"
									value={header}
									onChange={(value) => setAttributes({ header: value })}
									placeholder="Enter Header..."
								/>
								{/* <ul class="open">
									<li><b>Monday - Saturday</b> 9 am - 8 pm</li>
									<li><b>Sunday</b> CLOSED</li>
								</ul> */}
								<div className='open'>
									<RichText
										tagName="p"
										value={openHours}
										onChange={(newVal) => setAttributes({ openHours: newVal })}
										placeholder="Schedule here…"
									/>
								</div>
								<ul class="social">
									<li><a href={instagramUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Instagram.png" alt="Instagram logo" /></figure></a></li>
									{/* <li><a href={twitterUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Twitter.png" alt="Facebook logo" /></figure></a></li> */}
									<li><a href={facebookUrl}><figure><img src="http://45.77.242.28/votre/wp-content/uploads/2025/07/Facebook.png" alt="Twitter logo" /></figure></a></li>
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
								<InnerBlocks
									allowedBlocks={['core/navigation']}
									template={[['core/navigation']]}
									templateId="navigation"
								/>
							</div>
							<div class="copyright">
								<RichText
									tagName="p"
									value={copyright}
									onChange={(newVal) => setAttributes({ copyright: newVal })}
									placeholder="Copyright here…"
								/>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<a href="https://wa.me/+971505513568" class="whatsapp-float" target="_blank" aria-label="Whatsapp">
				<i class="fab fa-whatsapp"></i>
			</a>

		</div>
	);
}
