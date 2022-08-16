// material-ui
import { useTheme } from '@mui/material/styles';
import logo from '../assets/images/logo.svg'
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
    
        <img src={logo} alt="Berry" width="80" />
         
        // <svg width="92" height="32" viewBox="0 0 92 32" fill="none">
          
        // </svg>
    );
};

export default Logo;
