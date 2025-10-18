<?php
/**
 * Plugin Name: VZ Story Teller
 * Plugin URI: https://example.com/vz-story-teller
 * Description: A WordPress plugin for creating and managing interactive stories
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
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
        'supports'              => array('title', 'thumbnail', 'revisions'),
        'taxonomies'            => array('category', 'post_tag'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-media-document',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
    );

    register_post_type('vz_script', $args);
}
add_action('init', 'vz_story_teller_register_post_type', 0);


function vz_story_teller_edit_script_page() {
  if ($_GET['action'] === 'edit' && $_GET['vz_front'] === 'true') {
    $post_id = $_GET['post'];
    $post = get_post($post_id);
    $post_type = $post->post_type;
    if ($post_type !== 'vz_script') {
      return;
    }
    include 'script-editor.php';
    die();
  }
}

add_action('admin_init', 'vz_story_teller_edit_script_page');


// Add a new endpoint for the API
function vz_story_teller_add_api_endpoint() {
  register_rest_route('vz-story-teller/v1', '/script', array(
    'methods' => 'POST',
    'callback' => 'vz_story_teller_save_script',
    'permission_callback' => 'vz_story_teller_check_permissions',
  ));
}
add_action('rest_api_init', 'vz_story_teller_add_api_endpoint');

// Check if user has permission to edit the script
function vz_story_teller_check_permissions($request) {
  $post_id = $request->get_param('post_id');

  // Check if user is logged in and can edit the post
  if (!current_user_can('edit_post', $post_id)) {
    return new WP_Error(
      'rest_forbidden',
      __('You do not have permission to edit this script.', 'vz-story-teller'),
      array('status' => 403)
    );
  }

  return true;
}

function vz_story_teller_save_script($request) {
  $script = $request->get_param('script');
  $post_id = $request->get_param('post_id');
  update_post_meta($post_id, 'vz_script', $script);
  return new WP_REST_Response(array('message' => 'Script saved'), 200);
}
