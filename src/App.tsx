import { useState, useEffect } from "react";
import { WalletProvider } from "./hooks/useWallet";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Landing } from "./components/Landing";
import { Dashboard } from "./components/Dashboard";
import { PoolDetail } from "./components/PoolDetail";
import { Profile } from "./components/Profile";
import { Explorer } from "./components/Explorer";
import { Toaster } from "./components/ui/sonner";

type Page = "landing" | "dashboard" | "pool" | "profile" | "explorer";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    
    if (path === "/" || path === "") {
      setCurrentPage("landing");
    } else if (path === "/dashboard") {
      setCurrentPage("dashboard");
    } else if (path.startsWith("/pool/")) {
      setCurrentPage("pool");
    } else if (path === "/profile") {
      setCurrentPage("profile");
    } else if (path === "/explorer") {
      setCurrentPage("explorer");
    } else {
      // Unknown route - redirect to landing
      setCurrentPage("landing");
      window.history.replaceState({}, "", "/");
    }
  };

  useEffect(() => {
    document.title = "InOrOut - Decentralized Gambling Platform";
    
    const path = window.location.pathname;
    
    if (path === "/" || path === "") {
      setCurrentPage("landing");
    } else if (path === "/dashboard") {
      setCurrentPage("dashboard");
    } else if (path.startsWith("/pool/")) {
      setCurrentPage("pool");
    } else if (path === "/profile") {
      setCurrentPage("profile");
    } else if (path === "/explorer") {
      setCurrentPage("explorer");
    } else {
      // Unknown route - redirect to landing
      setCurrentPage("landing");
      window.history.replaceState({}, "", "/");
    }

    const handleNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const url = new URL(anchor.href);
        window.history.pushState({}, "", url.pathname);
        
        if (url.pathname === "/" || url.pathname === "") {
          setCurrentPage("landing");
        } else if (url.pathname === "/dashboard") {
          setCurrentPage("dashboard");
        } else if (url.pathname.startsWith("/pool/")) {
          setCurrentPage("pool");
        } else if (url.pathname === "/profile") {
          setCurrentPage("profile");
        } else if (url.pathname === "/explorer") {
          setCurrentPage("explorer");
        } else {
          // Unknown route - redirect to landing
          setCurrentPage("landing");
          window.history.replaceState({}, "", "/");
        }
      }
    };

    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/" || path === "") {
        setCurrentPage("landing");
      } else if (path === "/dashboard") {
        setCurrentPage("dashboard");
      } else if (path.startsWith("/pool/")) {
        setCurrentPage("pool");
      } else if (path === "/profile") {
        setCurrentPage("profile");
      } else if (path === "/explorer") {
        setCurrentPage("explorer");
      } else {
        // Unknown route - redirect to landing
        setCurrentPage("landing");
        window.history.replaceState({}, "", "/");
      }
    };

    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      document.removeEventListener("click", handleNavigation);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <Landing navigate={navigate} />;
      case "dashboard":
        return <Dashboard navigate={navigate} />;
      case "pool":
        return <PoolDetail navigate={navigate} />;
      case "profile":
        return <Profile navigate={navigate} />;
      case "explorer":
        return <Explorer navigate={navigate} />;
      default:
        return <Landing navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}
