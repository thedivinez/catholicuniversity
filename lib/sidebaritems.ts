import { AiOutlineDiff } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { RiBroadcastFill } from "react-icons/ri";
import Dashboard from "@/components/home/Dashboard";
import Assessment from "@/components/home/Assessment";
import LiveMeeting from "@/components/home/LiveMeeting";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notifications from "@/components/home/Notifications";

const sideBarItems = [
    {
        id: "dashboard",
        title: "Dashboard",
        content: Dashboard,
        icon: HiOutlineHome,
    },
    {
        id: "assessment",
        title: "Assessment",
        icon: AiOutlineDiff,
        content: Assessment,
    },
    {
        id: "updates",
        title: "Notifications",
        content: Notifications,
        icon: IoMdNotificationsOutline
    },
    {
        id: "meetings",
        content: LiveMeeting,
        title: "Live Meeting",
        icon: RiBroadcastFill,

    }
]

export default sideBarItems