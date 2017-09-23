import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Metrics from './Metrics';
import Colors from './Colors';
import Constants from './Constants';

const Styles = {
    container : {
        flex : 1
    },

    fullContainer : {
        width : Metrics.screenWidth,
        height : Metrics.screenHeight,
    },
    
    columnContainer : {
        flex : 1,
        flexDirection : 'column'
    },

    rowContainer : {
        flex : 1,
        flexDirection : 'row',
    },

}

export default Styles;