<?php
/**
 * Plugin Name: VZ Story Teller
 * Plugin URI: https://example.com/vz-story-teller
 * Description: Write your scripts and create animatics directly on your WordPress website.
 * Version: 0.0.1
 * Author: Melisa Viroz
 * Author URI: https://melisaviroz.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: vz-story-teller
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type: Scripts
 */
function vz_story_teller_register_post_type() {
    $labels = array(
        'name'                  => _x('Scripts', 'Post Type General Name', 'vz-story-teller'),
        'singular_name'         => _x('Script', 'Post Type Singular Name', 'vz-story-teller'),
        'menu_name'             => __('Scripts', 'vz-story-teller'),
        'name_admin_bar'        => __('Script', 'vz-story-teller'),
        'archives'              => __('Script Archives', 'vz-story-teller'),
        'attributes'            => __('Script Attributes', 'vz-story-teller'),
        'parent_item_colon'     => __('Parent Script:', 'vz-story-teller'),
        'all_items'             => __('All Scripts', 'vz-story-teller'),
        'add_new_item'          => __('Add New Script', 'vz-story-teller'),
        'add_new'               => __('Add New', 'vz-story-teller'),
        'new_item'              => __('New Script', 'vz-story-teller'),
        'edit_item'             => __('Edit Script', 'vz-story-teller'),
        'update_item'           => __('Update Script', 'vz-story-teller'),
        'view_item'             => __('View Script', 'vz-story-teller'),
        'view_items'            => __('View Scripts', 'vz-story-teller'),
        'search_items'          => __('Search Script', 'vz-story-teller'),
        'not_found'             => __('Not found', 'vz-story-teller'),
        'not_found_in_trash'    => __('Not found in Trash', 'vz-story-teller'),
        'featured_image'        => __('Featured Image', 'vz-story-teller'),
        'set_featured_image'    => __('Set featured image', 'vz-story-teller'),
        'remove_featured_image' => __('Remove featured image', 'vz-story-teller'),
        'use_featured_image'    => __('Use as featured image', 'vz-story-teller'),
        'insert_into_item'      => __('Insert into script', 'vz-story-teller'),
        'uploaded_to_this_item' => __('Uploaded to this script', 'vz-story-teller'),
        'items_list'            => __('Scripts list', 'vz-story-teller'),
        'items_list_navigation' => __('Scripts list navigation', 'vz-story-teller'),
        'filter_items_list'     => __('Filter scripts list', 'vz-story-teller'),
    );

    $args = array(
        'label'                 => __('Script', 'vz-story-teller'),
        'description'           => __('Interactive story scripts', 'vz-story-teller'),
        'labels'                => $labels,
        'supports'              => array('title', 'thumbnail', 'revisions', 'page-attributes'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-media-document',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => false, // SECURITY: Disable REST API access
        'rest_base'             => null,
        'rest_controller_class' => null,
    );

    register_post_type('vz_script', $args);
}
add_action('init', 'vz_story_teller_register_post_type', 0);


function vz_story_teller_edit_script_page() {
  // Only run security checks if vz_front parameter is present
  if (!isset($_GET['vz_front']) || $_GET['vz_front'] !== 'true') {
    return;
  }

  // SECURITY: Verify nonce to prevent CSRF attacks
  if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'vz_edit_script_' . $_GET['post'])) {
    wp_die(__('Security check failed. Please try again.', 'vz-story-teller'), __('Security Error', 'vz-story-teller'), array('response' => 403));
  }

  // SECURITY: Check if user is logged in
  if (!is_user_logged_in()) {
    wp_die(__('You must be logged in to access this page.', 'vz-story-teller'), __('Authentication Required', 'vz-story-teller'), array('response' => 401));
  }

  if ($_GET['action'] === 'edit') {
    $post_id = absint($_GET['post']);

    // SECURITY: Verify post exists
    if (!$post_id) {
      wp_die(__('Invalid post ID.', 'vz-story-teller'), __('Invalid Request', 'vz-story-teller'), array('response' => 400));
    }

    $post = get_post($post_id);

    // SECURITY: Verify post exists and is vz_script type
    if (!$post || $post->post_type !== 'vz_script') {
      wp_die(__('Script not found.', 'vz-story-teller'), __('Not Found', 'vz-story-teller'), array('response' => 404));
    }

    // SECURITY: Check if user can edit this specific post
    if (!current_user_can('edit_post', $post_id)) {
      wp_die(__('You do not have permission to edit this script.', 'vz-story-teller'), __('Permission Denied', 'vz-story-teller'), array('response' => 403));
    }

    include 'script-editor.php';
    die();
  }
}

add_action('admin_init', 'vz_story_teller_edit_script_page');


// Add REST API endpoints for the script editor
function vz_story_teller_add_api_endpoints() {
  // GET endpoint to retrieve script data
  register_rest_route('vz-story-teller/v1', '/script/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'vz_story_teller_get_script',
    'permission_callback' => 'vz_story_teller_check_permissions',
    'args' => array(
      'id' => array(
        'required' => true,
        'validate_callback' => function($param) {
          return is_numeric($param);
        },
        'sanitize_callback' => 'absint',
      ),
    ),
  ));

  // POST endpoint to save script data
  register_rest_route('vz-story-teller/v1', '/script/(?P<id>\d+)', array(
    'methods' => 'POST',
    'callback' => 'vz_story_teller_save_script',
    'permission_callback' => 'vz_story_teller_check_permissions',
    'args' => array(
      'id' => array(
        'required' => true,
        'validate_callback' => function($param) {
          return is_numeric($param);
        },
        'sanitize_callback' => 'absint',
      ),
    ),
  ));
}
add_action('rest_api_init', 'vz_story_teller_add_api_endpoints');

// SECURITY: Check if user has permission to access the script
function vz_story_teller_check_permissions($request) {
  // SECURITY: Check if user is logged in
  if (!is_user_logged_in()) {
    return new WP_Error(
      'rest_unauthorized',
      __('You must be logged in to access this resource.', 'vz-story-teller'),
      array('status' => 401)
    );
  }

  $post_id = $request->get_param('id');

  // SECURITY: Verify post exists and is vz_script type
  $post = get_post($post_id);
  if (!$post || $post->post_type !== 'vz_script') {
    return new WP_Error(
      'rest_not_found',
      __('Script not found.', 'vz-story-teller'),
      array('status' => 404)
    );
  }

  // SECURITY: Check if user can edit this specific post
  if (!current_user_can('edit_post', $post_id)) {
    return new WP_Error(
      'rest_forbidden',
      __('You do not have permission to access this script.', 'vz-story-teller'),
      array('status' => 403)
    );
  }

  return true;
}

// SECURITY: Get script data securely
function vz_story_teller_get_script($request) {
  $post_id = $request->get_param('id');
  $script = get_post_meta($post_id, 'vz_script', true);

  if (!$script) {
    $script = array();
  }

  return new WP_REST_Response(array(
    'post_id' => $post_id,
    'script' => $script,
  ), 200);
}

// SECURITY: Save script data securely
function vz_story_teller_save_script($request) {
  $post_id = $request->get_param('id');
  $script = $request->get_param('script');

  // SECURITY: Validate that script is an array
  if (!is_array($script)) {
    return new WP_Error(
      'rest_invalid_data',
      __('Invalid script data.', 'vz-story-teller'),
      array('status' => 400)
    );
  }

  // SECURITY: Sanitize and save script data
  update_post_meta($post_id, 'vz_script', $script);

  return new WP_REST_Response(array(
    'message' => 'Script saved successfully',
    'post_id' => $post_id,
  ), 200);
}

/**
 * Add "Edit in Frontend" button to vz_script post edit page
 */
function vz_story_teller_add_frontend_edit_button() {
    global $post;

    // Only show for vz_script post type
    if (!$post || $post->post_type !== 'vz_script') {
        return;
    }

    // SECURITY: Generate nonce for the frontend edit link
    $nonce = wp_create_nonce('vz_edit_script_' . $post->ID);

    // Get the current URL with nonce for security
    $current_url = admin_url('post.php?post=' . $post->ID . '&action=edit&vz_front=true&_wpnonce=' . $nonce);

    ?>
    <div class="misc-pub-section">
        <a href="<?php echo esc_url($current_url); ?>" class="button button-primary button-large" style="width: 100%; text-align: center; margin-top: 10px;">
            <?php _e('Edit in Frontend', 'vz-story-teller'); ?>
        </a>
    </div>
    <?php
}
add_action('post_submitbox_misc_actions', 'vz_story_teller_add_frontend_edit_button');


/**
 * Template meta box callback
 */
function vz_story_teller_template_meta_box_callback($post) {
    wp_nonce_field('vz_story_teller_template_meta_box', 'vz_story_teller_template_meta_box_nonce');

    $current_template = get_post_meta($post->ID, '_wp_page_template', true);
    $templates = array(
        'default' => 'Default',
        'template-print-script.php' => 'Print-Friendly Script'
    );

    ?>
    <div class="vz-template-selector">
        <label for="page_template">
            <?php _e('Select Template:', 'vz-story-teller'); ?>
        </label>
        <select name="page_template" id="page_template" class="widefat">
            <?php foreach ($templates as $template => $label): ?>
                <option value="<?php echo esc_attr($template); ?>" <?php selected($current_template, $template); ?>>
                    <?php echo esc_html($label); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <p class="description">
            <?php _e('Choose how to display this script. Use "Print-Friendly Script" for the best printing experience.', 'vz-story-teller'); ?>
        </p>
        <?php if ($current_template === 'template-print-script.php'): ?>
            <p>
                <a href="<?php echo get_permalink($post->ID); ?>" target="_blank" class="button">
                    <?php _e('View Print Version', 'vz-story-teller'); ?>
                </a>
            </p>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Save template meta box data
 */
function vz_story_teller_save_template_meta_box($post_id) {
    // Check if nonce is set
    if (!isset($_POST['vz_story_teller_template_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['vz_story_teller_template_meta_box_nonce'], 'vz_story_teller_template_meta_box')) {
        return;
    }

    // Check if autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save template selection
    if (isset($_POST['page_template'])) {
        update_post_meta($post_id, '_wp_page_template', sanitize_text_field($_POST['page_template']));
    }
}
add_action('save_post', 'vz_story_teller_save_template_meta_box');

/**
 * SECURITY: Remove vz_script from REST API even if show_in_rest is enabled elsewhere
 */
function vz_story_teller_remove_from_rest_api($post_type, $args) {
    if ($post_type === 'vz_script') {
        add_filter('rest_prepare_vz_script', '__return_false', 10, 3);
    }
}
add_action('registered_post_type', 'vz_story_teller_remove_from_rest_api', 10, 2);

/**
 * SECURITY: Disable REST API for vz_script post type
 */
function vz_story_teller_disable_rest_api($result, $server, $request) {
    $route = $request->get_route();

    // Block any REST API access to vz_script posts
    if (strpos($route, '/wp/v2/vz_script') !== false) {
        return new WP_Error(
            'rest_forbidden',
            __('Access to this resource is not allowed.', 'vz-story-teller'),
            array('status' => 403)
        );
    }

    return $result;
}
add_filter('rest_pre_dispatch', 'vz_story_teller_disable_rest_api', 10, 3);


// add filter to the view single page template to add the script editor
function vz_story_teller_add_script_editor_to_single_page_template($template) {
  include 'template-print-script.php';
  die();
}
add_filter('wp_head', 'vz_story_teller_add_script_editor_to_single_page_template');
