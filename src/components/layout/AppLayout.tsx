import { Menu, Search } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { routeDefinitions } from "../../app/routes";
import { Button } from "../ui/Button";

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span><span>ARC</span></div>
        <nav aria-label="Primary navigation">
          {routeDefinitions.map(({ path, label, icon: Icon }) => (
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to={path} key={path}>
              <Icon size={18} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="avatar">AL</span><span>Alex Lee</span></div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <Button variant="ghost" className="mobile-menu" aria-label="Open navigation"><Menu size={20} /></Button>
          <label className="search"><Search size={17} aria-hidden="true" /><input placeholder="Search ARC" aria-label="Search ARC" /></label>
          <div className="topbar-actions"><span className="status-dot" />Personal workspace</div>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
