
// import React from "react";
//  import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
// import ClearIcon from '@mui/icons-material/Clear';
// import _ from 'lodash';
// import { makeStyles } from '@mui/styles';
// import { ArrowDropDown } from "@mui/icons-material";

// const useStyles = makeStyles(() => ({
//   formControl: {
//     // margin: theme.spacing(1),
//     width: window.location.pathname ==='/report' ||  window.location.pathname ==='/college/placement-coordinator' ||  window.location.pathname === '/college'? 200: 250
//   },
//   indeterminateColor: {
//     color: "#f50057"
//   },
//   selectAllText: {
//     fontWeight: 500,
//     fontFamily: 'Montserrat'
//   },
//   selectedAll: {
//     backgroundColor: "rgba(0, 0, 0, 0.08)",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.08)"
//     }
//   },
//   listItemText: {
//     fontFamily: 'Montserrat'
//   },
//   resize:{
//     fontSize:13
//   },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 100
//     }
//   },
//   getContentAnchorEl: null,
//   anchorOrigin: {
//     vertical: "bottom",
//     horizontal: "center"
//   },
//   transformOrigin: {
//     vertical: "top",
//     horizontal: "center"
//   },
//   variant: "menu"
// };

// function MultiSelectDropDown(props) {
//   const classes = useStyles();
//   const value = props.value;
//   const isAllSelected = props.isAllSelected;
//   const list = props.list;
//   const isObject = props.isObject;
//   const key = props.keyValue;
//   const displayValue = props.displayValue;
//   const isDisabled = props.disabled;
//   const placeholder = props.placeholder;
//   const handleChange = (event,clear) => props.handleChange(event,clear);


//   const returnMenuItem = (option) => {
//     if (isObject) {
//       return (
//         <MenuItem key={option[key]} value={option[key]}>
//           <ListItemIcon>
//             <Checkbox checked={value.includes(option[key])} />
//           </ListItemIcon>
//           <ListItemText primary={option[displayValue]} classes={{primary: classes.listItemText}} primaryTypographyProps={{ style: { whiteSpace: "normal" } }}/>
//         </MenuItem>
//       )
//     }
//     else {
//       return (
//         <MenuItem key={option} value={option}>
//           <ListItemIcon>
//             <Checkbox checked={value.indexOf(option) > -1} />
//           </ListItemIcon>
//           <ListItemText primary={option} classes={{primary: classes.listItemText}} primaryTypographyProps={{ style: { whiteSpace: "normal" } }}/>
//         </MenuItem>
//       )
//     }
//   }

//   return (
//  <FormControl style={{width : props.width ?'200px':'250px'}} size={'small'}>
//       <Select
//         multiple
//         value={value}
//         disabled={isDisabled}
//         placeholder={placeholder}
//         onChange={(e) => handleChange(e,false)}
//         IconComponent = {() => value?.length >0 ?(<ClearIcon style={{cursor: 'pointer'}} onClick={(e) => handleChange(e, true)}/>): <ArrowDropDown/>}
//         renderValue={isObject ? (selected) => _.map(list, col => {
//           if (selected.includes(col[key])) {
//             return col[displayValue].concat(", ")
//           }
//         }) : (selected) => selected.join(", ")}
//         MenuProps={MenuProps}
//       >
//         {_.map(list, (option) => {
//           return (returnMenuItem(option))
//         })}
//       </Select>
//     </FormControl>
//   )
// }

// export default MultiSelectDropDown;