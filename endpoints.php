<?php
// Register REST API endpoint for "seasons" post type
add_action('rest_api_init', function () {

  register_rest_route('vz-st/v1', '/seasons', [
    'methods'  => 'GET',
    'callback' => 'vzst_get_seasons',
    'permission_callback' => 'vzst_permission_callback',
  ]);

  register_rest_route('vz-st/v1', '/episode', [
    'methods'  => 'POST',
    'callback' => 'vzst_create_episode',
    'permission_callback' => 'vzst_permission_callback',
  ]);

});

function vzst_permission_callback() {
  // Allow access to all users, including unauthenticated
  return true;
}

function vzst_get_seasons($request) {
  $data = [
    'seasons' => [],
  ];
  return rest_ensure_response($data);
}

function vzst_create_episode($request) {
  $data = $request->get_json_params();

  // Validate and process the data
  if (empty($data['title']) || empty($data['content'])) {
    return new WP_Error('missing_data', 'Title and content are required.', ['status' => 400]);
  }

  $episode_data = [
    'post_title'   => sanitize_text_field($data['title']),
    'post_status'  => 'publish',
    'post_type'    => 'episode',
  ];

  $episode_id = wp_insert_post($episode_data);

  if (is_wp_error($episode_id)) {
    return new WP_Error('insert_failed', 'Failed to create episode.', ['status' => 500]);
  }

  return rest_ensure_response(['id' => $episode_id]);
}
