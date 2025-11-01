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

function send_mail_via_graph($to, $subject, $html_content) {
    $tenantId = GRAPH_TENANT_ID;
    $clientId = GRAPH_CLIENT_ID;
    $clientSecret = GRAPH_CLIENT_SECRET;
    $sender = GRAPH_SENDER;

    error_log('send_mail_via_graph() was called');

    // Step 1: Get access token
    $token_url = "https://login.microsoftonline.com/{$tenantId}/oauth2/v2.0/token";
    error_log('Fetching token from: ' . $token_url);

    $response = wp_remote_post($token_url, [
        'body' => [
            'client_id' => $clientId,
            'scope' => 'https://graph.microsoft.com/.default',
            'client_secret' => $clientSecret,
            'grant_type' => 'client_credentials',
        ],
        'timeout' => 20,
    ]);

    if (is_wp_error($response)) {
        error_log('Graph token request failed: ' . $response->get_error_message());
        return false;
    }

    $status_code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    // error_log("Token request HTTP code: {$status_code}");
    // error_log("Token response body: {$body}");

    $body_data = json_decode($body, true);
    $access_token = $body_data['access_token'] ?? null;

    if (!$access_token) {
        error_log('Graph token missing — cannot continue');
        return false;
    }

    // Step 2: Send mail
    $email = [
        'message' => [
            'subject' => $subject,
            'body' => [
                'contentType' => 'HTML',
                'content' => $html_content,
            ],
            'toRecipients' => [
                ['emailAddress' => ['address' => $to]],
            ],
            'from' => [
                'emailAddress' => ['address' => $sender],
            ],
        ],
        'saveToSentItems' => true,
    ];

    $send_url = "https://graph.microsoft.com/v1.0/users/{$sender}/sendMail";
    // error_log('Sending email via: ' . $send_url);

    $res = wp_remote_post($send_url, [
        'headers' => [
            'Authorization' => "Bearer {$access_token}",
            'Content-Type'  => 'application/json',
        ],
        'body' => wp_json_encode($email),
        'timeout' => 20,
    ]);

    if (is_wp_error($res)) {
        error_log('Graph sendMail failed: ' . $res->get_error_message());
        return false;
    }

    $res_code = wp_remote_retrieve_response_code($res);
    $res_body = wp_remote_retrieve_body($res);
    // error_log("Graph sendMail HTTP code: {$res_code}");
    // error_log("Graph sendMail response: {$res_body}");

    return $res_code === 202;
}


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
		$body = "<p><strong>Name:</strong> {$name}<br>
				 <strong>Phone Number:</strong> {$phone_number}<br>
				 <strong>Email:</strong> {$email}<br>
				 <strong>Booking Date:</strong> {$datetime}</p>
				 <p>{$message}</p>";
		$headers = ['From: ' . $name . ' <' . $email . '>'];

		send_mail_via_graph($to, $subject, $body);

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
