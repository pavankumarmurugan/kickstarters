import { userSpecificToken } from "../GenericCode/GenericCode";

let getToken = userSpecificToken();
export const MenuItems = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
    icon: "fas fa-home margin-icons",
  },
  {
    title: "About",
    url: "/about",
    cName: "nav-links",
    icon: "fas fa-info margin-icons",
  },
  {
    title: "All Jobs",
    url: "/allappliedjobs",
    cName: "nav-links",
    icon: "fas fa-briefcase margin-icons",
  },
];
debugger;
export const modifiedMenuItems =
  getToken?.userRole === "EMPLOYER" ||
  getToken === undefined ||
  getToken === null
    ? MenuItems.filter((item) => item.title !== "All Jobs")
    : MenuItems;

export const registerItems = [
  {
    label: "Login",
    key: "1",
  },
  {
    label: "Signup",
    key: "2",
  },
];

export const profileItems = [
  // {
  //   label: "Job Alert",
  //   key: "5",
  // },
  {
    label: "Profile",
    key: "3",
  },
  {
    label: "Logout",
    key: "4",
  },
];
