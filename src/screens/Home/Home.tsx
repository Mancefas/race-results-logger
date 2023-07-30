import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AddRacer from './AddRacer';
import StartTime from './StartTime';
import FinishTime from './FinishTime';
import FixRacerTime from './FixRacerTime';


const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Start time"
        component={StartTime}
        options={{
          tabBarIcon: 'bike',
        }}
      />
    
    <Tab.Screen 
    name="Finishing time"
     component={FinishTime}
     options={{
      tabBarIcon: 'flag-checkered',
     }}
     />
    <Tab.Screen
     name="Add racer"
      component={AddRacer}
      options={{
        tabBarIcon: 'account-plus'
      }}
      />
    <Tab.Screen
     name="Change racer time"
      component={FixRacerTime}
      options={{
        tabBarIcon:'tools'
      }}
      />
  </Tab.Navigator>
  )
}

export default Home;