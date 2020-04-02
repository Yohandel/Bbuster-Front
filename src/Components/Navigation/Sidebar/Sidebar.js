import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "./Sidebar.css"
import { withRouter } from 'react-router-dom'

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const Sidebar = props => {
    const [show, setShow] = useState(false);
    return (
        <div className="sideNav">
            <SideNav

                onMouseLeave={() => setShow(false)}
                expanded={show}
                onSelect={selected => {
                    props.history.push(selected)
                    setShow(false);
                }}
                onToggle={() => setShow(!show)}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected={props.history.location.pathname}>

                    <NavItem eventKey="/" title="Home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} title="Home" />
                        </NavIcon>
                        <NavText> Home</NavText>
                    </NavItem>
                    <NavItem eventKey="/movies" title="Movies" >
                        <NavIcon>
                            <i className="fa fa-film" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Movies</NavText>
                    </NavItem>
                    <NavItem eventKey="/directors" title="Directors" >
                        <NavIcon>
                            <i className="fa fa-bullhorn" style={{ fontSize: "1.75em" }} title="Directors" />
                        </NavIcon>
                        <NavText> Directors</NavText>
                    </NavItem>
                    <NavItem eventKey="/categories" title="Categories">
                        <NavIcon>
                            <i className="fa fa-th" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Categories</NavText>
                    </NavItem>

                    <NavItem eventKey="/users" title="Users">
                        <NavIcon>
                            <i className="fa fa-users" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Users</NavText>
                    </NavItem>

                    <NavItem eventKey="/invoices" title="Invoices">
                        <NavIcon>
                            <i className="fa fa-shopping-bag" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>Invoices</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
};

export default withRouter(Sidebar);
