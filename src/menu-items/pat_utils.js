// assets
import {IconHistory,IconId, IconUserCheck, IconShadow, IconFileCheck,IconReportMedical } from '@tabler/icons';
import AuthContext from 'AuthContext';
import { useContext } from 'react';

// const AuthState = useContext(AuthContext);
// const [isLoading, setLoading] = useState(true);
//     useEffect(() => {
//         setLoading(false);
//         if( AuthState.state.id ){
//           if( AuthState.state.role !== 'pat'  ){
//             history("/utils/patient-history");
//           }
//         }else{
//           history("/login");
//         }

//     }, []);
// constant
const icons = {
    IconId,
    IconUserCheck,
    IconReportMedical,
    IconShadow,
    IconFileCheck,
    IconHistory
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const patUtils = {
    id: 'patUtils',
    title: 'patUtils',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'YadiyaSetu Card ',
            type: 'item',
            url: '/utils/vadiyasetu-card',
            icon: icons.IconId,
            breadcrumbs: false
        },
        {
            id: 'util-Medical-Records',
            title: 'Medical Records',
            type: 'item',
            url: '/utils/Medical-Records',
            icon: icons.IconReportMedical,
            breadcrumbs: false
        },      
       
        {
            id: 'approvals',
            title: 'Approvals',
            type: 'collapse',
            icon: icons.IconFileCheck,
            children: [
                {
                    id: 'tabler-Pending-Approvals',
                    title: 'Pending Approvals',
                    type: 'item',
                    url: '/patient/pendingApprovals',
                    breadcrumbs: false
                },
                {
                    id: 'material-Approvals-History',
                    title: 'Approvals History',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default patUtils;
