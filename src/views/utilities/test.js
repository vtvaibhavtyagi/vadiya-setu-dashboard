// return (
  //   <>
  //     <MainCard content={false}>
  //       <CardContent>
  //         <Grid container spacing={gridSpacing}>
  //           <Grid item xs={12}>
  //             <Grid
  //               container
  //               alignContent="center"
  //               justifyContent="space-between"
  //             >
  //               <Grid item>
  //                 <Typography variant="h3" color="inherit">
  //                   Doctor
  //                 </Typography>
  //               </Grid>
  //               <Grid item>
  //                 <Typography variant="h3" color="inherit">
  //                   Specilization
  //                 </Typography>
  //               </Grid>
  //               <Grid item>
  //                 <Typography variant="h3" color="inherit">
  //                   Hospital
  //                 </Typography>
  //               </Grid>
  //               <Grid item>
  //                 <Typography variant="h3" color="inherit">
  //                   Action
  //                 </Typography>
  //               </Grid>
  //             </Grid>
  //           </Grid>

  //           {/* doctor details */}
  //           {patientList.map((ele) => (
  //             <Grid item xs={12}>
  //               <Grid
  //                 container
  //                 alignItems="center"
  //                 justifyContent="space-between"
  //               >
  //                 <Grid item>
  //                   <Typography variant="subtitle1" color="inherit">
  //                     {ele.doctorName}
  //                   </Typography>
  //                 </Grid>

  //                 <Grid item>
  //                   <Grid
  //                     container
  //                     alignItems="center"
  //                     justifyContent="space-between"
  //                   >
  //                     <Grid item>
  //                       <Typography variant="subtitle1" color="inherit">
  //                         {ele.did}
  //                       </Typography>
  //                     </Grid>
  //                   </Grid>
  //                 </Grid>

  //                 <Grid item>
  //                   <Grid
  //                     container
  //                     alignItems="center"
  //                     justifyContent="space-between"
  //                   >
  //                     <Grid item>
  //                       <Typography variant="subtitle1" color="inherit">
  //                         {ele.reqTime}
  //                       </Typography>
  //                     </Grid>
  //                   </Grid>
  //                 </Grid>

  //                 <Grid item>
  //                   <Grid
  //                     container
  //                     alignItems="center"
  //                     justifyContent="space-between"
  //                   >
  //                     <Grid item container>
  //                       <Grid item>
  //                         <CardActions
  //                           sx={{ p: 1.25, pt: 0, justifyContent: "center" }}
  //                         >
  //                           <Button
  //                             size="small"
  //                             disableElevation
  //                             sx={{
  //                               backgroundColor: theme.palette.success.light,
  //                               color: theme.palette.success.dark,
  //                             }}
  //                             onClick={() => AcceptReq(AuthState, ele)}
  //                           >
  //                             Accept
  //                           </Button>
  //                         </CardActions>
  //                       </Grid>

  //                       <Grid item>
  //                         <Grid item>
  //                           <CardActions
  //                             sx={{
  //                               p: 1.25,
  //                               pt: 0,
  //                               justifyContent: "center",
  //                             }}
  //                           >
  //                             <Button
  //                               size="small"
  //                               disableElevation
  //                               sx={{
  //                                 backgroundColor: theme.palette.error.light,
  //                                 color: theme.palette.error.dark,
  //                               }}
  //                             >
  //                               Reject
  //                             </Button>
  //                           </CardActions>
  //                         </Grid>
  //                       </Grid>
  //                     </Grid>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>

  //               <Divider sx={{ my: 1.5 }} />
  //             </Grid>
  //           ))}
  //         </Grid>
  //       </CardContent>

  //       <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
  //         <Button size="small" disableElevation>
  //           {isEmpty ? "View All" : "No pending requests"}
  //           <ChevronRightOutlinedIcon />
  //         </Button>
  //       </CardActions>
  //     </MainCard>
  //   </>
  // );