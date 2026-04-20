import bigimg1 from "../../../../public/Images/blog_details1.png"
import bigimg2 from "../../../../public/Images/blog_details2.png"


const BlogDetail = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT CONTENT */}
        <article className="flex-1 min-w-0">

          <h1 className="text-2xl font-bold text-gray-900 mb-5 leading-snug">
            Healthy Smile Habits: Simple Tips For Everyday Care
          </h1>

          {/* Hero */}
          <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6">
            <img
              src={bigimg1}
              alt="Dental care hero"
              className="object-cover"
            />
          </div>

          {/* Sections */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Healthy Smile Habits
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Maintaining a healthy smile doesn't require complicated routines or
            expensive products. Small, consistent habits can make a big
            difference in keeping your teeth and gums healthy for years to come.
          </p>

          <h2 className="text-base font-bold text-gray-900 mb-1">
            Brush Properly, Twice a Day
          </h2>
          <p className="text-xs text-gray-600 mb-3">
            Brushing twice a day is essential, but technique matters just as much.
          </p>

          <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 mb-6 pl-1">
            <li>Use a soft-bristled toothbrush</li>
            <li>Brush for at least two minutes</li>
            <li>Clean all surfaces of your teeth</li>
            <li>Replace your toothbrush every 3–4 months</li>
          </ul>

          <h2 className="text-base font-bold text-gray-900 mb-1">
            Don't Skip Flossing
          </h2>
          <p className="text-xs text-gray-600 mb-3">
            Flossing reaches areas your toothbrush can't.
          </p>

          <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 mb-2 pl-1">
            <li>Floss once a day</li>
            <li>Be gentle</li>
            <li>Use alternatives if needed</li>
          </ul>

          {/* Mid Image */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden my-6">
            <img
              src={bigimg2}
              alt="Smile"
              className="object-cover"
            />
          </div>

          <h2 className="text-base font-bold text-gray-900 mb-1">
            Final Thoughts
          </h2>
          <p className="text-xs text-gray-600">
            Healthy smiles are built on daily habits, not perfection.
          </p>

        </article>
      </div>
    </section>
  );
};

export default BlogDetail;