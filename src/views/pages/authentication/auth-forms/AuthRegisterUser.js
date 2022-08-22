import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import health from  'api/health';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const SingUpData = async (data) => {
        let response = await health.post("/patient/register", data)
        response = await response.data
        console.log(response)
        return response;
    }
    
      const SingUpSubmit = (values) => {
        // e.preventDefault();
        var data = {
           
           
            "address": values.address,
            "aadhar": values.aadhar,
            "district": values.district,            
            "email": values.email,
            "name": values.fname + ' ' + values.lname ,
            "password": values.password ,
            "phone": values.mobno,
            "pincode": values.pincode,
            "state": values.istate
           
          }
        let res = SingUpData(data);
        // let navigate = useNavigate(); 
        if (res.status === 'success'){
                // const routeChange = () =>{ 
                // let path = `/pages/login/login3`; 
                // navigate(path);
                // }
                console.log("SuccessFullSingUp")
        }else{
            console.log("errorInSingUp")
        }        
        
      };

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null,
                    fname:'',
                    lname:'',
                    address:'',
                    pincode:'',
                    aadhar:'',
                    mobno:'',
                    istate:'',
                    district:''

                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    fname: Yup.string().required('First Name is Required'),
                    lname: Yup.string().required('Last Name is Required'),
                    address: Yup.string().required('Address is Required'),
                    aadhar: Yup.number().required('Aadhar No. is Required'),
                    mobno: Yup.number().required('Mobile no. is Required'),
                    pincode: Yup.number().required('Pin Code is Required'),
                    istate: Yup.string().required('State is Required'),
                    district: Yup.string().required('District is Required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            console.log(values.email);
                            SingUpSubmit(values);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.fname && errors.fname)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-fname-register">First Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-fname-register"
                                type="name"
                                value={values.fname}
                                // onChange={e => setEmail(e.target.value)}
                                name="fname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.fname && errors.fname && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.fname}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.lname && errors.lname)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-lname-register">Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-lname-register"
                                type="name"
                                value={values.lname}
                                // onChange={e => setEmail(e.target.value)}
                                name="lname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.lname && errors.lname && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.lname}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.mobno && errors.mobno)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-mobno-register">Mobile Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-mobno-register"
                                type="name"
                                value={values.mobno}
                                name="mobno"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.mobno && errors.mobno && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.mobno}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.aadhar && errors.aadhar)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-aadhar-register">Aadhar Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-aadhar-register"
                                type="number"
                                value={values.aadhar}
                                // onChange={e => setEmail(e.target.value)}
                                name="aadhar"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.aadhar && errors.aadhar && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.aadhar}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                // onChange={e => setEmail(e.target.value)}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-address-register">Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-address-register"
                                type="name"
                                value={values.address}
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.address && errors.address && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.address}
                                </FormHelperText>
                            )}
                        </FormControl>
                            
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.district && errors.district)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-district-register">District</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-district-register"
                                type="name"
                                value={values.district}
                                // onChange={e => setEmail(e.target.value)}
                                name="district"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.district && errors.district && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.district}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                        </Grid>


                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.istate && errors.istate)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-istate-register">State</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-istate-register"
                                type="name"
                                value={values.istate}
                                // onChange={e => setEmail(e.target.value)}
                                name="istate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.istate && errors.istate && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.istate}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={Boolean(touched.pincode && errors.pincode)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-pincode-register">Pin Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-pincode-register"
                                type="number"
                                value={values.pincode}
                                // onChange={e => setEmail(e.target.value)}
                                name="pincode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.pincode && errors.pincode && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.pincode}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                        </Grid>


                       
                        
                                                

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;