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
	const { btnText, imageUrl, imageId, imageAlt, title, subtitle } = props.attributes;

	return (
		<p { ...useBlockProps.save() }>
			
			<div id="section-appointment" class="section">
				<div class="wrapper">
					<div class="container">

						<figure>
							<div className='img-wrapper'>
								{imageUrl && (
									<img src={imageUrl} alt={imageAlt || ''} />
								)}
								{imageUrl && (
									<img class="img-curve" src={imageUrl} alt={imageAlt || ''} />
								)}
							</div>
							<figcaption>
								<div className='bg-bullet'></div>
								<h4>Schedule Your <span>Salon Experience</span></h4>
							</figcaption>
						</figure>

						<form action="" method="post">
							<input placeholder="First Name" name='first_name' required />
							<input placeholder="Last Name" name='last_name' />

							<input placeholder="Phone Number" name='phone_number' required />
							<input placeholder="Email" type='email' name='email' required />

							<input class="datetime" placeholder="Date & Time" type='datetime-local' name='datetime' required />

							<textarea placeholder="Write a short note" name='message'></textarea>

							<button type="submit" name='appointment_form_submit'>
								BOOK APPOINTMENT
							</button>
						</form>

					</div>
				</div>
			</div>
			
		</p>
	);
}
