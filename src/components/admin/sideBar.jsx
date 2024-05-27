"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import './Sidebar.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 100 }}
      animate={{ width: open ? '300px' : '60px' }}
      className={`sidebar ${open ? 'open' : ''}`}
    >
      <div className="sidebar-container">
        <div className="menu-icon" onClick={toggle}>
          <MenuIcon />
        </div>

       

        <div className="menu">
          <div>
            <div className="menu-item">
              <Link href="/">
                <div className="flex items-center" onClick={toggle}>
                  <i className="bx bx-home custom-icon"></i>
                  {open && <p>Home</p>}
                </div>
              </Link>
            </div>
            <div className="menu-item">
            <Link href="./reservations">
                <div className="flex items-center" onClick={toggle}>
                  <i className="bx bx-home custom-icon"></i>
                  {open && <p>Reservation</p>}
                </div>
              </Link>
            </div>
            <div className="menu-item">
              <Link href="./destinations">
                <div className="flex items-center" onClick={toggle}>
                  <i className="bx bx-home custom-icon"></i>
                  {open && <p>Destination</p>}
                </div>
              </Link>
            </div>
            <div className="menu-item">
              <Link href="./forfaits">
                <div className="flex items-center" onClick={toggle}>
                  <i className="bx bx-home custom-icon"></i>
                  {open && <p>Forfait</p>}
                </div>
              </Link>
            </div>

           

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
