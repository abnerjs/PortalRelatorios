import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatamobIcon from "../assets/DatamobIcon";
import "./Menu.css";
import { Icon } from "@iconify/react";

const Menu = () => {
    const [active, setActive] = useState(window.location.pathname);
    console.log('teste' + window.location.pathname + active);

    return (
        <div className="Menu">
            <Link to="/">
                <div className="logo">
                    <DatamobIcon width={39} />
                </div>
            </Link>

            <div className="links">
                <Link to="/">
                    <div
                        className={
                            `menuButton` + (active === "/" ? " active" : "")
                        }
                        onClick={() => setActive('/')}
                    >
                        <Icon icon="fluent:home-16-regular" />
                    </div>
                </Link>
                <Link to="/usuarios">
                    <div
                        className={
                            `menuButton` +
                            (active === "/documentos" ? " active" : "")
                        }
                        onClick={() => setActive("/usuarios")}
                    >
                        <Icon icon="fluent:document-bullet-list-20-regular" />
                    </div>
                </Link>
                <Link to="/usuarios">
                    <div
                        className={
                            `menuButton` +
                            (active === "/usuarios" ? " active" : "")
                        }
                        onClick={() => setActive("/usuarios")}
                    >
                        <Icon icon="fluent:person-20-regular" />
                    </div>
                </Link>
                <Link to="/usuarios">
                    <div
                        className={
                            `menuButton` +
                            (active === "/logs" ? " active" : "")
                        }
                        onClick={() => setActive("/usuarios")}
                    >
                        <Icon icon="fluent:notebook-24-regular" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
