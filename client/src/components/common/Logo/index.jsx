import { Image, Skeleton } from 'antd';
import COMPANY_APPS_NAMES from 'constants/COMPANY_APPS_NAMES';
import { useUserContext } from 'context/userContext';
import React, { useEffect, useMemo } from 'react'
// images
import vindoLogo from "assets/svgs/LogoSVG.svg";
import vbookingLogoSVG from "assets/svgs/VbookingLogoSVG.svg";
const Logo = ({ width, height }) => {
    const { user } = useUserContext();
    const companyApps = useMemo(() => {
        if (user?.companyApps) {
            return user?.companyApps;
        } else if (localStorage.getItem("companyApps")) {
            return JSON.parse(localStorage.getItem("companyApps"))
        } else {
            return null;
        }
    }, [user])

    const logoSrc = useMemo(() => {
        if (user?.companyLogo) {
            return user?.companyLogo;
        } else if (localStorage.getItem("companyLogo")) {
            return JSON.parse(localStorage.getItem("companyLogo"))?.logo;
        } else if (companyApps?.find(el => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL)) {
            return vbookingLogoSVG;
        } else {
            return vindoLogo;
        }
    }, [user, companyApps])

    useEffect(() => {
        const setFavicon = (iconUrl) => {
            const link = document.querySelector("link[rel='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = iconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        };

        // Call the function with your favicon URL
        if (logoSrc) {
            setFavicon(logoSrc);
        }
    }, [logoSrc]);
    
    return <Image
        style={{ maxWidth: "180px", objectFit: "contain" }}
        width={width}
        preview={false}
        src={logoSrc}
        height={height ? height : 40}
        alt={companyApps?.find(el => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL) ? "vbooking Logo" : "vindo Logo"}
    />
}

export default Logo