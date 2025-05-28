import {isMobile} from 'react-device-detect';


const DesktopCTA = () => {
   return !isMobile && <div className="row justify-content-center mt-3">
    <a href="https://taminplus.com" target="_blank" className="cs-btn-one btn-gradient-color btn-md mrb-lg-60">
        تامین پلاس
        </a>
</div>
}

export default DesktopCTA;