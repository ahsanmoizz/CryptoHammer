import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Layout.css'; // Import the sidenav CSS

const Layout = () => {
  return (
    <>
      {/* Sidebar Navigation */}
      <div className="sidenav">
        <Link to="/">Home</Link>
        <Link to="contact">Contact</Link>
        <Link to="createauction">Create Auction</Link>
        <Link to="mybids">My Bids</Link>
        <Link to="auctionlist">Auction List</Link>
        <Link to="finalizebid">Finalize Bid</Link>
        <Link to="withdraw">withdraw</Link>
      </div>
      
      {/* Main Content Area */}
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
