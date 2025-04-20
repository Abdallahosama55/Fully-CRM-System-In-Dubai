import { Drawer } from 'antd';
import Map from '../Map';
import { CloseSVG } from 'assets/jsx-svg';

// style
import "./styles.css";
import 'leaflet/dist/leaflet.css';
const MapDrawer = ({ style, open, onClose, ...mapProps }) => {
    return <div className="map_drawer_container">
        <Drawer className="map_drawer" title={false} onClose={onClose} open={open} style={style} width={"70%"}>
            <Map {...mapProps} width='100%' height='100%' />
            <button className='close_map_btn' onClick={onClose}>
                <CloseSVG color="#fff" />
            </button>
        </Drawer >
    </div>
}

export default MapDrawer