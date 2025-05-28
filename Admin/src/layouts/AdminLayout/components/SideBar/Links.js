import {
  dashboard,
  users,
  reports,
  configuration,
  usersManagement,
  logout,
  baseInfo,
  indexTemplate,
} from "../../../../lang/fa.json";
import { FormattedMessage } from "react-intl";
import { BsGear } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";
import { SiGithubactions } from "react-icons/si";

import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineLineChart,
  AiOutlinePieChart,
  AiOutlineProject,
  AiOutlineInsertRowLeft,
  AiOutlinePicLeft,
} from "react-icons/ai";
import { FiFileText, FiUsers } from "react-icons/fi";
import React from "react";
import { RiListCheck2 } from "react-icons/ri";

const menu = [
  {
    id: "dashboard",
    name: <FormattedMessage id="dashboard" />,
    icon: <AiOutlineDashboard />,
    link: "/",
    disabled: false,
    permissions: [],
  },
  {
    id: "baseInfo",
    name: baseInfo,
    icon: <BsGear />,
    disabled: false,
    permissions: [],
    children: [
      {
        id: "organizationUnitManagement",
        name: <FormattedMessage id="organizationUnitManagement" />,
        icon: <AiOutlineInsertRowLeft />,
        link: "/organization-unit",
        disabled: false,
        permissions: [],
      },
      {
        id: "projectsManagement",
        name: <FormattedMessage id="projectsManagement" />,
        icon: <AiOutlineProject />,
        link: "/projects",
        disabled: false,
        permissions: [],
      },
    ],
  },
  {
    id: "managementIndexTemplate",
    name: <FormattedMessage id="managementIndexTemplate" />,
    icon: <SiGithubactions />,
    disabled: false,
    permissions: [],
    children: [
      {
        id: "indexTemplate",
        name: indexTemplate,
        icon: <AiOutlineLineChart />,
        link: "/indexTemplate",
        disabled: false,
        permissions: [],
      },
      {
        id: "sidebarIndexInfo",
        name: <FormattedMessage id="sidebarIndexInfo" />,
        icon: <AiOutlinePicLeft />,
        link: "/indexInfo/dashboard",
        disabled: false,
        permissions: [],
      },
      {
        id: "routeingIndexTemplate",
        name: <FormattedMessage id="routeingIndexTemplate" />,
        icon: <SiGithubactions />,
        link: "/indextemplate-management/actions",
        disabled: false,
        permissions: [],
      },

      {
        id: "dashboardTemplate",
        name: <FormattedMessage id="dashboardTemplate" />,
        icon: <AiOutlinePieChart />,
        link: "/dashboard-template/list",
        disabled: false,
        permissions: [],
      },
    ],
  },

  {
    id: "myDashboardTemplate",
    name: <FormattedMessage id="myDashboardTemplate" />,
    icon: <AiOutlinePieChart />,
    link: "/my-dashboard",
    disabled: false,
    permissions: [],
  },

  {
    id: "usersManagement",
    name: usersManagement,
    icon: <FiUsers />,
    disabled: false,
    permissions: [],

    children: [
      {
        id: "users",
        name: <FormattedMessage id="users" />,
        icon: <FiUsers />,
        link: "/users",
        disabled: false,
        permissions: [],
      },
      {
        id: "roles",
        name: <FormattedMessage id="roles" />,
        icon: <FiFileText />,
        link: "/roles",
        disabled: false,
        permissions: [],
      },
    ],
  },

  /*   {
    id: "reports",
    name: reports,
    icon: <BiBarChartSquare />,
    disabled: false,
    permissions: [],
    children: [],
  }, */

  {
    id: "logout",
    name: logout,
    icon: <AiOutlineLogout />,
    link: "/login",
    disabled: false,
  },
];

export default menu;
