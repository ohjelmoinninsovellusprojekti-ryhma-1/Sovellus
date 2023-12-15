import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';

const Blog = ({ blog, onDelete, onEdit }) => {
  const [reactions, setReactions] = useState(0);
  const navigate = useNavigate();

  const handleMakeNewPost = () => {
    navigate('/blogs/writeblog');
  };

  const handleReact = async () => {

    setReactions(reactions + 1);
  };

  return (
    <div className="groups-container">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <div>
        <button onClick={onEdit}>Edit Post</button>
        <button onClick={onDelete}>Delete Post</button>
        <span>{reactions} Reactions</span>
        <button onClick={handleReact}>👍 React</button>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/my-blogs').then((response) => {
      setMyBlogs(response.data);
    });

    axios.get('/api/all-blogs').then((response) => {
      setAllBlogs(response.data);
    });
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleMakeNewPost = () => {
    navigate('/blogs/write');
  };

  const handleNewPostCreated = (newPost) => {
    setMyBlogs((prevBlogs) => [newPost, ...prevBlogs]);
  };

  return (
    <>
    <div className="groups-container">
        <div className="groups-info"></div>
      <h2>My Blogs</h2>
      <button onClick={handleMakeNewPost}>Make New Post</button>
      {myBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDelete={() => handleDelete(blog.id)} />
      ))}

      <h2>All Blogs</h2>
      {allBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
    <TopBar />
    <Footer />
    </>
);

};

export default Blogs;