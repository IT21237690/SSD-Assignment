import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:8070/announcement');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Notice Board</h1>
        <br/>
        <br/>
        <br/>
        <table className="notice-chart">
          <thead>
            <tr>
              <th>Message</th>
              <th>Posted Date</th>
              <th>Posted Time</th>
              <th>Posted By</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id}>
                <td>{notice.message}</td>
                <td>{notice.date}</td>
                <td>{notice.time}</td>
                <td>{notice.from}</td>
                <td>{notice.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeBoard;
