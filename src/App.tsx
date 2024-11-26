import React from "react";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout>
        <h1>Serena</h1>
      </Layout>
    </div>
  );
};

export default App;
