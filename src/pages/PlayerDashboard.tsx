import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Player Dashboard</h1>
        <p>Welcome, {user?.email}!</p>
      </div>
    </div>
  );
};

export default PlayerDashboard;