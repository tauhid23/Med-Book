// import { useParams } from "react-router-dom";
import BlogDetail from "./_components/BlogDetails";
import BlogSidebar from "./_components/BlogSidebar";


const BlogDetails = () => {

    // const { slug, id } = useParams();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-28">
      <div className="flex flex-col lg:flex-row items-start gap-10">

        {/* LEFT: Blog Content */}
        <div className="flex-1 w-full">
          <BlogDetail />
        </div>

        {/* RIGHT: Sidebar (TOP ALIGNED) */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <BlogSidebar />
        </div>

      </div>
    </section>
  );
};

export default BlogDetails;