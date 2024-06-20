import React, { useEffect, useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface MaybeShowComponentProps {
    children: ReactNode;
}

const MaybeShowComponent: React.FC<MaybeShowComponentProps> = ({ children }) => {
    const [showComponent, setShowComponent] = useState<boolean>(true);
    const location = useLocation();
    
    useEffect(() => {
        const hidePaths = ["/get-started", "/get-started/:id"]
        setShowComponent(!hidePaths.some(path => location.pathname.startsWith(path)));
    }, [location]);
    
    return showComponent ? <div>{children}</div> : null;
}

export default MaybeShowComponent;
