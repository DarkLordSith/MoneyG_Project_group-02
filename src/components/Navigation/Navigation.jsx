import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useMedia from "../../hooks/useMedia";
import s from "./Navigation.module.css";

const Navigation = () => {
  const { isMobile } = useMedia();

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.navItem, isActive && s.activeLink);
  };

  return (
    <nav className={s.navigation}>
      <ul className={s.navList}>
        <li>
          <NavLink className={buildLinkClass} to="/dashboard/home" end>
            <div className={s.navIconWrapper}>
              <svg className={s.navIcon} width="32" height="32">
                <use href="/icons/icons.svg#home" fill="currentColor"></use>
              </svg>
            </div>
            {!isMobile && <span className={s.navItemText}>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/dashboard/statistics">
            <div className={s.navIconWrapper}>
              <svg className={s.navIcon} width="32" height="32">
                <use href="/icons/icons.svg#dollar" fill="currentColor"></use>
              </svg>
            </div>
            {!isMobile && <span className={s.navItemText}>Statistics</span>}
          </NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink className={buildLinkClass} to="/dashboard/currency">
              <div className={s.navIconWrapper}>
                <svg className={s.navIcon} width="32" height="32">
                  <use
                    href="/icons/icons.svg#currency"
                    fill="currentColor"
                  ></use>
                </svg>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
