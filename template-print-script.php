<?php
/**
 * Template Name: Print-Friendly Script
 * Template Post Type: vz_script
 * Description: A print-friendly template for displaying scripts
 */

if (!is_user_logged_in() || !current_user_can('edit_posts') || !defined('ABSPATH')) {
  exit;
}

// Get the post
global $post;
// Get script data
$script = get_post_meta($post->ID, 'vz_script', true);
if (!$script) {
    $script = array();
}

// Get post title
$title = get_the_title($post->ID);

// Calculate scene numbers
function calculate_scene_numbers($script) {
    $scene_count = 0;
    $scene_numbers = array();

    foreach ($script as $item) {
        if ($item['type'] === 'slugline') {
            $scene_count++;
            $scene_numbers[$item['id']] = $scene_count;
        }
    }

    return $scene_numbers;
}

$scene_numbers = calculate_scene_numbers($script);

// Function to get scene number for a slugline
function get_scene_number($id, $scene_numbers) {
    return isset($scene_numbers[$id]) ? $scene_numbers[$id] : null;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo esc_html($title); ?> - Print</title>
</head>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body, html {
    font-family: sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    width: 100%;
  }
  .script-container {
    width: 100%;
    max-width: 48em;
    margin: 0 auto;
    padding: 1em;
  }

  .scene-number {
    display: inline-block;
    margin: 0 0.5em;
    &.--right {
      float: right;
    }
  }

  .script-item {
    margin: 1em auto;
    width: 100%;
  }

  .--header {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2em;
    margin-top: 2em;
  }

  .--subtitle {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 2em;
    margin-top: 2em;
  }

  .--transition {
    text-transform: uppercase;
    text-align: right;
    padding-right: 2em;
  }

  .--slugline {
    font-weight: bold;
    text-transform: uppercase;
  }

  .--action {

    }

  .--dialog {
    max-width: 24em;
    padding: 0 3em;
  }

  .--parenthetical {
    font-style: italic;
    text-align: center;
    max-width: 18em;
  }

  .--character {
    text-transform: uppercase;
    text-align: center;
    max-width: 18em;
  }

  .--pagebreak {
    page-break-after: always;
    break-after: page;
    display: none;
  }

  @media print {
    .--pagebreak {
      page-break-after: always;
      break-after: page;
    }
  }
</style>
<body>
    <div class="script-container">
        <!-- Script Content -->
        <?php if (empty($script)): ?>
            <div class="empty-script">
                This script is empty. Add content in the editor to see it here.
            </div>
        <?php else: ?>
          <?php foreach ($script as $item): ?>
            <?php
              $type = $item['type'];
              $value = $item['value'];
              $id = $item['id'];
              $scene_number = ($type === 'slugline') ? get_scene_number($id, $scene_numbers) : null;
            ?>

            <div class="script-item --<?php echo esc_attr($type); ?>">
                <?php if ($type === 'slugline' && $scene_number): ?>
                  <span class="scene-number --left"><?php echo esc_html($scene_number); ?></span>
                <?php endif; ?>
                <?php if ($type !== 'pagebreak'): ?>
                  <?php echo nl2br(esc_html($value)); ?>
                <?php endif; ?>
                <?php if ($type === 'slugline' && $scene_number): ?>
                  <span class="scene-number --right"><?php echo esc_html($scene_number); ?></span>
                <?php endif; ?>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>

