// assets
import {IconHistory,IconId, IconUserCheck, IconShadow, IconFileCheck,IconReportMedical } from '@tabler/icons';
import AuthContext from 'AuthContext';
import { useContext } from 'react';


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

const docUtil = {
    id: 'docUtil',
    title: 'docUtil',
    type: 'group',
    children: [
       
        {
            id: 'util-Medical-Records',
            title: 'Medical Records',
            type: 'item',
            url: '/utils/Medical-Records',
            icon: icons.IconReportMedical,
            breadcrumbs: false
        },
        {
            id: 'util-patient-history',
            title: 'Patient History',
            type: 'item',
            url: '/utils/patient-history',
            icon: icons.IconHistory,
            breadcrumbs: false
        },
        {
            id: 'util-curr-patient',
            title: 'Current Patient Details',
            type: 'item',
            url: '/utils/curr-patient',
            icon: icons.IconReportMedical,
            breadcrumbs: false
        }
       
    ]
};

export default docUtil;
