import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="mt-16 text-center sm:mt-32">
      <h1 className="mb-8 text-xl font-semibold sm:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
