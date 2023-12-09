import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';

const Groups = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [popularGroups, setPopularGroups] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const response = await axios.get('/api/my-groups');
        setMyGroups(response.data);
      } catch (error) {
        console.error('Error fetching My Groups:', error.message);
      }
    };

    const fetchPopularGroups = async () => {
      try {
        const response = await axios.get('/api/popular-groups');
        setPopularGroups(response.data);
      } catch (error) {
        console.error('Error fetching Popular Groups:', error.message);
      }
    };

    const fetchGroupRequests = async () => {
      try {
        const response = await axios.get('/api/group-requests');
        setGroupRequests(response.data);
      } catch (error) {
        console.error('Error fetching Group Requests:', error.message);
      }
    };

    fetchMyGroups();
    fetchPopularGroups();
    fetchGroupRequests();
  }, []);

  return (
    <>
      <div className="groups-container">
        <h2 className="groups-header2">MOVIEHUB Community</h2>
        <div className="groups-info">
          <h2 className="groups-header">My Groups</h2>
          {myGroups.length > 0 ? (
            <ul className="groups-list">
              {myGroups.map((group) => (
                <li key={group.id} className="groups-item">
                  {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="groups-message">You don't have any groups.</p>
          )}
        </div>

        <div className="groups-info">
          <h2 className="groups-header">Popular Groups</h2>
          {popularGroups.length > 0 ? (
            <ul className="groups-list">
              {popularGroups.map((group) => (
                <li key={group.id} className="groups-item">
                  {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="groups-message">No popular groups at the moment.</p>
          )}
        </div>

        <div className="groups-info">
          <h2 className="groups-header">Make Group(s)</h2>
          {/* Tässä voipi lissää mahiksen tehdä uusi ryhmä ja hallita liittymispyyntöjä */}
        </div>
      </div>

      {/* TopBar/Footer component */}
      <TopBar />
      <Footer />
    </>
  );
};

export default Groups;