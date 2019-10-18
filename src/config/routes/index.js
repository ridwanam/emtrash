import { createAppContainer,createStackNavigator } from 'react-navigation';
import { MainScreen, BinOption, BinDetail } from '../../screens';


const Router = createStackNavigator(
  {
    MainScreen : MainScreen,
    BinOption : BinOption,
    BinDetail: BinDetail
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainScreen'
  }
);

export default createAppContainer(Router);
