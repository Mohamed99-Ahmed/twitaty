
import AllPosts from '@/components/AllPosts/AllPosts';
import CreatePost from '../components/CreatePost/CreatePost';


export default  function Home() {

  return (
    // Home page
   <section className="home">
      <div className="container">
        {/* createPost component */}
        <CreatePost/>
        {/* AllPosts in server  */}
        <AllPosts />
      </div>
      </section>
      )
}
