import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import AuthContext from 'AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';
// ==============================|| MENU ITEMS ||============================== //


const MenuItems = {
    // items: [dashboard, pages, utilities, other]
    items: [dashboard, utilities, other]
}


export default MenuItems;
