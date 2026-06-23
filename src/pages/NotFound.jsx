import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const NotFound = () => (
  <div className="max-w-xl mx-auto px-6 py-32 text-center">
    <p className="font-display text-6xl font-bold mb-4">404</p>
    <p className="text-sm text-muted mb-8">This page does not exist.</p>
    <Link to="/">
      <Button>Back Home</Button>
    </Link>
  </div>
);

export default NotFound;