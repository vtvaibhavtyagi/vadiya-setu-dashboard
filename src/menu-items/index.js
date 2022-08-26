import dashboard from "./dashboard";
import pages from "./pages";
import utilities from "./utilities";
import docUtil from "./doc_utils";
import patUtils from "./pat_utils";
import other from "./other";
import AuthContext from "AuthContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
// ==============================|| MENU ITEMS ||============================== //

function SomeFunc() {
  var Mn_items = [];

  // const AuthState = useContext(AuthContext);
  var auth_data = JSON.parse(localStorage.getItem("auth_data"));
  if (!auth_data) {
  } else if (auth_data.role === "doc") {
    Mn_items = [dashboard, docUtil, other];
  } else if (auth_data.role === "pat") {
    Mn_items = [dashboard, patUtils, other];
  } else {
    Mn_items = [dashboard, pages, utilities, other];
  }

  // // const [isLoading, setLoading] = useState(true);
  //     // useEffect(() => {
  //     //     setLoading(false);
  //     //     if( AuthState.state.id ){
  //     //       if( AuthState.state.role === 'doc'  ){
  //     //         Mn_items = {items: [dashboard, docUtil, other]}
  //     //         console.log("Mn_items",Mn_items)
  //     //       }
  //     //       else if( AuthState.state.role === 'pat'  ){
  //     //         Mn_items = {items: [dashboard, utilities, other]}
  //     //       }
  //     //     }else{
  //     //         Mn_items = {items: [dashboard, pages, utilities, other]}
  //     //     }

  //     // }, []);

  return Mn_items;
}
var items = SomeFunc(); //[dashboard, utilities, other]

const MenuItems = { items };
//  AuthState.state.role === 'doc' ? {
//     // items: [dashboard, pages, utilities, other]
//     items: [dashboard, docUtil, other]
// } :  {
//     // items: [dashboard, pages, utilities, other]
//     items: [dashboard, utilities, other]
// }

export default MenuItems;
