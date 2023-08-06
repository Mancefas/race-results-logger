import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../App';
import { fetchRacers } from '../../store/slices/racersSlice';
import AddRacer from './AddRacer';
import StartTime from './StartTime';
import FinishTime from './FinishTime';
import FixRacerTime from './FixRacerTime';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        // Dispatch the fetchRacers action to fetch the data from Firebase
        dispatch(fetchRacers());
    }, []);

    return (
        <Tab.Navigator>
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
                    tabBarIcon: 'account-plus',
                }}
            />
            <Tab.Screen
                name="Change racer time"
                component={FixRacerTime}
                options={{
                    tabBarIcon: 'tools',
                }}
            />
        </Tab.Navigator>
    );
};

export default Home;
