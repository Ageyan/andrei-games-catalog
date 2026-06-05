import type {ReactNode} from 'react'
import Footer from './Footer';

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children } : Props) => {
  return (
    <div className="layout-wrapper">
        {/* <div className='main-bg'></div> */}
        <main className='main-content'>{children}</main>
        <Footer/>
    </div>
  )
};

export default MainLayout;
