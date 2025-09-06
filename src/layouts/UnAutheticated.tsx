import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoaderComponent from '../components/LoaderComponent';

export default function UnAuthenticated({ element }) {
  const auth = useSelector(s => s.auth);
  const loading = auth?.loadings?.authenticateAsyncThunk;
  if (loading) return <LoaderComponent />
  if (auth?.user) return <Navigate to="/" />
  return element
}