import TodoList from '@/components/TodoList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 pb-8 flex-grow">
        <main>
          <TodoList />
        </main>
      </div>
      <Footer />
    </div>
  );
}
