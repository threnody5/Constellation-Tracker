import HomeScreen from './screens/home/HomeScreen';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <HomeScreen />
  );
}