/** @format */

//* imports
import HomeScreen from './screens/home/HomeScreen';
import { LogBox } from 'react-native';

//* used to suppress warning messages I couldn't figure out how to correct, no impact on app performance
LogBox.ignoreAllLogs();

export default function App() {
  return <HomeScreen />;
}
