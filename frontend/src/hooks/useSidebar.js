import { use } from "react";
import SidebarContext from "../context/SidebarContext";

export const useSidebar = () => {
    const ctx = use(SidebarContext);
    return ctx;
}

export default useSidebar;