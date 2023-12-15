import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';

const WriteBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState('16px');
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/blogs', {
        title,
        content,
        font,
        fontSize,
      });

      if (response.status === 200) {
        console.log('Blog post created successfully');
      
        setTitle('');
        setContent('');
      
        setShowPopup(false);
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div>
      <h2>Write a Blog</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <div
          contentEditable
          style={{
            border: '1px solid #ccc',
            minHeight: '200px',
            padding: '8px',
            fontFamily: font,
            fontSize: fontSize,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => setContent(e.target.innerHTML)}
        />
      </div>
      <div>
        <label>Font:</label>
        <select onChange={(e) => setFont(e.target.value)}>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Times New Roman, serif">Times New Roman</option>
        </select>
      </div>
      <div>
        <label>Font Size:</label>
        <select onChange={(e) => setFontSize(e.target.value)}>
          <option value="16px">16</option>
          <option value="18px">18</option>
        </select>
      </div>
      <div>
        <button onClick={() => setShowPopup(true)}>Preview</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <Popup
        title="Preview"
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
      >
        <h3 style={{ fontFamily: font, fontSize: fontSize }}>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Popup>
    </div>
  );
};

export default WriteBlog;