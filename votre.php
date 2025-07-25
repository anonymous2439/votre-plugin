<?php
/**
 * Plugin Name:       Votre
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       votre
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_votre_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'create_block_votre_block_init' );

add_action('wp_enqueue_scripts', 'enqueue_sweetalert');
function enqueue_sweetalert() {
	wp_enqueue_script(
		'sweetalert',
		'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
		[],
		null,
		true // Load in footer
	);
}

add_action('template_redirect', 'appointment_form_submit');
function appointment_form_submit() {
	if (isset($_POST['appointment_form_submit'])) {
		$name 			= sanitize_text_field($_POST['last_name'] .', '. $_POST['first_name']);
		$email 			= sanitize_email($_POST['email']);
		$message 		= sanitize_textarea_field($_POST['message']);
		$phone_number 	= sanitize_text_field($_POST['phone_number']);
		$datetime 		= (new DateTime(sanitize_text_field($_POST['datetime'])))->format('F j, Y \a\t g:i A');

		$to = 'info@votrestc.com';
		$subject = 'Book an Appointment';
		$body = "Name: $name\nPhone Number: $phone_number\nEmail: $email\nDate and Time: $datetime\n\n$message";
		$headers = ['From: ' . $name . ' <' . $email . '>'];

		wp_mail($to, $subject, $body, $headers);

		// Set a query param or cookie to trigger JS later
		wp_redirect(add_query_arg('appointment_success', '1', wp_get_referer()));
		exit;
	}
}

add_action('wp_footer', 'inline_swal');
function inline_swal() {
	if (isset($_GET['appointment_success']) && $_GET['appointment_success'] === '1') {
		?>
		<script>
			document.addEventListener("DOMContentLoaded", function () {
				swal("Success!", "Appointment booked successfully!", "success");
			});
		</script>
		<?php
	}
}
