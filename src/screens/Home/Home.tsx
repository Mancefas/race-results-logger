import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../App';
import {
    fetchRacers,
    racersWithoutStartTime,
    racersWithoutFinishTime,
} from '../../store/slices/racersSlice';
import { useTranslation } from 'react-i18next';
import AddRacer from './AddRacer';
import StartTime from './StartTime';
import FinishTime from './FinishTime';
import EditRacer from './EditRacer';
import CameraFinish from './CameraFinish';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const startingRacersCount = useSelector(racersWithoutStartTime).length;
    const finishingRacersCount = useSelector(racersWithoutFinishTime).length;

    const { t } = useTranslation();

    useEffect(() => {
        // Dispatch the fetchRacers action to fetch the data from Firebase
        dispatch(fetchRacers());
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name={t('home:startTime')}
                component={StartTime}
                options={{
                    tabBarIcon: 'bike',
                    tabBarBadge: startingRacersCount,
                }}
            />

            <Tab.Screen
                name={t('home:finishTime')}
                component={FinishTime}
                options={{
                    tabBarIcon: 'flag-checkered',
                    tabBarBadge: finishingRacersCount,
                }}
            />
            <Tab.Screen
                name={t('home:addRacer')}
                component={AddRacer}
                options={{
                    tabBarIcon: 'account-plus',
                }}
            />
            <Tab.Screen
                name={t('home:fixRacer')}
                component={EditRacer}
                options={{
                    tabBarIcon: 'tools',
                }}
            />
            <Tab.Screen
                name="Camera"
                component={CameraFinish}
                options={{
                    tabBarIcon: 'camera',
                }}
            />
        </Tab.Navigator>
    );
};

export default Home;
