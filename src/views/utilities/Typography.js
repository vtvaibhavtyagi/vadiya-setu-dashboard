import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => (
    <MainCard title="Basic Typography" >
        <Grid container spacing={gridSpacing}>
            
            <Grid item xs={12} sm={6}>
                <SubCard title="Sub title">
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <MuiTypography variant="subtitle1" gutterBottom>
                               
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="subtitle2" gutterBottom>
                               
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Body">
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <MuiTypography variant="body1" gutterBottom>
                               
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="body2" gutterBottom>
                                
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
           
        </Grid>
    </MainCard>
);

export default Typography;
