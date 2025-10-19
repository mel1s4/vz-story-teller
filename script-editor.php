<?php
/**
 * SECURITY: Verify user is logged in
 */
if (!is_user_logged_in()) {
    wp_die(__('You must be logged in to access this page.', 'vz-story-teller'), __('Authentication Required', 'vz-story-teller'), array('response' => 401));
}

/**
 * SECURITY: Verify user has permission to edit posts
 */
if (!current_user_can('edit_posts')) {
    wp_die(__('You do not have permission to access this page.', 'vz-story-teller'), __('Permission Denied', 'vz-story-teller'), array('response' => 403));
}

/**
 * SECURITY: Verify post ID exists and is valid
 */
$post_id = isset($_GET['post']) ? absint($_GET['post']) : 0;
if (!$post_id) {
    wp_die(__('Invalid post ID.', 'vz-story-teller'), __('Invalid Request', 'vz-story-teller'), array('response' => 400));
}

$post = get_post($post_id);

/**
 * SECURITY: Verify post exists and is vz_script type
 */
if (!$post || $post->post_type !== 'vz_script') {
    wp_die(__('Script not found.', 'vz-story-teller'), __('Not Found', 'vz-story-teller'), array('response' => 404));
}

/**
 * SECURITY: Verify user can edit this specific post
 */
if (!current_user_can('edit_post', $post_id)) {
    wp_die(__('You do not have permission to edit this script.', 'vz-story-teller'), __('Permission Denied', 'vz-story-teller'), array('response' => 403));
}

$assets_folder = plugin_dir_url(__FILE__) . 'frontend/dist/assets/';
$js_file = '';
$css_file = '';
$assets_folder_files = scandir(__DIR__ . '/frontend/dist/assets/');
$fonts = [];
foreach ($assets_folder_files as $file) {
  if (strpos($file, '.js') !== false) {
    $js_file = $file;
  }
  if (strpos($file, '.css') !== false) {
    $css_file = $file;
  }
  if (strpos($file, '.woff') !== false || strpos($file, '.woff2') !== false) {
    $fonts[] = $file;
  }
}

$script = get_post_meta($post->ID, 'vz_script', true);
if (!$script) {
  $script = [];
}

/**
 * SECURITY: Create nonce for REST API requests
 */
$nonce = wp_create_nonce('wp_rest');
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo esc_html($post->post_title); ?> - Script Editor</title>
  <script>
    window.vz_script = <?php echo wp_json_encode($script); ?>;
    window.vz_post_id = <?php echo absint($post->ID); ?>;
  </script>
  <script type="module" crossorigin src="<?php echo esc_url($assets_folder . $js_file); ?>"></script>
  <link rel="stylesheet" crossorigin href="<?php echo esc_url($assets_folder . $css_file); ?>">
</head>
<body>
  <div id="vz-script-editor"></div>
  <input type="hidden" name="vz-st-nonce" value="<?php echo esc_attr($nonce); ?>">
  <input type="hidden" name="vz-st-post-id" value="<?php echo esc_attr($post->ID); ?>">
  <input type="hidden" name="vz-st-base-url" value="<?php echo esc_url(home_url()); ?>">
  <input type="hidden" name="vz-st-api-url" value="<?php echo esc_url(home_url('/wp-json/vz-story-teller/v1/')); ?>">
</body>
</html>
