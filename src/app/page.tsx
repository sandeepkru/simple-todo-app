import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Simple Todo App</h1>
          <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
        </header>
        <main>
          <TodoList />
        </main>
      </div>
    </div>
  );
}
