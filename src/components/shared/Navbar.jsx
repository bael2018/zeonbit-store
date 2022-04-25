import BreadCrumb from "../elements/custom/BreadCrumb";
import NavbarContent from "../partials/NavbarContent";
import { useRequest } from "../../hooks/useRequest";
import NavbarLinks from "../partials/NavbarLinks";
import { memo, useEffect } from "react";

const Navbar = () => {
    const {
        data,
        status,
        error,
        fetching,
    } = useRequest('get', "app");

    useEffect(() => {
        fetching();
    }, []);

    return (
        <>
            <NavbarLinks number={data[0]?.contacts.phoneNumber} />
            <NavbarContent logo={data[0]?.appLogo} />
            <BreadCrumb />
        </>
    );
};

export default memo(Navbar);