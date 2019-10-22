import { createAppContainer,createStackNavigator } from 'react-navigation';
import { MainScreen, BinOption, BinDetail, BinEdit } from '../../screens';


const Router = createStackNavigator(
  {
    MainScreen : MainScreen,
    BinOption : BinOption,
    BinDetail: BinDetail,
    BinEdit: BinEdit
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainScreen'
  }
);

export default createAppContainer(Router);
