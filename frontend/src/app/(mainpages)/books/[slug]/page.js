import BookDetail from "@/components/BookDetail";

const BookPage = ({ params }) => {
  const { slug } = params;

  console.log(slug);

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4 py-6 font-primary">
      <BookDetail slug={slug} />
    </main>
  );
};

export default BookPage;
