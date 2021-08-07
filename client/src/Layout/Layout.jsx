import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Left from '../Sections/Left/Left'
import Right from '../Sections/Right/Right'
import Header from '../components/Header/Header'
import './Layout.css'

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgb(121, 75, 196)',
      position: 'static !important'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const pages = {
    home: 'Home',
    search:'Search',
    notification:'Notifications',
    profile:'Profile',
    chats: 'Chats'
}

const CustomScrollbars = props => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
);

function getLayout(location,children) {
    const pageName = location === '/' ? 'Home' : pages[location.slice(1)]
    let hidden = false;
    if(pageName === 'Chats') hidden = true;
    if(location === '/signup' || location === '/signin') {
        return (
            <Fragment>
                 {children}
            </Fragment>
        )
    }
    else {
        return (
            <div className="main_container">
                <div className="left_container">
                    <Left />
                </div>

                <div className="mid_container">
                        <Header pageName={pageName} hidden={hidden}/>
                        {
                            pageName === 'Chats' ? (
                                <Fragment>
                                    {children}
                                </Fragment>
                            ) 
                            : (<CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                                    {children}
                               </CustomScrollbars>)
                        }
                </div>

                <div className="right_container">
                    <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                        <Right />
                    </CustomScrollbars>
                </div>
            </div>
        )
    }
}


const Layout = ({children}) => {
    const location = useLocation();
    return getLayout(location.pathname,children)
}

export default Layout
