@@ .. @@
 import { useAuth } from '../contexts/AuthContext';
 import Navbar from '../components/Navbar';
 
-const Dashboard = () => {
+const PlayerDashboard = () => {
   const { user } = useAuth();
   const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
@@ .. @@
   );
 };
 
-export default Dashboard;
+export default PlayerDashboard;