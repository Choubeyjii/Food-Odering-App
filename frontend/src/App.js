import './App.css';
import Home from './component/Home/Home';
import RestaurantDetail from './component/RestaurantDetail/RestaurantDetail';
import Filter from './component/RestaurantDetail/Filter';
import{
  BrowserRouter as Router,
  // Route,
  // Router,

  useRoutes
} from "react-router-dom"


 
function App() {

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/details/:rName", element: <RestaurantDetail /> },
    { path: "/filter", element: <Filter /> },

  ]);
  return routes;
  // return (
  //       <Routes>
  //         <Route path='/' element={<Home/>}/>
  //         <Route path='/details/:rName' element={<RestaurantDetail/>}/>
  //         <Route path='/filter' element={<Filter/>}/>
  //       </Routes>  
  //   );
}

export default App;
