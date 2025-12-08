import { CustomerList } from "./components/CustomerList";
import { DealList } from "./components/DealList";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>CRM SaaS – .NET 8 + React</h1>
      <CustomerList />
      <hr />
      <DealList />
    </div>
  );
}

export default App;
