const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts(req.query);
    
    if (posts.length < 1) {
      return res.status(404).json({ message: 'No posts found' });
    }

    const postsWithImages = await Promise.all(posts.map(async (post) => {
      try {
        const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const images = photos.slice(0, 3).map(photo => ({
          albumId: photo.albumId,
          id: photo.id,
          title: photo.title,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
        }));
        
        return {
          ...post,
          images
        };
      } catch (error) {
        console.error(`Error fetching photos for post ${post.id}:`, error);
        return {
          ...post,
          images: []
        };
      }
    }));

    res.status(200).json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
