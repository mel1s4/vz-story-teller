<?php

if (!current_user_can('edit_posts')) {
    // home
    wp_redirect(home_url());
    exit;
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

  $post = get_post($_GET['post']);
  $script = get_post_meta($post->ID, 'vz_script', true);
  if (!$script) {
    $script = [];
  }
  $nonce = wp_create_nonce('wp_rest');
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Script Editor</title>
  <script>
    window.vz_script = `<?php echo json_encode($script); ?>`;
  </script>
  <script type="module" crossorigin src="<?php echo $assets_folder . $js_file; ?>"></script>
  <link rel="stylesheet" crossorigin href="<?php echo $assets_folder . $css_file; ?>">
</head>
<body>
  <div id="vz-script-editor"></div>
  <input type="hidden" name="vz-st-nonce" value="<?php echo $nonce; ?>">
  <input type="hidden" name="vz-st-post-id" value="<?php echo $post->ID; ?>">
  <input type="hidden" name="vz-st-base-url" value="<?php echo home_url(); ?>">
  <input type="hidden" name="vz-st-api-url" value="<?php echo home_url(); ?>/wp-json/vz-story-teller/v1/">
</body>
</html>
