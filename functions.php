<?php
/**
 * Plugin Name: Viroz Story Teller
 * Plugin URI: https://viroz.studio/projects/vz-story-teller
 * Description: A plugin to create and manage scripts in WordPress.
 * Version: 0.0.1
 * Author: Melisa Viroz
 * Author URI: https://melisaviroz.com
 * License: GPL2
 * Text Domain: vz-story-teller
 */

if ( ! function_exists( 'print_x' ) ) {
  function print_x( $data ) {
    echo '<pre>';
    print_r( $data );
    echo '</pre>';
  }
}

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// Plugin initialization code.
function vz_story_teller_init() {
  // Load the text domain for translations.
  load_plugin_textdomain( 'vz-story-teller', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

  // Register custom post types and taxonomies.
  vz_story_teller_register_post_types();

  // Add a custom page to the admin menu called "Story Teller".
  add_menu_page(
    __( 'Story Teller', 'vz-story-teller' ),
    __( 'Story Teller', 'vz-story-teller' ),
    'manage_options',
    'vz-story-teller',
    'vz_story_teller_page',
    'dashicons-book-alt', // Icon for the menu item.
    6 // Position in the menu.
  );
}
add_action( 'init', 'vz_story_teller_init' );

function vz_story_teller_page() {

  include (plugin_dir_path( __FILE__ ) . 'script_writer_input.php');
}

// prevent direct access to any of the post types
function vz_story_teller_prevent_direct_access() {
  if ( is_singular( array( 'season', 'episode', 'scene' ) ) && ! current_user_can( 'edit_posts' ) ) {
    wp_redirect( home_url() );
    exit;
  }
}

// remove from rest api
function vz_story_teller_remove_from_rest_api( $query ) {
  $protected = [
    'season',
    'episode',
    'scene',
    'arc',
    'character',
    'location',
    'prop',
    'actor',
    'theme',
  ];
  if ( ! is_admin() && $query->is_main_query() && ( is_singular( $protected ) || is_post_type_archive( array( 'season', 'episode', 'scene' ) ) ) ) {
    $query->set( 'rest_base', false );
  }
}
add_action( 'template_redirect', 'vz_story_teller_prevent_direct_access' );
add_action( 'pre_get_posts', 'vz_story_teller_remove_from_rest_api' );


// Register custom post types and taxonomies.
function vz_story_teller_register_post_types() {
  // Register the "Season" custom post type.
  register_post_type( 'season', array(
    'labels' => array(
      'name' => __( 'Seasons', 'vz-story-teller' ),
      'singular_name' => __( 'Season', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );

  // Register the "Episode" custom post type.
  register_post_type( 'episode', array(
    'labels' => array(
      'name' => __( 'Episodes', 'vz-story-teller' ),
      'singular_name' => __( 'Episode', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );

  // Scene
  register_post_type( 'scene', array(
    'labels' => array(
      'name' => __( 'Scenes', 'vz-story-teller' ),
      'singular_name' => __( 'Scene', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'thumbnail' ),
  ) );

  // Arc
  register_taxonomy( 'arc', array( 'season', 'episode', 'scene' ), array(
    'labels' => array(
      'name' => __( 'Arcs', 'vz-story-teller' ),
      'singular_name' => __( 'Arc', 'vz-story-teller' ),
    ),
  ) );

  // Character
  register_post_type( 'character', array(
    'labels' => array(
      'name' => __( 'Characters', 'vz-story-teller' ),
      'singular_name' => __( 'Character', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );
  // Register the "Location" custom post type.
  register_post_type( 'location', array(
    'labels' => array(
      'name' => __( 'Locations', 'vz-story-teller' ),
      'singular_name' => __( 'Location', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );
  // Register the "Prop" custom post type.
  register_post_type( 'prop', array(
    'labels' => array(
      'name' => __( 'Props', 'vz-story-teller' ),
      'singular_name' => __( 'Prop', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );
  // Register the "Actor" custom post type.
  register_post_type( 'actor', array(
    'labels' => array(
      'name' => __( 'Actors', 'vz-story-teller' ),
      'singular_name' => __( 'Actor', 'vz-story-teller' ),
    ),
    'public' => true,
    'has_archive' => false,
    'supports' => array( 'title', 'editor', 'thumbnail' ),
  ) );
  // Register the "Theme" custom taxonomy.
  register_taxonomy( 'theme', array( 'season', 'episode', 'scene' ), array(
    'labels' => array(
      'name' => __( 'Themes', 'vz-story-teller' ),
      'singular_name' => __( 'Theme', 'vz-story-teller' ),
    ),
    'hierarchical' => true,
    'show_admin_column' => true,
  ) );
}


// Add custom meta boxes for the "Season" post type.
function vz_story_teller_add_meta_boxes() {
  add_meta_box(
    'season_details',
    __( 'Season Details', 'vz-story-teller' ),
    'vz_story_teller_render_season_meta_box',
    'season',
    'normal',
    'high'
  );
  add_meta_box(
    'episode_details',
    __( 'Episode Details', 'vz-story-teller' ),
    'vz_story_teller_render_episode_meta_box',
    'episode',
    'normal',
    'high'
  );
}
add_action( 'add_meta_boxes', 'vz_story_teller_add_meta_boxes' );

function vz_st_hierarchy_input( $hierarchy, $pt ) {
  include (plugin_dir_path( __FILE__ ) . 'hierarchy_input.php');
}

// Render the custom meta box for the "Season" post type.
function vz_story_teller_render_season_meta_box( $post ) {
  // Add a nonce field for security.
  wp_nonce_field( 'vz_story_teller_save_season_meta_box', 'vz_story_teller_season_meta_box_nonce' );

  // Retrieve existing values from the database.
  $hierarchy = get_post_meta( $post->ID, '_season_episodes', true );
  vz_st_hierarchy_input( $hierarchy, "episode" );
}

// Save the custom meta box data for the "Season" post type.
function vz_story_teller_save_season_meta_box( $post_id ) {
  // Check if the nonce is set and valid.
  if ( ! isset( $_POST['vz_story_teller_season_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['vz_story_teller_season_meta_box_nonce'], 'vz_story_teller_save_season_meta_box' ) ) {
    return;
  }
  // Check if the user has permission to save the data.
  if ( ! current_user_can( 'edit_post', $post_id ) ) {
    return;
  }
  $hierarchy_posts = $_POST['vzst-posts'];
  $hierarchy_created = [];
  foreach ( $hierarchy_posts as $p_id ) {
    if ( empty( $p_id ) ) continue;
    if ( is_numeric($p_id) ) {
      $hierarchy_created[] = $p_id;
    } else {
      // Temporarily remove the save_post action to prevent infinite loop.
      remove_action( 'save_post', 'vz_story_teller_save_season_meta_box' );

      $n_id = wp_insert_post( [
        'post_title' => $p_id,
        'post_type' => 'episode',
      ]);

      // Re-add the save_post action.
      add_action( 'save_post', 'vz_story_teller_save_season_meta_box' );

      if ( ! is_wp_error( $n_id ) ) {
        $hierarchy_created[] = $n_id;
      }
    }
  }
  update_post_meta( $post_id, '_season_episodes', $hierarchy_created );
}
add_action( 'save_post', 'vz_story_teller_save_season_meta_box' );


// Render the custom meta box for the "episode" post type.
function vz_story_teller_render_episode_meta_box( $post ) {
  // Add a nonce field for security.
  wp_nonce_field( 'vz_story_teller_save_episode_meta_box', 'vz_story_teller_episode_meta_box_nonce' );

  // Retrieve existing values from the database.
  $hierarchy = get_post_meta( $post->ID, '_episode_scenes', true );
  vz_st_hierarchy_input( $hierarchy, "scene" );
}

// Save the custom meta box data for the "episode" post type.
function vz_story_teller_save_episode_meta_box( $post_id ) {
  // Check if the nonce is set and valid.
  if ( ! isset( $_POST['vz_story_teller_episode_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['vz_story_teller_episode_meta_box_nonce'], 'vz_story_teller_save_episode_meta_box' ) ) {
    return;
  }
  // Check if the user has permission to save the data.
  if ( ! current_user_can( 'edit_post', $post_id ) ) {
    return;
  }
  $hierarchy_posts = $_POST['vzst-posts'];
  $hierarchy_created = [];
  foreach ( $hierarchy_posts as $p_id ) {
    if ( empty( $p_id ) ) continue;
    if ( is_numeric($p_id) ) {
      $hierarchy_created[] = $p_id;
    } else {
      // Temporarily remove the save_post action to prevent infinite loop.
      remove_action( 'save_post', 'vz_story_teller_save_episode_meta_box' );

      $n_id = wp_insert_post( [
        'post_title' => $p_id,
        'post_type' => 'scene',
      ]);

      // Re-add the save_post action.
      add_action( 'save_post', 'vz_story_teller_save_episode_meta_box' );

      if ( ! is_wp_error( $n_id ) ) {
        $hierarchy_created[] = $n_id;
      }
    }
  }
  update_post_meta( $post_id, '_episode_scenes', $hierarchy_created );
}
add_action( 'save_post', 'vz_story_teller_save_episode_meta_box' );



// Enqueue scripts and styles for the plugin.
function vz_story_teller_enqueue_scripts( $hook ) {
  // Only enqueue on specific admin pages if needed.
  if ( 'post.php' === $hook || 'post-new.php' === $hook ) {
    wp_enqueue_script(
      'vz-story-teller-admin-script',
      plugin_dir_url( __FILE__ ) . 'functions.js',
      array( 'jquery' ),
      '1.0.0',
      true
    );

    wp_enqueue_style(
      'vz-story-teller-admin-style',
      plugin_dir_url( __FILE__ ) . 'styles.css',
      array(),
      '1.0.0'
    );
  }

  // Enqueue scripts and styles for the script writer page only
  if ( 'toplevel_page_vz-story-teller' === $hook ) {
    wp_enqueue_script(
      'vz-story-teller-script-writer',
      plugin_dir_url( __FILE__ ) . 'script_writer/dist/assets/index.js',
      array( 'wp-api-fetch' ),
      '1.0.0',
      true
    );
    wp_enqueue_style(
      'vz-story-teller-script-writer',
      plugin_dir_url( __FILE__ ) . 'script_writer/dist/assets/index.css',
      [],
      '1.0.0'
    );
  }
}
add_action( 'admin_enqueue_scripts', 'vz_story_teller_enqueue_scripts' );
