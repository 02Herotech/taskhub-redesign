import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>TaskHub | HomePage</title>
      </Head>

      <main className={`min-h-screen `}>
        <div className={`h-screen flex justify-center items-center`}>
          <h1 className={`text-4xl`}>Welcome to TaskHub Homepage</h1>
        </div>
      </main>
    </div>
  );
};
export default Home;