import React from 'react';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';
import '../App.css';

export const Friends = () => {
    return (
      <>
        <TopBar />
        <div className="friends">
          <div className="friends-header">
            <h2> Your Friends </h2>
          </div>
        </div>
        <Footer />
      </>
    );
};


export default Friends;