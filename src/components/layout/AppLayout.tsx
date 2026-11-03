import { Menu, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { routeDefinitions } from "../../app/routes";
import { Button } from "../ui/Button";
import { useTheme } from "../../app/ThemeContext";

export function AppLayout() {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const { theme, setPreference } = useTheme();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <button
        className={`mobile-scrim${navigationOpen ? " visible" : ""}`}
        aria-label="Close navigation"
        onClick={() => setNavigationOpen(false)}
      />
      <aside className={`sidebar${navigationOpen ? " open" : ""}`}>
        <div className="sidebar-heading">
          <div className="brand"><span className="brand-mark">A</span><span>ARC</span></div>
          <Button variant="ghost" className="close-menu" aria-label="Close navigation" onClick={() => setNavigationOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <nav aria-label="Primary navigation">
          {routeDefinitions.map(({ path, label, icon: Icon }) => (
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to={path} key={path} onClick={() => setNavigationOpen(false)}>
              <Icon size={18} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="avatar">AL</span><span>Alex Lee</span></div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <Button variant="ghost" className="mobile-menu" aria-label="Open navigation" aria-expanded={navigationOpen} onClick={() => setNavigationOpen(true)}><Menu size={20} /></Button>
          <label className="search"><Search size={17} aria-hidden="true" /><input placeholder="Search ARC" aria-label="Search ARC" /></label>
          <div className="topbar-actions"><span className="status-dot" />Personal workspace <span className="topbar-divider" /> <span>Tuesday, Nov 3</span><Button variant="ghost" className="theme-shortcut" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={() => setPreference(theme === "dark" ? "light" : "dark")}><Sun size={16} aria-hidden="true" /></Button></div>
        </header>
        <main className="content" id="main-content"><Outlet /></main>
      </div>
    </div>
  );
}
