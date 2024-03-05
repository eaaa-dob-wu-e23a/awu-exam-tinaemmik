import { NavLink } from "@remix-run/react";

export default function Nav() {
    return(
        <nav>
            <NavLink to="#">Oversigt</NavLink>
            <NavLink to="#">Events</NavLink>
            <NavLink to="#">Ny Event</NavLink>
            <NavLink to="#">Redigere Profil</NavLink>
        </nav>
    )
};