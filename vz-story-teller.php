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
        'supports'              => array('title', 'editor', 'thumbnail', 'custom-fields', 'revisions'),
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

/**
 * Add custom meta box for Script Editor
 */
function vz_story_teller_add_meta_boxes() {
    add_meta_box(
        'vz_script_editor',
        __('Script Content', 'vz-story-teller'),
        'vz_story_teller_script_editor_callback',
        'vz_script',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'vz_story_teller_add_meta_boxes');

/**
 * Callback function for Script Editor meta box
 */
function vz_story_teller_script_editor_callback($post) {
    // Add nonce for security
    wp_nonce_field('vz_story_teller_script_editor_nonce', 'vz_story_teller_script_editor_nonce');
    // import the script editor
    wp_enqueue_script('vz-story-teller-script-editor', plugin_dir_url(__FILE__) . 'frontend/dist/index.js', array(), '1.0.0', true);
    ?>
    <div class="vz-script-editor-wrapper" id="vz-script-editor">
    </div>
    <?php
}

/**
 * Save Script Editor meta box data
 */
function vz_story_teller_save_script_editor($post_id) {
    // Check if nonce is valid
    if (!isset($_POST['vz_story_teller_script_editor_nonce']) ||
        !wp_verify_nonce($_POST['vz_story_teller_script_editor_nonce'], 'vz_story_teller_script_editor_nonce')) {
        return;
    }

    // Check if user has permission to edit the post
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Check if not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check if not a revision
    if (wp_is_post_revision($post_id)) {
        return;
    }

    // Save the meta field
    if (isset($_POST['vz_script_content'])) {
        update_post_meta($post_id, '_vz_script_content', sanitize_textarea_field($_POST['vz_script_content']));
    }
}
add_action('save_post', 'vz_story_teller_save_script_editor');
