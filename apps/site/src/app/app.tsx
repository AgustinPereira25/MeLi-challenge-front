// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from "./app.module.css";
import { Outlet } from 'react-router-dom';
import '../styles.css';
import Layout from '../components/Layout/Layout';


export function App() {
  return (
    <Layout>
      <Outlet/>
    </Layout>
  );
}

export default App;
