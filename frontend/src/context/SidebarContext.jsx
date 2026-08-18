import { 
    createContext, 
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
                setIsMobile(false);
            } else {
                setIsSidebarOpen(false);
                setIsMobile(true);
            }
        };

        handleResize(); // Set initial state based on current window size

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const value = useMemo(() => ({
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
    }), [isSidebarOpen, isMobile]);

    return (
        <SidebarContext value={value}>
            {children}
        </SidebarContext>
    );
};

export default SidebarContext;