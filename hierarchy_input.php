<?php

$args = array(
  'post_type' => $pt,
  'posts_per_page' => -1,
  'post_status' => 'publish',
  'orderby' => 'title',
  'order' => 'ASC',
);
$posts = get_posts( $args );

?>

<div class="add-post">
  <label for="vzst-posts">Select a post:</label>
  <select id="vzst-posts" class="--new" name="vzst-posts">
    <option value="new" selected><?php esc_html_e( 'Create new', 'vz-story-teller' ); ?></option>
    <?php foreach ( $posts as $post ) : ?>
      <option value="<?php echo esc_attr( $post->ID ); ?>">
        <?php echo esc_html( $post->post_title ); ?>
      </option>
    <?php endforeach; ?>
  </select>
  <input type="text" name="vzst-posts-title" id="vzst-posts-title" placeholder="<?php esc_attr_e( 'Title', 'vz-story-teller' ); ?>" />
  <button type="button" data-vzst-add>
    Add
  </button>
</div>

<ul id="vzst-post-list">
  <?php 
  vzst_post_item( (object) array(
    'ID' => 0,
    'post_title' => __( 'Add new post', 'vz-story-teller' ),
  ) );
    if ( $hierarchy ) : 
      foreach ( $hierarchy as $post_id ) : 
        $post = get_post( $post_id );
        if ( ! $post ) {
          continue;
        }
        vzst_post_item( $post );  
      endforeach; 
    endif;
    
   ?>
</ul>

<?php 

function vzst_post_item( $post ) {
  ?>
  <li class="vzst-post-item">
    <input type="hidden" class="post_id" name="vzst-posts[]" value="<?php echo esc_attr( $post->ID ); ?>" />
    <span class="vzst-post-title">
      <?php echo esc_html( $post->post_title ); ?>
    </span>
    <button type="button" class="vzst-remove-post" data-vzst-up>
      Up
    </button>
    <button type="button" class="vzst-remove-post" data-vzst-down>
      Down
    </button>
    <button type="button" class="vzst-remove-post" data-vzst-remove>
      Remove
    </button>
  </li>
  <?php
}