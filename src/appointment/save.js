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
	const { btnText, imageUrl, imageId, imageAlt, intro, intro2 } = props.attributes;

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
								<h4>
									<RichText.Content tagName="span" value={intro} />
									<RichText.Content tagName="span" value={intro2} />
								</h4>
							</figcaption>
						</figure>

						<form action="" method="post">
							<input placeholder="First Name" name='first_name' required />
							<input placeholder="Last Name" name='last_name' />

							<input placeholder="Phone Number" name='phone_number' required />
							<input placeholder="Email" type='email' name='email' required />

							{/* <input class="datetime" type='datetime-local' name='datetime' required /> */}
							<input
								id="datetime"
								class="datetime"
								type="text"
								placeholder="Date and Time"
								required
								onfocus="this.type='datetime-local'"
								onblur="if (!this.value) this.type='text'"
								name="datetime"
							/>

							<textarea placeholder="Write a short note" name='message'></textarea>

							<button type="submit" name='appointment_form_submit'>
								<RichText.Content
									tagName="span"
									value={btnText}
								/>
							</button>
						</form>

					</div>
				</div>
			</div>
			
		</p>
	);
}
