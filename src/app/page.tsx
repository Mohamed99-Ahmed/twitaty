
import AllPosts from '@/components/AllPosts/AllPosts';
import CreatePost from '../components/CreatePost/CreatePost';


export default  function Home() {

  return (
   <section className="home">
      <div className="container">
        <CreatePost/>
          <AllPosts />
      </div>
      </section>
      )
}
