
import AllPosts from '@/components/AllPosts/AllPosts';
import CreatePost from '../components/CreatePost/CreatePost';
import { Suspense } from 'react';
import Loading from './loading';


export default  function Home() {

  return (
   <section className="home">
      <div className="container">
        <CreatePost/>
         <AllPosts/>
   
      </div>
      </section>
      )
}
