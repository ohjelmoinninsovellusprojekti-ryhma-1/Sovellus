import React from 'react';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';
import '../App.css';

export const Groups = () => {
    return (
      <>
        <TopBar />
        <div className="friends">
          <div className="friends-header">
            <h2> Your Groups </h2>
          </div>
        </div>
        <Footer />
      </>
    );
};


export default Groups;