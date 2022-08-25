import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/vadiyaSetu.js')));
const UtilsMedicalRecord = Loadable(lazy(() => import('views/utilities/MedicalRecord')));
const Utilspastpatient = Loadable(lazy(() => import('views/utilities/pastpatient')));
const Utilscurrpatient = Loadable(lazy(() => import('views/utilities/currPatient')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/PastApprovals')));
const UtilsPendingApprovals = Loadable(lazy(() => import('views/utilities/PendApprov')));
const Test = Loadable(lazy(() => import('views/utilities/test.js')));
const UtilsScanner = Loadable(lazy(() => import('views/utilities/Scanner')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const UtilsPatientRecord = Loadable(lazy(() => import('views/utilities/PatientRecord')))

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'vadiyasetu-card',
                    element: <UtilsTypography />
                }
            ]
        },
            
        {
            path: 'utils',
            children: [
                {
                    path: 'Medical-Records',
                    element: <UtilsMedicalRecord  />
                }
            ]

        },
        {
            path: 'utils',
            children: [
                {
                    path: 'patient-history',
                    element: <Utilspastpatient />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'curr-patient',
                    element: <Utilscurrpatient />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'scanner',
                    element: <UtilsScanner />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },{
            path: 'utils',
            children: [
                {
                    path: 'patient-record',
                    element: <UtilsPatientRecord />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'pendingApprovals',
                    element: <UtilsPendingApprovals />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
