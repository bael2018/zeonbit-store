import { AiOutlineHeart, AiFillCaretDown } from "react-icons/ai";
import { setSidebar } from "../../store/reducers/modalReducer";
import cls from "../../scss/components/sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomLink from "../elements/custom/CustomLink";
import { appLinks } from "../../constants/appLinks";
import { useRequest } from "../../hooks/useRequest";
import { IoBagOutline } from "react-icons/io5";
import { API_URL, FIREBASE_URL } from "../../constants/init";
import { paths } from "../../constants/paths";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { toArray } from "../../utils/toArray";
import { setAuthUser } from "../../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { isSidebar } = useSelector((state) => state.modal);
    const { wishes } = useSelector((state) => state.wishes);
    const { isAuth } = useSelector((state) => state.user);
    const { carts, cartToggle } = useSelector((state) => state.cart);
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { data, fetching } = useRequest("get", `${API_URL}app`);

    const { data: dataCarts, fetching: fetchingCarts } = useRequest(
        "get",
        `${FIREBASE_URL}users/${uid}/carts.json`
    );

    useEffect(() => {
        fetching();
    }, []);

    useEffect(() => {
        fetchingCarts();
    }, [cartToggle]);

    const closeHandler = () => {
        dispatch(setSidebar());
    };

    const logoutHandler = () => {
        localStorage.removeItem("uid");
        dispatch(setAuthUser({ auth: false }));
        navigate(paths.MAIN);
    };


    return (
        <div className={`${cls.sidebar} ${isSidebar && cls.sidebar_active}`}>
            <div className={cls.sidebar__wrapper}>
                <div className={cls.sidebar__wrapper__menu}>
                    <div className={cls.sidebar__wrapper__menu__header}>
                        <h4>Меню</h4>
                        <span onClick={closeHandler}>
                            <IoMdClose />
                        </span>
                    </div>
                    <ul>
                        <li>
                            <CustomLink
                                onClick={closeHandler}
                                to={paths.ABOUT_US}
                            >
                                {appLinks.ABOUT_US}
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                onClick={closeHandler}
                                to={paths.COLLECTIONS}
                            >
                                {appLinks.COLLECTIONS}
                            </CustomLink>
                        </li>
                        {isAuth && (
                            <li>
                                <CustomLink
                                    onClick={closeHandler}
                                    to={paths.ORDERS}
                                >
                                    {appLinks.ORDERS}
                                </CustomLink>
                            </li>
                        )}
                        <li>
                            <CustomLink onClick={closeHandler} to={paths.NEWS}>
                                {appLinks.NEWS}
                            </CustomLink>
                        </li>
                        {isAuth ? (
                            <li onClick={logoutHandler}>
                                Выйти
                            </li>
                        ) : (
                            <li>
                                <CustomLink
                                    onClick={closeHandler}
                                    to={paths.AUTH}
                                >
                                    {appLinks.AUTH}
                                </CustomLink>
                            </li>
                        )}
                    </ul>
                    <div
                        className={`${cls.sidebar__wrapper__menu__footer} ${
                            isAuth
                                ? toArray(dataCarts).length > 0 &&
                                  cls.sidebar__wrapper__menu__footer_cart
                                : carts.length > 0 &&
                                  cls.sidebar__wrapper__menu__footer_cart
                        } ${
                            wishes.length > 0 &&
                            cls.sidebar__wrapper__menu__footer_heart
                        }`}
                    >
                        <CustomLink onClick={closeHandler} to={paths.WISHLIST}>
                            <AiOutlineHeart />
                            {appLinks.WISHLIST}
                        </CustomLink>
                        <CustomLink onClick={closeHandler} to={paths.CART}>
                            <IoBagOutline />
                            {appLinks.CART}
                        </CustomLink>
                    </div>
                </div>
                <div className={cls.sidebar__wrapper__contacts}>
                    <h4>Свяжитесь с нами:</h4>
                    <p>
                        Тел:{" "}
                        <a href={`tel:${data[0]?.contacts.phoneNumber}`}>
                            {data[0]?.contacts.phoneNumber}
                        </a>
                        <AiFillCaretDown />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
