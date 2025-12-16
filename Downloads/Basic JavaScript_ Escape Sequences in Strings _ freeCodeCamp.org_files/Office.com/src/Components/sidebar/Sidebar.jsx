import React from 'react'
import './Sidebar.css'; // Make sure to create a CSS file for styling
function Sidebar({openNav}) {
  return (
    <aside className={`sidebar h-screen bg-[#0a0a0a]  max-lg:absolute  ${openNav?"max-lg:left-0":"max-lg:-left-full"}`}>
    
    <div className="sidebar-header">
        <h2> <img src="src/components/Navbars/logo.jpg" alt="" /> OFFICE</h2>
        <div className='input-box'>
        <input type="text" placeholder="Search" className="search-bar" />
        <ion-icon name="search-outline"></ion-icon>
        </div>
      </div>
      <div className="sidebar-section">
        <h3>Application</h3>
        <ul>
        <li className='active'><ion-icon name="pie-chart"></ion-icon> Dashboard </li>
          <li><ion-icon name="grid"></ion-icon> Overview</li>
          <li><ion-icon name="calendar"></ion-icon> Timeline</li>
          
          <li><ion-icon name="person"></ion-icon> Users</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Others</h3>
        <ul>
          <li><ion-icon name="trending-up"></ion-icon> Activity</li>
          <li><ion-icon name="mail-unread"></ion-icon> Messages<span className="notification-badge">2</span></li>
          <li><ion-icon name="settings"></ion-icon> Settings</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar

